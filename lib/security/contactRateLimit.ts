/**
 * Rate limit en memoria para el formulario de contacto.
 *
 * El sitio no persiste nada, así que no hay dónde llevar un historial de
 * envíos. Esto es mitigación, no barrera: en Vercel el estado es por instancia
 * y se pierde en cada cold start. Alcanza para frenar bots ingenuos y ráfagas
 * accidentales. Si aparece spam real, el paso siguiente es Cloudflare Turnstile.
 */

const WINDOW_MS = 10 * 60 * 1000
const MAX_REQUESTS = 5

interface Bucket {
  count: number
  resetAt: number
}

const buckets = new Map<string, Bucket>()

function sweep(now: number) {
  for (const [key, bucket] of buckets) {
    if (bucket.resetAt <= now) buckets.delete(key)
  }
}

export interface RateLimitResult {
  allowed: boolean
  retryAfterSeconds: number
}

export function checkContactRateLimit(identifier: string): RateLimitResult {
  const now = Date.now()

  // Barrido oportunista: sin cron ni timers, el Map no crece sin control.
  if (buckets.size > 500) sweep(now)

  const bucket = buckets.get(identifier)

  if (!bucket || bucket.resetAt <= now) {
    buckets.set(identifier, { count: 1, resetAt: now + WINDOW_MS })
    return { allowed: true, retryAfterSeconds: 0 }
  }

  if (bucket.count >= MAX_REQUESTS) {
    return {
      allowed: false,
      retryAfterSeconds: Math.ceil((bucket.resetAt - now) / 1000),
    }
  }

  bucket.count += 1
  return { allowed: true, retryAfterSeconds: 0 }
}

/** IP del visitante detrás del proxy de Vercel. */
export function clientIdentifier(headers: Headers): string {
  const forwarded = headers.get('x-forwarded-for')
  if (forwarded) return forwarded.split(',')[0].trim()
  return headers.get('x-real-ip')?.trim() || 'unknown'
}
