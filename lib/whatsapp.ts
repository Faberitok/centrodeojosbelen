const DEFAULT_MESSAGE = 'Hola, quisiera hacer una consulta.'

/**
 * Enlace al chatbot del centro.
 *
 * Devuelve null si no hay número configurado, para que cada componente decida
 * qué hacer sin romper el render (kick-off: el WhatsApp es un valor de entorno,
 * no un dato hardcodeado).
 */
export function whatsappHref(message?: string): string | null {
  const number = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER?.trim()
  if (!number) return null

  const text =
    message ?? process.env.NEXT_PUBLIC_WHATSAPP_MESSAGE?.trim() ?? DEFAULT_MESSAGE

  return `https://wa.me/${number}?text=${encodeURIComponent(text)}`
}

/** Href de fallback: si no hay WhatsApp configurado, manda al formulario. */
export function appointmentHref(message?: string): string {
  return whatsappHref(message) ?? '#contacto'
}
