'use client'

import { brand, siteName } from '@/content/brand'
import { maintenance } from '@/content/maintenance'
import { whatsappHref } from '@/lib/whatsapp'
import Image from 'next/image'
import { useState } from 'react'

/**
 * Página en construcción.
 *
 * Es lo único que ve el visitante mientras MAINTENANCE_MODE_ENABLED=true.
 * El equipo entra al sitio real con usuario y contraseña desde el desplegable
 * de abajo, que queda cerrado por defecto para no ensuciar la página pública.
 * Las credenciales salen de MAINTENANCE_USER y MAINTENANCE_PASSWORD_HASH.
 *
 * Importa de content/brand.ts y content/maintenance.ts, nunca de
 * content/site.ts: al ser componente de cliente, todo lo que importe termina
 * descargándose en el navegador, y el contenido del sitio todavía no debería
 * ser visible mientras la página está cerrada.
 */
export default function MaintenanceGate() {
  const [user, setUser] = useState('')
  const [password, setPassword] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const whatsapp = whatsappHref(maintenance.whatsappMessage)

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError(null)
    setIsSubmitting(true)

    try {
      const response = await fetch('/api/maintenance/unlock', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user, password }),
      })

      if (!response.ok) {
        const data = (await response.json().catch(() => null)) as
          | { error?: string; retryAfterSeconds?: number }
          | null

        if (response.status === 429 && typeof data?.retryAfterSeconds === 'number') {
          const minutes = Math.ceil(data.retryAfterSeconds / 60)
          setError(`Demasiados intentos fallidos. Intentá de nuevo en ${minutes} min.`)
        } else {
          setError(data?.error ?? 'No se pudieron validar los datos. Intentá de nuevo.')
        }

        return
      }

      window.location.reload()
    } catch {
      setError('No se pudo conectar con el servidor. Intentá de nuevo.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    /* El fondo lo pinta body.maintenance-page: así cubre también la franja de
       la barra de estado y el rebote del scroll, que quedaban blancos. */
    <section className="flex min-h-[100svh] items-center justify-center px-6 py-16 text-white">
      <div className="w-full max-w-xl text-left">
        {/* PNG y no el SVG que exportó el diseñador: ese arma la transparencia
            con <mask> + feColorMatrix sobre imágenes rasterizadas, y Safari en
            iOS no resuelve esa combinación — pinta un rectángulo negro. */}
        <Image
          src={brand.logoDark}
          alt={siteName}
          width={1142}
          height={512}
          sizes="(min-width: 768px) 380px, 280px"
          className="h-auto w-[240px] md:w-[320px]"
          priority
        />

        <p className="mt-12 text-xs font-semibold uppercase tracking-[0.18em] text-accent-300">
          {maintenance.badge}
        </p>

        <h1 className="mt-5 text-2xl font-semibold leading-snug tracking-tight md:text-3xl">
          {maintenance.title}
        </h1>

        <p className="mt-4 max-w-lg text-base leading-relaxed text-brand-200 md:text-lg">
          {maintenance.message}
        </p>

        {whatsapp && (
          <a
            href={whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-9 inline-flex items-center justify-center gap-2 rounded-lg bg-accent-500 px-6 py-4 text-base font-semibold text-brand-950 transition-colors hover:bg-accent-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-brand-900"
          >
            <svg viewBox="0 0 16 16" fill="currentColor" className="h-5 w-5" aria-hidden="true">
              <path d="M13.6 2.33A7.85 7.85 0 0 0 8 0a7.9 7.9 0 0 0-6.85 11.85L0 16l4.25-1.1A7.9 7.9 0 0 0 8 15.85 7.9 7.9 0 0 0 13.6 2.33ZM8 14.52c-1.17 0-2.32-.31-3.32-.9l-.24-.15-2.47.65.66-2.41-.16-.25a6.56 6.56 0 1 1 12.09-3.51A6.57 6.57 0 0 1 8 14.52Zm3.6-4.92c-.2-.1-1.17-.58-1.35-.64-.18-.07-.31-.1-.45.1-.13.2-.5.64-.62.77-.11.13-.23.15-.43.05-.2-.1-.83-.31-1.59-.98a5.94 5.94 0 0 1-1.1-1.37c-.11-.2-.01-.3.09-.4.09-.09.2-.23.3-.35.1-.12.13-.2.2-.34.06-.13.03-.25-.02-.35-.05-.1-.45-1.08-.61-1.47-.16-.39-.33-.34-.45-.34l-.38-.01c-.13 0-.35.05-.53.25-.18.2-.7.68-.7 1.66s.72 1.92.82 2.06c.1.13 1.41 2.15 3.42 3.02.48.2.85.33 1.14.42.48.15.91.13 1.26.08.38-.06 1.17-.48 1.34-.94.16-.46.16-.86.11-.94-.05-.08-.18-.13-.38-.23Z" />
            </svg>
            {maintenance.whatsappLabel}
          </a>
        )}

        <details className="group mt-16 text-left">
          <summary className="-ml-2 flex min-h-11 w-fit cursor-pointer list-none items-center gap-1.5 rounded-lg px-2 py-3 text-sm font-medium text-brand-400 transition-colors hover:text-brand-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-400 [&::-webkit-details-marker]:hidden">
            {maintenance.teamAccessLabel}
            <svg
              viewBox="0 0 20 20"
              fill="currentColor"
              className="h-4 w-4 transition-transform group-open:rotate-180"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z"
                clipRule="evenodd"
              />
            </svg>
          </summary>

          <form
            onSubmit={onSubmit}
            noValidate
            className="mt-4 max-w-sm rounded-xl border border-brand-700 bg-brand-950/50 p-5"
          >
            <label
              htmlFor="maintenance-user"
              className="block text-sm font-semibold text-brand-200"
            >
              {maintenance.userLabel}
            </label>
            <input
              id="maintenance-user"
              name="user"
              type="text"
              autoComplete="username"
              autoCapitalize="none"
              autoCorrect="off"
              spellCheck={false}
              required
              value={user}
              onChange={(event) => setUser(event.target.value)}
              className="mt-2 mb-4 w-full rounded-lg border border-brand-600 bg-brand-900/70 px-4 py-3 text-white placeholder:text-brand-400 focus:border-accent-500 focus:outline-none focus:ring-2 focus:ring-accent-500/30"
              placeholder={maintenance.userPlaceholder}
            />

            <label
              htmlFor="maintenance-password"
              className="block text-sm font-semibold text-brand-200"
            >
              {maintenance.passwordLabel}
            </label>
            <input
              id="maintenance-password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="mt-2 w-full rounded-lg border border-brand-600 bg-brand-900/70 px-4 py-3 text-white placeholder:text-brand-400 focus:border-accent-500 focus:outline-none focus:ring-2 focus:ring-accent-500/30"
              placeholder={maintenance.passwordPlaceholder}
              aria-describedby={error ? 'maintenance-error' : undefined}
              aria-invalid={Boolean(error)}
            />

            {error && (
              <p id="maintenance-error" className="mt-2 text-sm text-red-300" role="alert">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={
                isSubmitting || user.trim().length === 0 || password.trim().length === 0
              }
              className="mt-4 w-full rounded-lg bg-white px-6 py-3 font-bold text-brand-900 transition-colors hover:bg-brand-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-brand-900 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isSubmitting ? maintenance.submittingLabel : maintenance.submitLabel}
            </button>
          </form>
        </details>
      </div>
    </section>
  )
}
