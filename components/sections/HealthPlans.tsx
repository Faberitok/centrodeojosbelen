'use client'

import SectionWrapper from '@/components/shared/SectionWrapper'
import { healthPlans, healthPlansSection } from '@/content/health-plans'
import { appointmentHref } from '@/lib/whatsapp'
import { useMemo, useState } from 'react'

/** Normaliza para buscar sin depender de tildes ni mayúsculas ("medife" → "Medifé"). */
function normalize(value: string): string {
  return value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim()
}

export default function HealthPlans() {
  const [query, setQuery] = useState('')

  const sorted = useMemo(
    () => [...healthPlans].sort((a, b) => a.name.localeCompare(b.name, 'es')),
    []
  )

  const visible = useMemo(() => {
    const term = normalize(query)
    if (!term) return sorted
    return sorted.filter((plan) => normalize(plan.name).includes(term))
  }, [query, sorted])

  const ctaHref = appointmentHref(
    'Hola, quisiera consultar si atienden mi obra social.'
  )
  const ctaIsExternal = ctaHref.startsWith('http')

  return (
    <SectionWrapper id="obras-sociales" className="py-20 md:py-28 bg-white">
      <div className="max-w-2xl">
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-accent-700">
          {healthPlansSection.eyebrow}
        </p>
        <h2 className="mt-3 text-3xl md:text-4xl font-extrabold tracking-tight text-brand-900">
          {healthPlansSection.title}
        </h2>
        <p className="mt-4 text-lg leading-relaxed text-brand-700">
          {healthPlansSection.subtitle}
        </p>
      </div>

      {healthPlans.length > 0 ? (
        <>
          <div className="mt-8 max-w-md">
            <label
              htmlFor="health-plan-search"
              className="block text-sm font-semibold text-brand-800"
            >
              {healthPlansSection.searchLabel}
            </label>
            <input
              id="health-plan-search"
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder={healthPlansSection.searchPlaceholder}
              autoComplete="off"
              className="mt-2 w-full rounded-xl border border-brand-300 bg-white px-4 py-3.5 text-brand-900 placeholder:text-brand-400 focus:border-accent-700 focus:outline-none focus:ring-2 focus:ring-accent-700/30"
            />
          </div>

          {visible.length > 0 ? (
            <ul
              className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3"
              aria-live="polite"
            >
              {visible.map((plan) => (
                <li
                  key={plan.name}
                  className="flex items-center rounded-2xl border border-brand-200 bg-brand-50 px-5 py-5 font-bold text-brand-900"
                >
                  {plan.name}
                  {plan.note && (
                    <span className="ml-2 text-sm font-normal text-brand-600">{plan.note}</span>
                  )}
                </li>
              ))}
            </ul>
          ) : (
            <p
              className="mt-8 rounded-xl border border-brand-200 bg-brand-50 px-5 py-6 text-brand-700"
              aria-live="polite"
            >
              {healthPlansSection.emptyMessage}
            </p>
          )}
        </>
      ) : (
        <div className="mt-10 grid overflow-hidden rounded-[2rem] border border-brand-200 bg-brand-50 md:grid-cols-[1fr_0.55fr]">
          <div className="p-7 md:p-10">
            <p className="text-xl font-extrabold text-brand-900">
              ¿Querés saber si cubre tu plan?
            </p>
            <p className="mt-3 max-w-xl leading-relaxed text-brand-700">
              Escribinos con el nombre de tu obra social y la prestación que necesitás.
              Nuestro equipo administrativo te orienta antes de solicitar el turno.
            </p>
          </div>
          <div className="flex min-h-44 items-center justify-center bg-brand-900 p-8">
            <svg viewBox="0 0 120 120" fill="none" className="h-28 w-28 text-accent-300" aria-hidden="true">
              <circle cx="60" cy="60" r="45" stroke="currentColor" strokeWidth="2" opacity=".45" />
              <path d="M60 32c12 9 23 10 23 10v19c0 15-9 25-23 31-14-6-23-16-23-31V42s11-1 23-10Z" stroke="currentColor" strokeWidth="4" />
              <path d="m49 61 8 8 16-18" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>
      )}

      <div className="mt-10 flex flex-col gap-5 rounded-2xl border border-accent-200 bg-accent-50 p-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="max-w-2xl text-[15px] leading-relaxed text-accent-900">
          {healthPlansSection.disclaimer}
        </p>
        <a
          href={ctaHref}
          {...(ctaIsExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
          className="inline-flex shrink-0 items-center justify-center rounded-lg bg-brand-900 px-6 py-3.5 font-semibold text-white transition-colors hover:bg-brand-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-900 focus-visible:ring-offset-2"
        >
          {healthPlansSection.ctaLabel}
        </a>
      </div>
    </SectionWrapper>
  )
}
