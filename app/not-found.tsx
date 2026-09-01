import Link from 'next/link'
import { nav } from '@/content/site'

export default function NotFound() {
  return (
    <section className="mx-auto flex min-h-[60vh] max-w-[1140px] flex-col items-center justify-center px-6 py-24 text-center">
      <p className="text-xs font-bold uppercase tracking-[0.18em] text-accent-600">
        Error 404
      </p>
      <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-brand-900 md:text-4xl">
        No encontramos esta página
      </h1>
      <p className="mt-4 max-w-md text-lg leading-relaxed text-brand-700">
        Puede que el enlace esté desactualizado o que la dirección tenga un error.
      </p>

      <div className="mt-9 flex flex-col gap-3 sm:flex-row">
        <Link
          href="/"
          className="inline-flex cursor-pointer items-center justify-center rounded-lg bg-brand-900 px-7 py-4 text-base font-bold text-white transition-colors hover:bg-brand-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-900 focus-visible:ring-offset-2"
        >
          Volver al inicio
        </Link>
        <Link
          href="/#contacto"
          className="inline-flex cursor-pointer items-center justify-center rounded-lg border border-brand-300 px-7 py-4 text-base font-semibold text-brand-900 transition-colors hover:bg-brand-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-600 focus-visible:ring-offset-2"
        >
          Contactarnos
        </Link>
      </div>

      <nav aria-label="Secciones del sitio" className="mt-12">
        <ul className="flex flex-wrap justify-center gap-x-6 gap-y-2">
          {nav.links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="text-[15px] font-semibold text-accent-700 underline underline-offset-4 hover:text-accent-800"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </section>
  )
}
