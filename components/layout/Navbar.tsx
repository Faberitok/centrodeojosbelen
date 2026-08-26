'use client'

import { nav } from '@/content/landing'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-sm border-b border-brand-100">
      <div className="max-w-[1140px] mx-auto px-6">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 rounded flex items-center"
            aria-label={nav.brandName}
          >
            {nav.logoSrc ? (
              <Image
                src={nav.logoSrc}
                alt={nav.brandName}
                width={0}
                height={0}
                sizes="120px"
                className="h-8 w-auto object-contain"
                priority
              />
            ) : (
              <span className="font-bold text-xl text-brand-900 tracking-tight">
                {nav.brandName}
              </span>
            )}
          </Link>

          {/* Desktop nav */}
          <nav aria-label="Navegación principal" className="hidden md:flex items-center gap-8">
            {nav.links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-brand-600 hover:text-brand-900 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 rounded px-1 py-0.5"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA */}
          <Link
            href="#contacto"
            className="hidden md:inline-flex items-center px-5 py-2.5 rounded-md bg-brand-700 text-white text-sm font-semibold hover:bg-brand-800 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2"
          >
            {nav.ctaLabel}
          </Link>

          {/* Burger */}
          <button
            type="button"
            aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={open}
            aria-controls="mobile-menu"
            className="md:hidden p-2 text-brand-700 hover:text-brand-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 rounded-md"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? (
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="w-6 h-6"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="w-6 h-6"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div id="mobile-menu" className="md:hidden border-t border-brand-100 bg-white">
          <nav
            aria-label="Menú móvil"
            className="max-w-[1140px] mx-auto px-6 py-4 flex flex-col gap-4"
          >
            {nav.links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-base font-medium text-brand-700 hover:text-brand-900 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 rounded px-1"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="#contacto"
              className="inline-flex justify-center items-center px-5 py-2.5 rounded-md bg-brand-700 text-white text-sm font-semibold hover:bg-brand-800 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2"
              onClick={() => setOpen(false)}
            >
              {nav.ctaLabel}
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}
