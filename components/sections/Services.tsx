'use client'

import { services } from '@/content/landing'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'

const COLS = 3

function ChevronDown() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
      className="w-5 h-5"
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        d="M5.22 8.22a.75.75 0 011.06 0L10 11.94l3.72-3.72a.75.75 0 111.06 1.06l-4.25 4.25a.75.75 0 01-1.06 0L5.22 9.28a.75.75 0 010-1.06z"
        clipRule="evenodd"
      />
    </svg>
  )
}

function CloseIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
      className="w-5 h-5"
      aria-hidden="true"
    >
      <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
    </svg>
  )
}

function CheckIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
      className="w-4 h-4 shrink-0 text-brand-700"
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
        clipRule="evenodd"
      />
    </svg>
  )
}

export default function Services() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const [displayIndex, setDisplayIndex] = useState<number | null>(null)
  const [contentVisible, setContentVisible] = useState(false)
  const desktopCardRefs = useRef<(HTMLButtonElement | null)[]>([])
  const panelRefs = useRef<(HTMLDivElement | null)[]>([null, null])

  const activeRow = activeIndex !== null ? Math.floor(activeIndex / COLS) : null
  const displayRow = displayIndex !== null ? Math.floor(displayIndex / COLS) : null
  const displayService = displayIndex !== null ? services[displayIndex] : null

  // Entry animation for desktop cards (progressive enhancement)
  useEffect(() => {
    if (!('IntersectionObserver' in window)) return

    const cards = desktopCardRefs.current.filter((c): c is HTMLButtonElement => c !== null)

    cards.forEach((card, i) => {
      card.style.opacity = '0'
      card.style.transform = 'translateY(24px)'
      card.style.transitionDelay = `${i * 80}ms`
    })

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const card = entry.target as HTMLButtonElement
            card.style.opacity = '1'
            card.style.transform = 'translateY(0)'
            card.style.transition = `opacity 0.6s ease-out ${card.style.transitionDelay}, transform 0.6s ease-out ${card.style.transitionDelay}`
            observer.unobserve(card)
          }
        })
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    )

    cards.forEach((card) => observer.observe(card))
    return () => observer.disconnect()
  }, [])

  // Scroll desktop panel into view when it opens
  useEffect(() => {
    if (activeIndex !== null && contentVisible) {
      const row = Math.floor(activeIndex / COLS)
      panelRefs.current[row]?.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
    }
  }, [activeIndex, contentVisible])

  const handleCardClick = (index: number) => {
    if (index === activeIndex) {
      setContentVisible(false)
      setTimeout(() => setActiveIndex(null), 350)
      return
    }

    const clickedRow = Math.floor(index / COLS)
    const currentRow = activeIndex !== null ? Math.floor(activeIndex / COLS) : null

    if (currentRow === clickedRow) {
      // Same desktop row: cross-fade content
      setContentVisible(false)
      setTimeout(() => {
        setDisplayIndex(index)
        setActiveIndex(index)
        requestAnimationFrame(() => setContentVisible(true))
      }, 180)
    } else if (currentRow === null) {
      setDisplayIndex(index)
      setActiveIndex(index)
      setTimeout(() => setContentVisible(true), 50)
    } else {
      // Different row: close current, open new simultaneously
      setContentVisible(false)
      setActiveIndex(index)
      setTimeout(() => {
        setDisplayIndex(index)
        setTimeout(() => setContentVisible(true), 50)
      }, 200)
    }
  }

  const closePanel = () => {
    setContentVisible(false)
    setTimeout(() => setActiveIndex(null), 350)
  }

  const rows: [number[], number[]] = [
    [0, 1, 2],
    [3, 4, 5],
  ]

  return (
    <section id="servicios" className="py-24 bg-white">
      <div className="max-w-[1140px] mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-brand-900 mb-4">
            Qué construimos
          </h2>
          <p className="text-lg text-brand-600 max-w-2xl mx-auto">
            Soluciones tecnológicas adaptadas a necesidades reales.
          </p>
        </div>

        {/* ── Mobile layout (< lg): each card has its own inline panel ── */}
        <div className="flex flex-col gap-4 lg:hidden">
          {services.map((service, globalIndex) => {
            const isActive = activeIndex === globalIndex
            return (
              <div key={service.id}>
                <button
                  onClick={() => handleCardClick(globalIndex)}
                  aria-expanded={isActive}
                  aria-controls={`mobile-panel-${service.id}`}
                  className={[
                    'group text-left w-full bg-white border rounded-xl overflow-hidden',
                    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-700 focus-visible:ring-offset-2',
                    'transition-all duration-200',
                    isActive
                      ? 'border-brand-700 shadow-lg ring-1 ring-brand-700'
                      : 'border-brand-100 hover:shadow-lg hover:border-brand-300',
                  ].join(' ')}
                >
                  <div className="relative w-full aspect-[8/5] overflow-hidden">
                    <Image
                      src={`/images/${service.id}.webp`}
                      alt={`Servicio de ${service.title}`}
                      fill
                      className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                      sizes="100vw"
                    />
                    <div
                      className="absolute inset-0 bg-gradient-to-br from-brand-900 via-brand-800 to-brand-700 opacity-50"
                      aria-hidden="true"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="text-lg font-bold text-brand-900">{service.title}</h3>
                      <span
                        className={[
                          'mt-0.5 shrink-0 cursor-pointer transition-transform duration-300',
                          isActive ? 'rotate-180 text-brand-700' : 'text-brand-500',
                        ].join(' ')}
                      >
                        <ChevronDown />
                      </span>
                    </div>
                    <p className="text-brand-600 text-sm leading-relaxed mt-2">
                      {service.description}
                    </p>
                  </div>
                </button>

                {/* Per-card expanding panel */}
                <div
                  id={`mobile-panel-${service.id}`}
                  role="region"
                  aria-label={`Detalle: ${service.title}`}
                  aria-hidden={!isActive}
                  style={{
                    display: 'grid',
                    gridTemplateRows: isActive ? '1fr' : '0fr',
                    transition: 'grid-template-rows 350ms cubic-bezier(0.4, 0, 0.2, 1)',
                  }}
                >
                  <div className="overflow-hidden">
                    <div className="pt-3">
                      <div
                        className={[
                          'bg-brand-50 border border-brand-100 rounded-xl p-6',
                          'transition-opacity duration-200',
                          isActive && contentVisible ? 'opacity-100' : 'opacity-0',
                        ].join(' ')}
                      >
                        {isActive && (
                          <ServicePanel service={service} onClose={closePanel} />
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* ── Desktop layout (≥ lg): 3-column grid with row-based panels ── */}
        <div className="hidden lg:flex lg:flex-col">
          {rows.map((indices, rowIndex) => {
            const isRowOpen = activeRow === rowIndex
            const showContent = displayRow === rowIndex

            return (
              <div key={rowIndex} className={rowIndex > 0 ? 'mt-6' : ''}>
                {/* Cards grid */}
                <div className="grid grid-cols-3 gap-6">
                  {indices.map((globalIndex) => {
                    const service = services[globalIndex]
                    const isActive = activeIndex === globalIndex

                    return (
                      <button
                        key={service.id}
                        ref={(el) => {
                          desktopCardRefs.current[globalIndex] = el
                        }}
                        onClick={() => handleCardClick(globalIndex)}
                        aria-expanded={isActive}
                        aria-controls={`panel-row-${rowIndex}`}
                        className={[
                          'group text-left w-full bg-white border rounded-xl overflow-hidden',
                          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-700 focus-visible:ring-offset-2',
                          'transition-all duration-200',
                          isActive
                            ? 'border-brand-700 shadow-lg ring-1 ring-brand-700'
                            : 'border-brand-100 hover:shadow-lg hover:border-brand-300',
                        ].join(' ')}
                      >
                        <div className="relative w-full aspect-[8/5] overflow-hidden">
                          <Image
                            src={`/images/${service.id}.webp`}
                            alt={`Servicio de ${service.title}`}
                            fill
                            className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                            sizes="(max-width: 1200px) 50vw, 33vw"
                          />
                          <div
                            className="absolute inset-0 bg-gradient-to-br from-brand-900 via-brand-800 to-brand-700 opacity-50"
                            aria-hidden="true"
                          />
                        </div>
                        <div className="p-6">
                          <div className="flex items-start justify-between gap-2">
                            <h3 className="text-lg font-bold text-brand-900">{service.title}</h3>
                            <span
                              className={[
                                'mt-0.5 shrink-0 cursor-pointer transition-transform duration-300',
                                isActive ? 'rotate-180 text-brand-700' : 'text-brand-500',
                              ].join(' ')}
                            >
                              <ChevronDown />
                            </span>
                          </div>
                          <p className="text-brand-600 text-sm leading-relaxed mt-2">
                            {service.description}
                          </p>
                        </div>
                      </button>
                    )
                  })}
                </div>

                {/* Expanding detail panel */}
                <div
                  id={`panel-row-${rowIndex}`}
                  ref={(el) => {
                    panelRefs.current[rowIndex] = el
                  }}
                  role="region"
                  aria-label={
                    showContent && displayService
                      ? `Detalle: ${displayService.title}`
                      : 'Panel de detalle'
                  }
                  aria-hidden={!isRowOpen}
                  style={{
                    display: 'grid',
                    gridTemplateRows: isRowOpen ? '1fr' : '0fr',
                    transition: 'grid-template-rows 350ms cubic-bezier(0.4, 0, 0.2, 1)',
                  }}
                >
                  <div className="overflow-hidden">
                    <div className="pt-4">
                      <div
                        className={[
                          'bg-brand-50 border border-brand-100 rounded-xl p-8',
                          'transition-opacity duration-200',
                          contentVisible && showContent ? 'opacity-100' : 'opacity-0',
                        ].join(' ')}
                      >
                        {showContent && displayService && (
                          <ServicePanel
                            service={displayService}
                            onClose={closePanel}
                          />
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

function ServicePanel({
  service,
  onClose,
}: {
  service: (typeof services)[number]
  onClose: () => void
}) {
  return (
    <div className="flex flex-col md:flex-row gap-8">
      <div className="flex-1 min-w-0">
        <p className="text-xs font-semibold uppercase tracking-widest text-brand-500 mb-2">
          Servicio
        </p>
        <h3 className="text-2xl font-bold text-brand-900 mb-3">{service.title}</h3>
        <p className="text-brand-700 leading-relaxed">{service.description}</p>
        <ul className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2">
          {service.features.map((f) => (
            <li key={f} className="flex items-center gap-2 text-sm text-brand-700">
              <CheckIcon />
              {f}
            </li>
          ))}
        </ul>
      </div>

      <div className="flex flex-row md:flex-col items-center md:items-end justify-between md:justify-between gap-4 md:min-w-[180px]">
        <button
          onClick={onClose}
          aria-label="Cerrar panel de detalle"
          className="p-1.5 rounded-md text-brand-500 hover:text-brand-900 hover:bg-brand-100 transition-colors"
        >
          <CloseIcon />
        </button>
        <a
          href="#contacto"
          onClick={onClose}
          className="inline-flex items-center justify-center px-6 py-3 bg-brand-900 text-white text-sm font-semibold rounded-lg hover:bg-brand-700 transition-colors whitespace-nowrap"
        >
          Quiero saber más
        </a>
      </div>
    </div>
  )
}
