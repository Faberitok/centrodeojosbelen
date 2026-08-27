'use client'

import { submitContact } from '@/app/actions/contact'
import { contact } from '@/content/site'
import { initialContactState, type ContactFormData } from '@/lib/validators/contact'
import { useActionState, useEffect, useRef } from 'react'
import { useFormStatus } from 'react-dom'

const copy = contact.form

function SubmitButton() {
  // useFormStatus lee el estado del <form> padre, así que el botón sabe si hay
  // un envío en curso sin que el formulario tenga que pasarle nada.
  const { pending } = useFormStatus()

  return (
    <button
      type="submit"
      disabled={pending}
      className="inline-flex w-full items-center justify-center rounded-lg bg-brand-900 px-8 py-4 text-base font-bold text-white transition-colors hover:bg-brand-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-900 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
    >
      {pending ? copy.submittingLabel : copy.submitLabel}
    </button>
  )
}

export default function ContactForm() {
  const [state, formAction] = useActionState(submitContact, initialContactState)
  const formRef = useRef<HTMLFormElement>(null)
  const renderedAtRef = useRef<HTMLInputElement>(null)

  // Date.now() es impura: no puede correr durante el render.
  useEffect(() => {
    if (renderedAtRef.current) {
      renderedAtRef.current.value = String(Date.now())
    }
  }, [state.status])

  useEffect(() => {
    if (state.status === 'success') {
      formRef.current?.reset()
    }
  }, [state.status])

  if (state.status === 'success') {
    return (
      <div className="rounded-2xl border border-accent-200 bg-accent-50 px-6 py-12 text-center">
        <span
          className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-accent-600 text-white"
          aria-hidden="true"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-7 w-7"
          >
            <path d="m5 13 4 4L19 7" />
          </svg>
        </span>
        <h3 className="mt-5 text-xl font-bold text-brand-900">{copy.successTitle}</h3>
        <p className="mt-2 text-brand-700">{copy.successMessage}</p>
      </div>
    )
  }

  const errors = state.errors ?? {}
  const values = state.values ?? {}

  const inputBase =
    'w-full rounded-lg border px-4 py-3.5 text-brand-900 placeholder:text-brand-400 bg-white focus:outline-none focus:ring-2 focus:ring-accent-600/30 transition'

  function inputClass(field: keyof ContactFormData) {
    return `${inputBase} ${
      errors[field]
        ? 'border-red-500 focus:border-red-500'
        : 'border-brand-300 focus:border-accent-600'
    }`
  }

  return (
    <form ref={formRef} action={formAction} className="space-y-5">
      {/* Honeypot — fuera de la vista y del orden de tabulación */}
      <div className="absolute left-[-9999px]" aria-hidden="true">
        <label htmlFor="website">No completar este campo</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <input ref={renderedAtRef} type="hidden" name="renderedAt" defaultValue="" />

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <div>
          <label htmlFor="name" className="mb-1.5 block text-sm font-semibold text-brand-800">
            {copy.nameLabel} <span className="text-red-600">*</span>
          </label>
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            required
            defaultValue={values.name}
            placeholder={copy.namePlaceholder}
            className={inputClass('name')}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? 'name-error' : undefined}
          />
          {errors.name && (
            <p id="name-error" className="mt-1.5 text-sm text-red-600">
              {errors.name}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="phone" className="mb-1.5 block text-sm font-semibold text-brand-800">
            {copy.phoneLabel} <span className="text-red-600">*</span>
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            inputMode="tel"
            required
            defaultValue={values.phone}
            placeholder={copy.phonePlaceholder}
            className={inputClass('phone')}
            aria-invalid={Boolean(errors.phone)}
            aria-describedby={errors.phone ? 'phone-error' : undefined}
          />
          {errors.phone && (
            <p id="phone-error" className="mt-1.5 text-sm text-red-600">
              {errors.phone}
            </p>
          )}
        </div>
      </div>

      <div>
        <label htmlFor="email" className="mb-1.5 block text-sm font-semibold text-brand-800">
          {copy.emailLabel} <span className="text-red-600">*</span>
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          inputMode="email"
          required
          defaultValue={values.email}
          placeholder={copy.emailPlaceholder}
          className={inputClass('email')}
          aria-invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? 'email-error' : undefined}
        />
        {errors.email && (
          <p id="email-error" className="mt-1.5 text-sm text-red-600">
            {errors.email}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="message" className="mb-1.5 block text-sm font-semibold text-brand-800">
          {copy.messageLabel} <span className="text-red-600">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          defaultValue={values.message}
          placeholder={copy.messagePlaceholder}
          className={`${inputClass('message')} resize-y`}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={
            errors.message ? 'message-error health-notice' : 'health-notice'
          }
        />
        {errors.message && (
          <p id="message-error" className="mt-1.5 text-sm text-red-600">
            {errors.message}
          </p>
        )}
        <p id="health-notice" className="mt-2 text-sm leading-relaxed text-brand-600">
          {copy.healthNotice}
        </p>
      </div>

      {state.message && (
        <p
          className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
          role="alert"
        >
          {state.message}
        </p>
      )}

      <SubmitButton />

      <p className="text-sm text-brand-600">{copy.privacyNotice}</p>
    </form>
  )
}
