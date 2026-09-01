import SectionWrapper from '@/components/shared/SectionWrapper'
import { faq, faqSection } from '@/content/site'

/**
 * Preguntas frecuentes.
 *
 * Cada pregunta es un <details> nativo: se abre sin JavaScript, es navegable
 * por teclado y el texto de la respuesta está en el HTML aunque esté cerrada,
 * así que el buscador la indexa igual.
 */
export default function Faq() {
  return (
    <SectionWrapper id="preguntas" className="landing-panel dark-brand-gradient py-14 text-white md:py-20">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-accent-300">
            {faqSection.eyebrow}
          </p>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-white md:text-4xl">
            {faqSection.title}
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-white/75">
            {faqSection.subtitle}
          </p>
        </div>

        <ul className="overflow-hidden rounded-2xl border border-white/15 bg-white/[0.07] px-5 md:px-7">
          {faq.map((item) => (
            <li key={item.question} className="border-b border-white/15 last:border-b-0">
              <details className="group py-1">
                <summary className="flex min-h-11 cursor-pointer list-none items-start justify-between gap-4 rounded py-4 text-left text-lg font-bold text-white hover:text-accent-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-300 focus-visible:ring-offset-4 focus-visible:ring-offset-brand-900 [&::-webkit-details-marker]:hidden">
                  {item.question}
                  <span
                    className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-white/30 text-accent-300 transition-transform group-open:rotate-45"
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
                <p className="mt-3 max-w-2xl pb-4 leading-relaxed text-white/75">
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
