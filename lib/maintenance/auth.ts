import { cookies } from 'next/headers'
import { createHash, createHmac, scryptSync, timingSafeEqual } from 'node:crypto'

const DEFAULT_COOKIE_NAME = 'maintenance_auth'
const DEFAULT_COOKIE_TTL_SECONDS = 60 * 60 * 8

type ParsedHash =
  | { algorithm: 'sha256'; hashHex: string }
  | { algorithm: 'scrypt'; saltHex: string; hashHex: string }

function parseBoolean(value: string | undefined): boolean {
  if (!value) {
    return false
  }

  return ['1', 'true', 'yes', 'on'].includes(value.toLowerCase())
}

function secureCompare(a: string, b: string): boolean {
  const left = createHash('sha256').update(a).digest()
  const right = createHash('sha256').update(b).digest()
  return timingSafeEqual(left, right)
}

function parsePasswordHash(rawHash: string): ParsedHash | null {
  if (rawHash.startsWith('sha256:')) {
    const hashHex = rawHash.slice('sha256:'.length)
    if (!/^[a-f0-9]+$/i.test(hashHex) || hashHex.length !== 64) {
      return null
    }

    return {
      algorithm: 'sha256',
      hashHex: hashHex.toLowerCase(),
    }
  }

  if (rawHash.startsWith('scrypt:')) {
    const [, saltHex, hashHex] = rawHash.split(':')
    if (!saltHex || !hashHex) {
      return null
    }

    if (!/^[a-f0-9]+$/i.test(saltHex) || !/^[a-f0-9]+$/i.test(hashHex)) {
      return null
    }

    if (hashHex.length < 32 || hashHex.length % 2 !== 0 || saltHex.length % 2 !== 0) {
      return null
    }

    return {
      algorithm: 'scrypt',
      saltHex: saltHex.toLowerCase(),
      hashHex: hashHex.toLowerCase(),
    }
  }

  return null
}

function sign(payload: string, secret: string): string {
  return createHmac('sha256', secret).update(payload).digest('base64url')
}

function createSignedCookieValue(secret: string, ttlSeconds: number): string {
  const payload = Buffer.from(
    JSON.stringify({
      exp: Date.now() + ttlSeconds * 1000,
      v: 1,
    })
  ).toString('base64url')

  const signature = sign(payload, secret)
  return `${payload}.${signature}`
}

function verifySignedCookieValue(value: string, secret: string): boolean {
  const [payload, signature] = value.split('.')
  if (!payload || !signature) {
    return false
  }

  const expectedSignature = sign(payload, secret)
  if (!secureCompare(signature, expectedSignature)) {
    return false
  }

  try {
    const parsed = JSON.parse(Buffer.from(payload, 'base64url').toString('utf8')) as {
      exp?: number
      v?: number
    }

    if (!parsed || parsed.v !== 1 || typeof parsed.exp !== 'number') {
      return false
    }

    return Date.now() < parsed.exp
  } catch {
    return false
  }
}

function getMaintenanceSecret(): string | null {
  return process.env.MAINTENANCE_COOKIE_SECRET?.trim() || null
}

export function isMaintenanceEnabled(): boolean {
  return parseBoolean(process.env.MAINTENANCE_MODE_ENABLED)
}

export function getMaintenanceCookieName(): string {
  return process.env.MAINTENANCE_COOKIE_NAME?.trim() || DEFAULT_COOKIE_NAME
}

export function getMaintenanceCookieTtlSeconds(): number {
  const raw = Number(process.env.MAINTENANCE_COOKIE_TTL_SECONDS)
  if (!Number.isFinite(raw) || raw <= 0) {
    return DEFAULT_COOKIE_TTL_SECONDS
  }

  return Math.floor(raw)
}

export function validateMaintenancePassword(password: string): boolean {
  const configuredHash = process.env.MAINTENANCE_PASSWORD_HASH?.trim()
  const configuredPassword = process.env.MAINTENANCE_PASSWORD ?? ''

  if (configuredHash) {
    const parsedHash = parsePasswordHash(configuredHash)
    if (!parsedHash) {
      return false
    }

    if (parsedHash.algorithm === 'sha256') {
      const candidateHex = createHash('sha256').update(password).digest('hex')
      return secureCompare(candidateHex, parsedHash.hashHex)
    }

    const keyLength = parsedHash.hashHex.length / 2
    const derived = scryptSync(password, Buffer.from(parsedHash.saltHex, 'hex'), keyLength)
    return secureCompare(derived.toString('hex'), parsedHash.hashHex)
  }

  if (!configuredPassword) {
    return false
  }

  return secureCompare(password, configuredPassword)
}

export function issueMaintenanceCookieValue(): string | null {
  const secret = getMaintenanceSecret()
  if (!secret) {
    return null
  }

  return createSignedCookieValue(secret, getMaintenanceCookieTtlSeconds())
}

export async function hasMaintenanceAccess(): Promise<boolean> {
  if (!isMaintenanceEnabled()) {
    return true
  }

  const secret = getMaintenanceSecret()
  if (!secret) {
    return false
  }

  const cookieStore = await cookies()
  const cookieValue = cookieStore.get(getMaintenanceCookieName())?.value
  if (!cookieValue) {
    return false
  }

  return verifySignedCookieValue(cookieValue, secret)
}
