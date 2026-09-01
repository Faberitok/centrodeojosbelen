'use client'

import { brand, siteName } from '@/content/brand'
import { nav } from '@/content/navigation'
import { appointmentHref } from '@/lib/whatsapp'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [servicesOpen, setServicesOpen] = useState(false)
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false)
  const servicesRef = useRef<HTMLDivElement>(null)
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
      if (event.key === 'Escape') {
        setOpen(false)
        setServicesOpen(false)
        setMobileServicesOpen(false)
      }
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [])

  useEffect(() => {
    function onPointerDown(event: PointerEvent) {
      if (!servicesRef.current?.contains(event.target as Node)) {
        setServicesOpen(false)
      }
    }
    document.addEventListener('pointerdown', onPointerDown)
    return () => document.removeEventListener('pointerdown', onPointerDown)
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
                <div key={link.href} ref={servicesRef} className="relative flex items-center">
                  <button
                    type="button"
                    aria-expanded={servicesOpen}
                    aria-haspopup="menu"
                    aria-controls="servicios-menu"
                    onClick={() => setServicesOpen((value) => !value)}
                    className="inline-flex cursor-pointer items-center gap-1 rounded px-1 py-1 text-[15px] font-semibold text-brand-800 transition-colors hover:text-accent-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-600"
                  >
                    {link.label}
                    <svg
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className={`h-4 w-4 transition-transform ${servicesOpen ? 'rotate-180' : ''}`}
                      aria-hidden="true"
                    >
                      <path fillRule="evenodd" d="M5.22 7.97a.75.75 0 0 1 1.06 0L10 11.69l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.03a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
                    </svg>
                  </button>
                  <div
                    id="servicios-menu"
                    role="menu"
                    hidden={!servicesOpen}
                    className="absolute left-0 top-full z-50 w-48 rounded-xl border border-brand-100 bg-white p-2 shadow-xl"
                  >
                    {link.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        role="menuitem"
                        onClick={() => setServicesOpen(false)}
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
                  onClick={(event) => {
                    setServicesOpen(false)
                    navigateFromHome(event, link.href)
                  }}
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
                {'children' in link ? (
                  <>
                    <button
                      type="button"
                      aria-expanded={mobileServicesOpen}
                      onClick={() => setMobileServicesOpen((value) => !value)}
                      className="flex w-full cursor-pointer items-center justify-between rounded py-3.5 text-left text-base font-semibold text-brand-800 transition-colors hover:text-accent-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-600"
                    >
                      {link.label}
                      <svg
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className={`h-4 w-4 transition-transform ${mobileServicesOpen ? 'rotate-180' : ''}`}
                        aria-hidden="true"
                      >
                        <path fillRule="evenodd" d="M5.22 7.97a.75.75 0 0 1 1.06 0L10 11.69l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.03a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
                      </svg>
                    </button>
                    {mobileServicesOpen && (
                      <div className="mb-3 flex gap-2 pl-3">
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
                  </>
                ) : (
                  <Link
                    href={link.href}
                    className="block rounded py-3.5 text-base font-semibold text-brand-800 transition-colors hover:text-accent-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-600"
                    onClick={(event) => navigateFromHome(event, link.href)}
                  >
                    {link.label}
                  </Link>
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
