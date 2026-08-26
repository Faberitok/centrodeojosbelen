'use client'

import SectionWrapper from '@/components/shared/SectionWrapper'
import { solutionChips } from '@/content/landing'

export default function Solutions() {
  function handleChipClick(prefillMessage: string) {

    window.dispatchEvent(
      new CustomEvent('contact-prefill-message', {
        detail: prefillMessage,
      })
    )

    const contactSection = document.getElementById('contacto')
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth', block: 'start' })
      window.history.replaceState(null, '', '#contacto')
    }
  }

  return (
    <SectionWrapper id="productos" className="py-24 bg-brand-50">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-brand-900 mb-4">
          ¿Qué necesitás?
        </h2>
        <p className="text-lg text-brand-600">
          Desde procesos internos hasta herramientas impulsadas por IA — lo hacemos realidad.
        </p>
      </div>

      <ul
        className="flex flex-wrap gap-3 justify-center"
        aria-label="Tipos de soluciones disponibles"
      >
        {solutionChips.map((chip) => (
          <li key={chip.label} className="relative group">
            <button
              type="button"
              onClick={() => handleChipClick(chip.prefillMessage)}
              className="inline-flex items-center bg-brand-100 text-brand-800 px-4 py-2 rounded-full text-sm font-medium border border-brand-200 hover:bg-brand-200 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2"
              aria-describedby={`chip-desc-${chip.label.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}
            >
              {chip.label}
            </button>
            <div
              id={`chip-desc-${chip.label.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}
              role="tooltip"
              className="pointer-events-none absolute left-1/2 top-full z-20 mt-2 w-64 -translate-x-1/2 rounded-lg bg-brand-900 px-3 py-2 text-xs leading-relaxed text-brand-100 shadow-lg opacity-0 translate-y-1 scale-[0.98] transition-all duration-200 group-hover:opacity-100 group-hover:translate-y-0 group-hover:scale-100 group-focus-within:opacity-100 group-focus-within:translate-y-0 group-focus-within:scale-100 hidden sm:block"
            >
              {chip.description}
            </div>
          </li>
        ))}
      </ul>
    </SectionWrapper>
  )
}
