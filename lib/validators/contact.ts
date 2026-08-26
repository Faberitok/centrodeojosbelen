import { z } from 'zod'

export const contactSchema = z.object({
  name: z
    .string()
    .min(2, 'El nombre debe tener al menos 2 caracteres')
    .max(100, 'El nombre es demasiado largo'),
  email: z
    .string()
    .email('Ingresá un correo electrónico válido')
    .max(200, 'El correo es demasiado largo'),
  message: z
    .string()
    .min(10, 'El mensaje debe tener al menos 10 caracteres')
    .max(2000, 'El mensaje no puede superar los 2000 caracteres'),
  phone: z
    .string()
    .max(30, 'El teléfono es demasiado largo')
    .optional()
    .or(z.literal('')),
  company: z
    .string()
    .max(100, 'El nombre de empresa es demasiado largo')
    .optional()
    .or(z.literal('')),
})

export type ContactFormData = z.infer<typeof contactSchema>
