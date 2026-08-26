'use client'

import Button from '@/components/shared/Button'
import { useState } from 'react'

export default function MaintenanceGate() {
  const [password, setPassword] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError(null)
    setIsSubmitting(true)

    try {
      const response = await fetch('/api/maintenance/unlock', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password }),
      })

      if (!response.ok) {
        const data = (await response.json().catch(() => null)) as
          | { error?: string; retryAfterSeconds?: number }
          | null

        if (response.status === 429 && typeof data?.retryAfterSeconds === 'number') {
          const minutes = Math.ceil(data.retryAfterSeconds / 60)
          setError(`Demasiados intentos fallidos. Intentá de nuevo en ${minutes} min.`)
        } else {
          setError(data?.error ?? 'No se pudo validar la contraseña. Intentá de nuevo.')
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
    <section className="relative min-h-screen overflow-hidden bg-brand-900 text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(161,171,192,0.25),transparent_40%),radial-gradient(circle_at_80%_10%,rgba(101,117,150,0.35),transparent_42%),linear-gradient(160deg,#13161C_0%,#282E3A_45%,#13161C_100%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_0%,rgba(19,22,28,0.6)_70%,rgba(19,22,28,0.95)_100%)]" />

      <div className="relative max-w-[1140px] mx-auto px-6 py-16 min-h-screen flex items-center justify-center">
        <div className="w-full max-w-xl rounded-2xl border border-brand-500/40 bg-brand-800/65 backdrop-blur-sm shadow-[0_24px_80px_rgba(0,0,0,0.35)] p-8 md:p-10">
          <p className="inline-flex items-center rounded-full border border-brand-400/60 bg-brand-700/40 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-brand-100">
            Sitio temporalmente no disponible
          </p>

          <h1 className="mt-6 text-4xl md:text-5xl font-extrabold leading-tight tracking-tight text-white">
            Página en construcción
          </h1>

          <p className="mt-4 text-base md:text-lg text-brand-100/90 leading-relaxed">
            Estamos realizando mejoras para brindarte una mejor experiencia. Si tenes acceso,
            ingresá la contraseña para continuar.
          </p>

          <form onSubmit={onSubmit} className="mt-8 space-y-4" noValidate>
            <div className="space-y-2">
              <label htmlFor="maintenance-password" className="text-sm font-medium text-brand-100">
                Contraseña
              </label>
              <input
                id="maintenance-password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="w-full rounded-md border border-brand-400/60 bg-brand-900/60 px-4 py-3 text-white placeholder:text-brand-300/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-200"
                placeholder="Ingresá la contraseña"
                aria-describedby={error ? 'maintenance-error' : undefined}
                aria-invalid={Boolean(error)}
              />
            </div>

            {error ? (
              <p id="maintenance-error" className="text-sm text-red-300" role="alert">
                {error}
              </p>
            ) : null}

            <Button
              type="submit"
              disabled={isSubmitting || password.trim().length === 0}
              className="w-full disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Validando...' : 'Ingresar'}
            </Button>
          </form>
        </div>
      </div>
    </section>
  )
}
