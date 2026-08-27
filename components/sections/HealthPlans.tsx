'use client'

import SectionWrapper from '@/components/shared/SectionWrapper'
import { healthPlans, healthPlansSection } from '@/content/site'
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
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-accent-600">
          {healthPlansSection.eyebrow}
        </p>
        <h2 className="mt-3 text-3xl md:text-4xl font-extrabold tracking-tight text-brand-900">
          {healthPlansSection.title}
        </h2>
        <p className="mt-4 text-lg leading-relaxed text-brand-700">
          {healthPlansSection.subtitle}
        </p>
      </div>

      <div className="mt-8 max-w-md">
        <label
          htmlFor="health-plan-search"
          className="block text-sm font-semibold text-brand-800"
        >
          {healthPlansSection.searchLabel}
        </label>
        <div className="relative mt-2">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-brand-500"
            aria-hidden="true"
          >
            <circle cx="11" cy="11" r="7" />
            <path d="m20 20-3.6-3.6" />
          </svg>
          <input
            id="health-plan-search"
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={healthPlansSection.searchPlaceholder}
            autoComplete="off"
            className="w-full rounded-lg border border-brand-300 bg-white py-3.5 pl-12 pr-4 text-brand-900 placeholder:text-brand-400 focus:border-accent-600 focus:outline-none focus:ring-2 focus:ring-accent-600/30"
          />
        </div>
      </div>

      {visible.length > 0 ? (
        <ul
          className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3"
          aria-live="polite"
        >
          {visible.map((plan) => (
            <li
              key={plan.name}
              className="flex items-start gap-3 rounded-xl border border-brand-200 bg-brand-50 px-4 py-3.5"
            >
              <svg
                viewBox="0 0 20 20"
                fill="currentColor"
                className="mt-0.5 h-5 w-5 shrink-0 text-accent-600"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm3.7-9.3a1 1 0 0 0-1.4-1.4L9 10.58l-1.3-1.3a1 1 0 0 0-1.4 1.42l2 2a1 1 0 0 0 1.4 0l4-4Z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="min-w-0">
                <span className="block font-semibold text-brand-900">{plan.name}</span>
                {plan.note && (
                  <span className="mt-0.5 block text-sm text-brand-600">{plan.note}</span>
                )}
              </span>
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
