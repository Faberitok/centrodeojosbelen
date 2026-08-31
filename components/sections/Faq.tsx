import SectionWrapper from '@/components/shared/SectionWrapper'
import { faq, faqSection } from '@/content/site'
import { appointmentHref } from '@/lib/whatsapp'

/**
 * Preguntas frecuentes.
 *
 * Cada pregunta es un <details> nativo: se abre sin JavaScript, es navegable
 * por teclado y el texto de la respuesta está en el HTML aunque esté cerrada,
 * así que el buscador la indexa igual.
 */
export default function Faq() {
  const ctaHref = appointmentHref('Hola, tengo una consulta sobre la atención.')
  const ctaIsExternal = ctaHref.startsWith('http')

  return (
    <SectionWrapper id="preguntas" className="py-20 md:py-28 bg-white">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-accent-700">
            {faqSection.eyebrow}
          </p>
          <h2 className="mt-3 text-3xl md:text-4xl font-extrabold tracking-tight text-brand-900">
            {faqSection.title}
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-brand-700">
            {faqSection.subtitle}
          </p>

          <a
            href={ctaHref}
            {...(ctaIsExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
            className="mt-7 inline-flex items-center justify-center rounded-lg border border-brand-300 px-6 py-3.5 font-semibold text-brand-900 transition-colors hover:bg-brand-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-600 focus-visible:ring-offset-2"
          >
            Hacer otra consulta
          </a>
        </div>

        <ul className="divide-y divide-brand-200 border-y border-brand-200">
          {faq.map((item) => (
            <li key={item.question}>
              <details className="group py-1">
                <summary className="flex min-h-11 cursor-pointer list-none items-start justify-between gap-4 rounded py-4 text-left text-lg font-bold text-brand-900 hover:text-accent-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-600 focus-visible:ring-offset-4 [&::-webkit-details-marker]:hidden">
                  {item.question}
                  <span
                    className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-brand-300 text-accent-700 transition-transform group-open:rotate-45"
                    aria-hidden="true"
                  >
                    <svg
                      viewBox="0 0 20 20"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      className="h-3.5 w-3.5"
                    >
                      <path d="M10 4v12M4 10h12" />
                    </svg>
                  </span>
                </summary>
                <p className="mt-3 max-w-2xl leading-relaxed text-brand-700">
                  {item.answer}
                </p>
              </details>
            </li>
          ))}
        </ul>
      </div>
    </SectionWrapper>
  )
}
