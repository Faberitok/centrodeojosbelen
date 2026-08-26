import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

interface ReceivedEmail {
  subject: string | null
  from: string
  html: string | null
  text: string | null
}

async function getReceivedEmail(emailId: string): Promise<ReceivedEmail | null> {
  const res = await fetch(`https://api.resend.com/emails/receiving/${emailId}`, {
    headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}` },
  })
  if (!res.ok) return null
  return res.json() as Promise<ReceivedEmail>
}

export async function POST(request: NextRequest) {
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

  const forwardTo = process.env.INBOUND_FORWARD_TO
  const forwardFrom = process.env.RESEND_FROM_EMAIL

  if (!forwardTo || !forwardFrom) {
    console.error('[inbound] Missing INBOUND_FORWARD_TO or RESEND_FROM_EMAIL env vars')
    return NextResponse.json({ error: 'Server misconfiguration' }, { status: 500 })
  }

  const emailId = (
    (event as Record<string, unknown>).data as Record<string, unknown>
  )?.email_id as string | undefined

  if (!emailId) {
    return NextResponse.json({ error: 'Missing email_id' }, { status: 400 })
  }

  const emailData = await getReceivedEmail(emailId)
  if (!emailData) {
    console.error('[inbound] Failed to fetch received email:', emailId)
    return NextResponse.json({ error: 'Failed to fetch email' }, { status: 500 })
  }

  const subject = emailData.subject || '(sin asunto)'
  const from = emailData.from

  const banner = `<div style="background:#fff3cd;border-left:4px solid #f0a500;padding:10px 16px;margin-bottom:20px;font-family:sans-serif;font-size:13px;">
    <strong>&#128236; Mensaje de contacto</strong> &middot; De: <strong>${from}</strong>
  </div>`

  const sendOptions: Parameters<typeof resend.emails.send>[0] = {
    from: forwardFrom,
    to: forwardTo,
    subject: `${subject}`,
    ...(emailData.html
      ? { html: `${banner}${emailData.html}` }
      : { text: `[CONTACTO · De: ${from}]\n\n${emailData.text ?? ''}` }),
  }

  const { error } = await resend.emails.send(sendOptions)

  if (error) {
    console.error('[inbound] Forward error:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ ok: true })
}
