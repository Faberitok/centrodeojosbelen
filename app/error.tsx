'use client'

import Link from 'next/link'
import { useEffect } from 'react'

/**
 * Error boundary de la ruta. Tiene que ser Client Component por definición
 * del framework: recibe el callback `reset`.
 */
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error('[app] Error no controlado:', error)
  }, [error])

  return (
    <section className="mx-auto flex min-h-[60vh] max-w-[1140px] flex-col items-center justify-center px-6 py-24 text-center">
      <p className="text-xs font-bold uppercase tracking-[0.18em] text-accent-600">
        Algo salió mal
      </p>
      <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-brand-900 md:text-4xl">
        No pudimos cargar esta sección
      </h1>
      <p className="mt-4 max-w-md text-lg leading-relaxed text-brand-700">
        Probá de nuevo en un momento. Si necesitás un turno ahora, escribinos por
        WhatsApp y te atendemos igual.
      </p>

      <div className="mt-9 flex flex-col gap-3 sm:flex-row">
        <button
          type="button"
          onClick={reset}
          className="inline-flex cursor-pointer items-center justify-center rounded-lg bg-brand-900 px-7 py-4 text-base font-bold text-white transition-colors hover:bg-brand-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-900 focus-visible:ring-offset-2"
        >
          Reintentar
        </button>
        <Link
          href="/#contacto"
          className="inline-flex cursor-pointer items-center justify-center rounded-lg border border-brand-300 px-7 py-4 text-base font-semibold text-brand-900 transition-colors hover:bg-brand-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-600 focus-visible:ring-offset-2"
        >
          Ver datos de contacto
        </Link>
      </div>

      {error.digest && (
        <p className="mt-8 text-xs text-brand-500">Referencia: {error.digest}</p>
      )}
    </section>
  )
}
