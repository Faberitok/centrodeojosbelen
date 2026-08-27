'use server'

import { site } from '@/content/site'
import { createEmailAdapter } from '@/lib/email/resend'
import {
  checkContactRateLimit,
  clientIdentifier,
} from '@/lib/security/contactRateLimit'
import {
  contactSchema,
  type ContactFormData,
  type ContactState,
} from '@/lib/validators/contact'
import { headers } from 'next/headers'

/** Tiempo mínimo verosímil entre que se abre el formulario y se envía. */
const MIN_FILL_MS = 3000

const FALLBACK_ERROR =
  'No pudimos enviar tu consulta. Escribinos por WhatsApp o llamanos por teléfono y te respondemos enseguida.'

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}

/**
 * Envío del formulario de contacto.
 *
 * Es una Server Action y no un route handler: el formulario funciona sin
 * JavaScript, que en un sitio de salud importa más que en otros rubros.
 *
 * Sin base de datos, el correo es el único registro de la consulta. Por eso el
 * envío se espera y, si falla, se le avisa al visitante en lugar de responder
 * "enviado" sin saber si llegó.
 */
export async function submitContact(
  _previousState: ContactState,
  formData: FormData
): Promise<ContactState> {
  const values: Partial<ContactFormData> = {
    name: String(formData.get('name') ?? ''),
    email: String(formData.get('email') ?? ''),
    phone: String(formData.get('phone') ?? ''),
    message: String(formData.get('message') ?? ''),
  }

  const requestHeaders = await headers()
  const rate = checkContactRateLimit(clientIdentifier(requestHeaders))
  if (!rate.allowed) {
    return {
      status: 'error',
      message: `Recibimos varias consultas desde esta conexión. Probá de nuevo en ${Math.ceil(
        rate.retryAfterSeconds / 60
      )} minutos o escribinos por WhatsApp.`,
      values,
    }
  }

  // Honeypot y time-trap: se devuelve "éxito" a propósito. Un bot que recibe un
  // error sabe que fue detectado y reintenta con otra estrategia.
  const honeypot = String(formData.get('website') ?? '').trim()
  if (honeypot !== '') {
    console.warn('[contact] Honeypot activado — descartado')
    return { status: 'success' }
  }

  const renderedAt = Number(formData.get('renderedAt'))
  if (Number.isFinite(renderedAt) && renderedAt > 0) {
    if (Date.now() - renderedAt < MIN_FILL_MS) {
      console.warn('[contact] Envío demasiado rápido — descartado')
      return { status: 'success' }
    }
  }

  const result = contactSchema.safeParse(values)
  if (!result.success) {
    const errors: Partial<Record<keyof ContactFormData, string>> = {}
    result.error.errors.forEach((issue) => {
      const key = issue.path[0] as keyof ContactFormData
      if (!errors[key]) errors[key] = issue.message
    })
    return { status: 'error', errors, values }
  }

  const data = result.data
  const emailTo = process.env.CONTACT_EMAIL_TO

  if (!emailTo || !process.env.RESEND_API_KEY) {
    console.error('[contact] Falta CONTACT_EMAIL_TO o RESEND_API_KEY')
    return { status: 'error', message: FALLBACK_ERROR, values }
  }

  try {
    await createEmailAdapter().send({
      to: emailTo,
      replyTo: data.email,
      subject: `Consulta web — ${data.name}`,
      html: [
        `<h2 style="font-family:sans-serif;color:#202055;">Nueva consulta desde ${site.domain}</h2>`,
        '<table style="font-family:sans-serif;font-size:15px;border-collapse:collapse;">',
        `<tr><td style="padding:4px 12px 4px 0;"><strong>Nombre</strong></td><td>${escapeHtml(data.name)}</td></tr>`,
        `<tr><td style="padding:4px 12px 4px 0;"><strong>Teléfono</strong></td><td>${escapeHtml(data.phone)}</td></tr>`,
        `<tr><td style="padding:4px 12px 4px 0;"><strong>Correo</strong></td><td>${escapeHtml(data.email)}</td></tr>`,
        '</table>',
        '<p style="font-family:sans-serif;font-size:15px;"><strong>Consulta:</strong></p>',
        `<p style="font-family:sans-serif;font-size:15px;white-space:pre-wrap;">${escapeHtml(data.message)}</p>`,
      ].join('\n'),
    })
  } catch (error) {
    console.error('[contact] Error al enviar el correo:', error)
    return { status: 'error', message: FALLBACK_ERROR, values }
  }

  return { status: 'success' }
}
