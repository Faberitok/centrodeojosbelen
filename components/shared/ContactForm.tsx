'use client'

import { contactSchema, type ContactFormData } from '@/lib/validators/contact'
import { useEffect, useState } from 'react'

type FormState = 'idle' | 'submitting' | 'success' | 'error'

export default function ContactForm() {
  const [state, setState] = useState<FormState>('idle')
  const [errors, setErrors] = useState<Partial<Record<keyof ContactFormData, string>>>({})
  const [serverError, setServerError] = useState<string | null>(null)
  const [fields, setFields] = useState<ContactFormData>({
    name: '',
    email: '',
    message: '',
    phone: '',
    company: '',
  })

  useEffect(() => {
    function handlePrefill(event: Event) {
      const customEvent = event as CustomEvent<string>
      const message = (customEvent.detail ?? '').trim()
      if (!message) return

      setFields((prev) => ({ ...prev, message }))
      setErrors((prev) => ({ ...prev, message: undefined }))

      const textarea = document.getElementById('message') as HTMLTextAreaElement | null
      textarea?.focus()
    }

    window.addEventListener('contact-prefill-message', handlePrefill)
    return () => {
      window.removeEventListener('contact-prefill-message', handlePrefill)
    }
  }, [])

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target
    setFields((prev) => ({ ...prev, [name]: value }))
    if (errors[name as keyof ContactFormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }))
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setServerError(null)

    const result = contactSchema.safeParse(fields)
    if (!result.success) {
      const fieldErrors: Partial<Record<keyof ContactFormData, string>> = {}
      result.error.errors.forEach((err) => {
        const key = err.path[0] as keyof ContactFormData
        if (!fieldErrors[key]) fieldErrors[key] = err.message
      })
      setErrors(fieldErrors)
      return
    }

    setState('submitting')

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(result.data),
      })

      if (res.ok) {
        setState('success')
        setFields({ name: '', email: '', message: '', phone: '', company: '' })
        setErrors({})
      } else {
        const body = await res.json().catch(() => ({}))
        setState('error')
        setServerError(
          (body as { error?: string }).error ??
            'Ocurrió un error. Por favor, intentá de nuevo.'
        )
      }
    } catch {
      setState('error')
      setServerError(
        'No se pudo conectar al servidor. Revisá tu conexión e intentá de nuevo.'
      )
    }
  }

  if (state === 'success') {
    return (
      <div className="text-center py-12 px-6 bg-brand-50 rounded-xl border border-brand-200">
        <div className="mb-4 text-4xl" aria-hidden="true">
          ✅
        </div>
        <h3 className="text-xl font-bold text-brand-900 mb-2">¡Mensaje enviado!</h3>
        <p className="text-brand-600">Te respondemos en menos de 24 horas.</p>
        <button
          type="button"
          onClick={() => setState('idle')}
          className="mt-6 text-sm text-brand-600 underline hover:text-brand-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 rounded"
        >
          Enviar otro mensaje
        </button>
      </div>
    )
  }

  const inputBase =
    'w-full px-4 py-3 rounded-md border text-brand-900 placeholder:text-brand-400 bg-white focus:outline-none focus:ring-2 focus:ring-brand-600 focus:border-transparent transition'

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Name */}
        <div>
          <label htmlFor="name" className="block text-sm font-semibold text-brand-800 mb-1.5">
            Nombre <span aria-hidden="true" className="text-red-500">*</span>
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            autoComplete="name"
            value={fields.name}
            onChange={handleChange}
            aria-describedby={errors.name ? 'name-error' : undefined}
            aria-invalid={!!errors.name}
            className={`${inputBase} ${errors.name ? 'border-red-400' : 'border-brand-200'}`}
            placeholder="Tu nombre"
          />
          {errors.name && (
            <p id="name-error" role="alert" className="mt-1 text-xs text-red-600">
              {errors.name}
            </p>
          )}
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="block text-sm font-semibold text-brand-800 mb-1.5">
            Email <span aria-hidden="true" className="text-red-500">*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            value={fields.email}
            onChange={handleChange}
            aria-describedby={errors.email ? 'email-error' : undefined}
            aria-invalid={!!errors.email}
            className={`${inputBase} ${errors.email ? 'border-red-400' : 'border-brand-200'}`}
            placeholder="tu@email.com"
          />
          {errors.email && (
            <p id="email-error" role="alert" className="mt-1 text-xs text-red-600">
              {errors.email}
            </p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Phone */}
        <div>
          <label htmlFor="phone" className="block text-sm font-semibold text-brand-800 mb-1.5">
            Teléfono{' '}
            <span className="text-brand-400 font-normal">(opcional)</span>
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            value={fields.phone}
            onChange={handleChange}
            className={`${inputBase} border-brand-200`}
            placeholder="+54 9 11 XXXX-XXXX"
          />
        </div>

        {/* Company */}
        <div>
          <label
            htmlFor="company"
            className="block text-sm font-semibold text-brand-800 mb-1.5"
          >
            Empresa{' '}
            <span className="text-brand-400 font-normal">(opcional)</span>
          </label>
          <input
            id="company"
            name="company"
            type="text"
            autoComplete="organization"
            value={fields.company}
            onChange={handleChange}
            className={`${inputBase} border-brand-200`}
            placeholder="Nombre de tu empresa"
          />
        </div>
      </div>

      {/* Message */}
      <div>
        <label htmlFor="message" className="block text-sm font-semibold text-brand-800 mb-1.5">
          Mensaje <span aria-hidden="true" className="text-red-500">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          value={fields.message}
          onChange={handleChange}
          aria-describedby={errors.message ? 'message-error' : undefined}
          aria-invalid={!!errors.message}
          className={`${inputBase} resize-y min-h-[120px] ${errors.message ? 'border-red-400' : 'border-brand-200'}`}
          placeholder="Contanos qué necesitás resolver..."
        />
        {errors.message && (
          <p id="message-error" role="alert" className="mt-1 text-xs text-red-600">
            {errors.message}
          </p>
        )}
      </div>

      {/* Server error */}
      {state === 'error' && serverError && (
        <div
          role="alert"
          className="p-4 bg-red-50 border border-red-200 rounded-md text-sm text-red-700"
        >
          {serverError}
        </div>
      )}

      <button
        type="submit"
        disabled={state === 'submitting'}
        aria-disabled={state === 'submitting'}
        className="w-full md:w-auto px-8 py-3.5 bg-brand-700 text-white font-semibold rounded-md cursor-pointer hover:bg-brand-800 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-brand-900/20 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2 transition-all duration-200"
      >
        {state === 'submitting' ? 'Enviando…' : 'Enviar mensaje'}
      </button>
    </form>
  )
}
