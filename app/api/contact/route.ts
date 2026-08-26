import { insertContactMessage } from '@/lib/db/contact'
import { createEmailAdapter } from '@/lib/email/resend'
import { contactSchema } from '@/lib/validators/contact'
import { NextRequest, NextResponse } from 'next/server'

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}

export async function POST(request: NextRequest) {
  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 })
  }

  const result = contactSchema.safeParse(body)
  if (!result.success) {
    return NextResponse.json(
      {
        error: 'Validation failed',
        issues: result.error.errors.map((e) => ({
          path: e.path,
          message: e.message,
        })),
      },
      { status: 400 }
    )
  }

  const data = result.data

  try {
    await insertContactMessage(data)
  } catch (err) {
    console.error('[contact] DB insert error:', err)
    return NextResponse.json(
      { error: 'No se pudo guardar el mensaje. Intentá de nuevo más tarde.' },
      { status: 500 }
    )
  }

  // Fire-and-forget email notification — never blocks the response
  const emailTo = process.env.CONTACT_EMAIL_TO
  const resendKey = process.env.RESEND_API_KEY
  if (emailTo && resendKey) {
    try {
      const emailAdapter = createEmailAdapter()
      emailAdapter
        .send({
          to: emailTo,
          subject: `Nuevo mensaje de contacto — ${escapeHtml(data.name)}`,
          html: [
            '<h2>Nuevo mensaje desde el formulario de contacto</h2>',
            `<p><strong>Nombre:</strong> ${escapeHtml(data.name)}</p>`,
            `<p><strong>Email:</strong> ${escapeHtml(data.email)}</p>`,
            data.phone ? `<p><strong>Teléfono:</strong> ${escapeHtml(data.phone)}</p>` : '',
            data.company
              ? `<p><strong>Empresa:</strong> ${escapeHtml(data.company)}</p>`
              : '',
            '<p><strong>Mensaje:</strong></p>',
            `<p>${escapeHtml(data.message).replace(/\n/g, '<br />')}</p>`,
          ]
            .filter(Boolean)
            .join('\n'),
        })
        .then(() => console.log('[contact] Email sent ok to', emailTo))
        .catch((err) => console.error('[contact] Email send error:', err))
    } catch (err) {
      console.error('[contact] Email setup error:', err)
    }
  }

  return NextResponse.json({ success: true })
}
