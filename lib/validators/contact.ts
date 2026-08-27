import { z } from 'zod'

export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, 'Ingresá tu nombre y apellido')
    .max(100, 'El nombre es demasiado largo'),
  email: z
    .string()
    .trim()
    .email('Ingresá un correo electrónico válido')
    .max(200, 'El correo es demasiado largo'),
  // En salud el teléfono es el canal real de respuesta, así que es requerido.
  phone: z
    .string()
    .trim()
    .min(6, 'Ingresá un teléfono de contacto')
    .max(30, 'El teléfono es demasiado largo'),
  message: z
    .string()
    .trim()
    .min(10, 'Contanos brevemente tu consulta')
    .max(2000, 'El mensaje no puede superar los 2000 caracteres'),
})

export type ContactFormData = z.infer<typeof contactSchema>

/**
 * Payload que viaja al servidor: los datos del formulario más dos señales
 * anti-spam que el usuario no ve.
 *
 * - `website`: honeypot. Un campo oculto que los bots completan y las personas no.
 * - `renderedAt`: momento en que se montó el formulario. Un envío casi
 *   instantáneo delata automatización.
 */
export const contactRequestSchema = contactSchema.extend({
  website: z.string().max(200).optional(),
  renderedAt: z.number().int().positive().optional(),
})

export type ContactRequest = z.infer<typeof contactRequestSchema>

/**
 * Estado que la Server Action le devuelve al formulario.
 *
 * Vive acá y no junto a la action porque un módulo `'use server'` solo puede
 * exportar funciones async: exportar el estado inicial desde ahí rompe el
 * render en tiempo de ejecución.
 */
export interface ContactState {
  status: 'idle' | 'success' | 'error'
  message?: string
  errors?: Partial<Record<keyof ContactFormData, string>>
  /** Se devuelven para repoblar el formulario si falla sin JavaScript. */
  values?: Partial<ContactFormData>
}

export const initialContactState: ContactState = { status: 'idle' }
