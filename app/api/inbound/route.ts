import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

/**
 * Webhook de Resend Inbound: reenvía el correo que llega al dominio del centro
 * hacia la casilla que se lee todos los días (Gmail, en nuestro caso).
 *
 * El cliente se crea dentro del handler a propósito: instanciarlo a nivel de
 * módulo hace fallar el build cuando RESEND_API_KEY no está definida, que es
 * exactamente lo que pasa en un build limpio.
 */

interface ReceivedEmail {
  subject: string | null
  from: string
  html: string | null
  text: string | null
}

async function getReceivedEmail(emailId: string): Promise<ReceivedEmail | null> {
  const response = await fetch(
    `https://api.resend.com/emails/receiving/${emailId}`,
    { headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}` } }
  )
  if (!response.ok) return null
  return response.json() as Promise<ReceivedEmail>
}

export async function POST(request: NextRequest) {
  const apiKey = process.env.RESEND_API_KEY
  const forwardTo = process.env.INBOUND_FORWARD_TO
  const forwardFrom = process.env.RESEND_FROM_EMAIL

  if (!apiKey || !forwardTo || !forwardFrom) {
    console.error(
      '[inbound] Faltan RESEND_API_KEY, INBOUND_FORWARD_TO o RESEND_FROM_EMAIL'
    )
    return NextResponse.json({ error: 'Server misconfiguration' }, { status: 500 })
  }

  let event: unknown
  try {
    event = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 })
  }

  if (
    typeof event !== 'object' ||
    event === null ||
    (event as Record<string, unknown>).type !== 'email.received'
  ) {
    return NextResponse.json({ ok: true })
  }

  const emailId = (
    (event as Record<string, unknown>).data as Record<string, unknown> | undefined
  )?.email_id as string | undefined

  if (!emailId) {
    return NextResponse.json({ error: 'Missing email_id' }, { status: 400 })
  }

  const email = await getReceivedEmail(emailId)
  if (!email) {
    console.error('[inbound] No se pudo recuperar el correo:', emailId)
    return NextResponse.json({ error: 'Failed to fetch email' }, { status: 500 })
  }

  const from = email.from
  const banner = `<div style="background:#E2FAFF;border-left:4px solid #219FC0;padding:10px 16px;margin-bottom:20px;font-family:sans-serif;font-size:13px;color:#202055;">
    <strong>&#128236; Correo recibido en el dominio</strong> &middot; De: <strong>${from}</strong>
  </div>`

  const resend = new Resend(apiKey)
  const { error } = await resend.emails.send({
    from: forwardFrom,
    to: forwardTo,
    replyTo: from,
    subject: email.subject || '(sin asunto)',
    ...(email.html
      ? { html: `${banner}${email.html}` }
      : { text: `[De: ${from}]\n\n${email.text ?? ''}` }),
  })

  if (error) {
    console.error('[inbound] Error al reenviar:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ ok: true })
}
