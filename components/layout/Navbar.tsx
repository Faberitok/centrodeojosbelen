'use client'

import { brand, nav, site } from '@/content/site'
import { appointmentHref } from '@/lib/whatsapp'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function Navbar() {
  const [open, setOpen] = useState(false)
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

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-sm border-b border-brand-100">
      <div className="max-w-[1140px] mx-auto px-6">
        <div className="flex h-16 md:h-20 items-center justify-between gap-4">
          <Link
            href="#inicio"
            className="flex min-h-11 items-center rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-600 focus-visible:ring-offset-2"
            aria-label={`${site.name} — Inicio`}
            onClick={() => setOpen(false)}
          >
            <Image
              src={brand.logoLight}
              alt={site.name}
              width={1180}
              height={526}
              sizes="(min-width: 768px) 220px, 170px"
              className="h-10 md:h-12 w-auto object-contain"
              priority
            />
          </Link>

          <nav
            aria-label="Navegación principal"
            className="hidden lg:flex items-center gap-7"
          >
            {nav.links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-[15px] font-semibold text-brand-800 hover:text-accent-600 transition-colors rounded px-1 py-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-600"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <a
            href={ctaHref}
            {...(ctaIsExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
            className="hidden md:inline-flex items-center px-5 py-3 rounded-lg bg-brand-900 text-white text-[15px] font-semibold hover:bg-brand-800 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-900 focus-visible:ring-offset-2"
          >
            {nav.ctaLabel}
          </a>

          <button
            type="button"
            aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={open}
            aria-controls="mobile-menu"
            className="lg:hidden -mr-2 p-3 text-brand-900 hover:text-accent-600 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-600"
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
        <div id="mobile-menu" className="lg:hidden border-t border-brand-100 bg-white">
          <nav
            aria-label="Menú de navegación"
            className="max-w-[1140px] mx-auto px-6 py-4 flex flex-col"
          >
            {nav.links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="py-3.5 text-base font-semibold text-brand-800 border-b border-brand-100 hover:text-accent-600 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-600 rounded"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <a
              href={ctaHref}
              {...(ctaIsExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              className="mt-5 inline-flex justify-center items-center px-5 py-3.5 rounded-lg bg-brand-900 text-white text-base font-semibold hover:bg-brand-800 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-900 focus-visible:ring-offset-2"
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
