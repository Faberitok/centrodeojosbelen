'use client'

import { brand, siteName } from '@/content/brand'
import { nav } from '@/content/navigation'
import { appointmentHref } from '@/lib/whatsapp'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  const ctaHref = appointmentHref()
  const ctaIsExternal = ctaHref.startsWith('http')

  // Con el menú abierto, bloquear el scroll del body evita el efecto de
  // "doble scroll" en mobile.
  useEffect(() => {
    if (!open) return
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = previous
    }
  }, [open])

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') setOpen(false)
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [])

  function navigateFromHome(
    event: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) {
    setOpen(false)
    if (pathname !== '/') return

    if (href === '/') {
      event.preventDefault()
      window.history.replaceState(null, '', '/')
      window.scrollTo({ top: 0, behavior: 'smooth' })
      return
    }

    if (href.startsWith('/#')) {
      const target = document.getElementById(href.slice(2))
      if (!target) return
      event.preventDefault()
      window.history.pushState(null, '', href)
      target.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <header className="fixed inset-x-0 top-0 z-40 w-full border-b border-white/50 bg-white/70 shadow-[0_8px_30px_-24px_rgba(16,16,48,0.45)] backdrop-blur-xl">
      <div className="max-w-[1140px] mx-auto px-6">
        <div className="flex h-16 md:h-20 items-center justify-between gap-4">
          <Link
            href="/#inicio"
            className="flex min-h-11 items-center rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-600 focus-visible:ring-offset-2"
            aria-label={`${siteName} — Inicio`}
            onClick={() => setOpen(false)}
          >
            <Image
              src={brand.logoLight}
              alt={siteName}
              width={1180}
              height={526}
              sizes="(min-width: 768px) 220px, 170px"
              className="h-10 md:h-12 w-auto object-contain"
              priority
            />
          </Link>

          <nav
            aria-label="Navegación principal"
            className="hidden items-center gap-5 xl:flex"
          >
            {nav.links.map((link) =>
              'children' in link ? (
                <div key={link.href} className="group relative flex items-center">
                  <Link
                    href={link.href}
                    onClick={(event) => navigateFromHome(event, link.href)}
                    className="rounded px-1 py-1 text-[15px] font-semibold text-brand-800 transition-colors hover:text-accent-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-600"
                  >
                    {link.label}
                  </Link>
                  <button
                    type="button"
                    aria-label="Mostrar opciones de servicios"
                    className="rounded p-1 text-brand-600 transition group-hover:text-accent-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-600"
                  >
                    <svg viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4" aria-hidden="true">
                      <path fillRule="evenodd" d="M5.22 7.97a.75.75 0 0 1 1.06 0L10 11.69l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.03a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
                    </svg>
                  </button>
                  <div className="invisible absolute left-0 top-full z-50 w-48 translate-y-1 rounded-xl border border-brand-100 bg-white p-2 opacity-0 shadow-xl transition group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100">
                    {link.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className="block rounded-lg px-4 py-2.5 text-sm font-semibold text-brand-800 transition-colors hover:bg-brand-50 hover:text-accent-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-600"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                </div>
              ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={(event) => navigateFromHome(event, link.href)}
                  className="rounded px-1 py-1 text-[15px] font-semibold text-brand-800 transition-colors hover:text-accent-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-600"
                >
                  {link.label}
                </Link>
              )
            )}
          </nav>

          <a
            href={ctaHref}
            {...(ctaIsExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
            className="hidden md:inline-flex cursor-pointer items-center px-5 py-3 rounded-lg bg-brand-900 text-white text-[15px] font-semibold hover:bg-brand-800 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-900 focus-visible:ring-offset-2"
          >
            {nav.ctaLabel}
          </a>

          <button
            type="button"
            aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={open}
            aria-controls="mobile-menu"
            className="-mr-2 cursor-pointer rounded-lg p-3 text-brand-900 hover:text-accent-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-600 xl:hidden"
            onClick={() => setOpen((value) => !value)}
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              className="w-6 h-6"
              aria-hidden="true"
            >
              {open ? (
                <path d="M6 18 18 6M6 6l12 12" />
              ) : (
                <path d="M4 7h16M4 12h16M4 17h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {open && (
        <div id="mobile-menu" className="border-t border-brand-100 bg-white xl:hidden">
          <nav
            aria-label="Menú de navegación"
            className="max-w-[1140px] mx-auto px-6 py-4 flex flex-col"
          >
            {nav.links.map((link) => (
              <div key={link.href} className="border-b border-brand-100">
                <Link
                  href={link.href}
                  className="block rounded py-3.5 text-base font-semibold text-brand-800 transition-colors hover:text-accent-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-600"
                  onClick={(event) => navigateFromHome(event, link.href)}
                >
                  {link.label}
                </Link>
                {'children' in link && (
                  <div className="-mt-1 mb-3 flex gap-2 pl-3">
                    {link.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className="rounded-lg bg-brand-50 px-3 py-2 text-sm font-semibold text-brand-700 hover:text-accent-700"
                        onClick={() => setOpen(false)}
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <a
              href={ctaHref}
              {...(ctaIsExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              className="mt-5 inline-flex cursor-pointer justify-center items-center px-5 py-3.5 rounded-lg bg-brand-900 text-white text-base font-semibold hover:bg-brand-800 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-900 focus-visible:ring-offset-2"
              onClick={() => setOpen(false)}
            >
              {nav.ctaLabel}
            </a>
          </nav>
        </div>
      )}
    </header>
  )
}
