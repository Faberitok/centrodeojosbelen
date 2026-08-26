import {
    getMaintenanceCookieName,
    getMaintenanceCookieTtlSeconds,
    isMaintenanceEnabled,
    issueMaintenanceCookieValue,
    validateMaintenancePassword,
} from '@/lib/maintenance/auth'
import {
    evaluateMaintenanceRateLimit,
    getRateLimitKey,
    registerMaintenanceFailure,
    resetMaintenanceFailures,
} from '@/lib/security/maintenanceRateLimit'
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

const bodySchema = z.object({
  password: z.string().min(1, 'Ingresá la contraseña'),
})

export async function POST(request: NextRequest) {
  if (!isMaintenanceEnabled()) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 })
  }

  const rawIp = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown-ip'
  const userAgent = request.headers.get('user-agent') ?? 'unknown-ua'
  const rateLimitKey = getRateLimitKey(rawIp, userAgent)

  const decision = evaluateMaintenanceRateLimit(rateLimitKey)
  if (!decision.allowed) {
    return NextResponse.json(
      {
        error: 'Demasiados intentos fallidos. Volvé a intentar más tarde.',
        retryAfterSeconds: decision.retryAfterSeconds,
      },
      {
        status: 429,
        headers: {
          'Cache-Control': 'no-store',
          'Retry-After': String(decision.retryAfterSeconds),
        },
      }
    )
  }

  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json(
      { error: 'No se pudo procesar la solicitud.' },
      {
        status: 400,
        headers: {
          'Cache-Control': 'no-store',
        },
      }
    )
  }

  const parsed = bodySchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json(
      { error: 'Ingresá una contraseña válida.' },
      {
        status: 400,
        headers: {
          'Cache-Control': 'no-store',
        },
      }
    )
  }

  if (!validateMaintenancePassword(parsed.data.password)) {
    const failedDecision = registerMaintenanceFailure(rateLimitKey)
    const headers: Record<string, string> = {
      'Cache-Control': 'no-store',
    }

    if (!failedDecision.allowed && failedDecision.retryAfterSeconds > 0) {
      headers['Retry-After'] = String(failedDecision.retryAfterSeconds)
    }

    return NextResponse.json(
      {
        error: failedDecision.allowed
          ? 'Contraseña incorrecta.'
          : 'Demasiados intentos fallidos. Volvé a intentar más tarde.',
        retryAfterSeconds: failedDecision.retryAfterSeconds,
      },
      {
        status: failedDecision.allowed ? 401 : 429,
        headers,
      }
    )
  }

  resetMaintenanceFailures(rateLimitKey)

  const cookieValue = issueMaintenanceCookieValue()
  if (!cookieValue) {
    return NextResponse.json(
      { error: 'Configuración incompleta de mantenimiento.' },
      {
        status: 500,
        headers: {
          'Cache-Control': 'no-store',
        },
      }
    )
  }

  const response = NextResponse.json(
    { success: true },
    {
      status: 200,
      headers: {
        'Cache-Control': 'no-store',
      },
    }
  )

  response.cookies.set({
    name: getMaintenanceCookieName(),
    value: cookieValue,
    path: '/',
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: getMaintenanceCookieTtlSeconds(),
  })

  return response
}
