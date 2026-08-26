import { createHash } from 'node:crypto'

type RateLimitEntry = {
  count: number
  firstAttemptAt: number
  blockedUntil: number
}

type RateLimitDecision = {
  allowed: boolean
  retryAfterSeconds: number
  remainingAttempts: number
}

const STORE_KEY = '__maintenance_rate_limit_store__'
const DEFAULT_MAX_ATTEMPTS = 5
const DEFAULT_WINDOW_SECONDS = 15 * 60
const DEFAULT_LOCKOUT_SECONDS = 15 * 60

function parsePositiveInt(value: string | undefined, fallback: number): number {
  const parsed = Number(value)
  if (!Number.isFinite(parsed) || parsed <= 0) {
    return fallback
  }

  return Math.floor(parsed)
}

function getConfig() {
  return {
    maxAttempts: parsePositiveInt(process.env.MAINTENANCE_MAX_ATTEMPTS, DEFAULT_MAX_ATTEMPTS),
    windowSeconds: parsePositiveInt(
      process.env.MAINTENANCE_ATTEMPT_WINDOW_SECONDS,
      DEFAULT_WINDOW_SECONDS
    ),
    lockoutSeconds: parsePositiveInt(
      process.env.MAINTENANCE_LOCKOUT_SECONDS,
      DEFAULT_LOCKOUT_SECONDS
    ),
  }
}

function getStore(): Map<string, RateLimitEntry> {
  const globalWithStore = globalThis as typeof globalThis & {
    [STORE_KEY]?: Map<string, RateLimitEntry>
  }

  if (!globalWithStore[STORE_KEY]) {
    globalWithStore[STORE_KEY] = new Map<string, RateLimitEntry>()
  }

  return globalWithStore[STORE_KEY]
}

function cleanupExpiredEntries(now: number, windowSeconds: number, lockoutSeconds: number): void {
  const store = getStore()
  const retentionMs = Math.max(windowSeconds, lockoutSeconds) * 1000

  for (const [key, value] of store.entries()) {
    const lastRelevantTime = Math.max(value.firstAttemptAt, value.blockedUntil)
    if (now - lastRelevantTime > retentionMs) {
      store.delete(key)
    }
  }
}

export function getRateLimitKey(ip: string, userAgent: string): string {
  return createHash('sha256').update(`${ip}|${userAgent}`).digest('hex')
}

export function evaluateMaintenanceRateLimit(identifier: string): RateLimitDecision {
  const now = Date.now()
  const { maxAttempts, windowSeconds } = getConfig()
  cleanupExpiredEntries(now, windowSeconds, getConfig().lockoutSeconds)

  const entry = getStore().get(identifier)
  if (!entry) {
    return {
      allowed: true,
      retryAfterSeconds: 0,
      remainingAttempts: maxAttempts,
    }
  }

  if (entry.blockedUntil > now) {
    return {
      allowed: false,
      retryAfterSeconds: Math.max(1, Math.ceil((entry.blockedUntil - now) / 1000)),
      remainingAttempts: 0,
    }
  }

  if (now - entry.firstAttemptAt > windowSeconds * 1000) {
    getStore().delete(identifier)
    return {
      allowed: true,
      retryAfterSeconds: 0,
      remainingAttempts: maxAttempts,
    }
  }

  return {
    allowed: true,
    retryAfterSeconds: 0,
    remainingAttempts: Math.max(0, maxAttempts - entry.count),
  }
}

export function registerMaintenanceFailure(identifier: string): RateLimitDecision {
  const now = Date.now()
  const { maxAttempts, windowSeconds, lockoutSeconds } = getConfig()
  cleanupExpiredEntries(now, windowSeconds, lockoutSeconds)

  const store = getStore()
  const previous = store.get(identifier)

  if (!previous || now - previous.firstAttemptAt > windowSeconds * 1000) {
    store.set(identifier, {
      count: 1,
      firstAttemptAt: now,
      blockedUntil: 0,
    })

    return {
      allowed: true,
      retryAfterSeconds: 0,
      remainingAttempts: Math.max(0, maxAttempts - 1),
    }
  }

  const nextCount = previous.count + 1
  if (nextCount >= maxAttempts) {
    const blockedUntil = now + lockoutSeconds * 1000
    store.set(identifier, {
      count: nextCount,
      firstAttemptAt: previous.firstAttemptAt,
      blockedUntil,
    })

    return {
      allowed: false,
      retryAfterSeconds: lockoutSeconds,
      remainingAttempts: 0,
    }
  }

  store.set(identifier, {
    ...previous,
    count: nextCount,
  })

  return {
    allowed: true,
    retryAfterSeconds: 0,
    remainingAttempts: Math.max(0, maxAttempts - nextCount),
  }
}

export function resetMaintenanceFailures(identifier: string): void {
  getStore().delete(identifier)
}
