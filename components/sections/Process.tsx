import SectionWrapper from '@/components/shared/SectionWrapper'
import { processSteps } from '@/content/landing'

export default function Process() {
  return (
    <SectionWrapper id="proceso" className="py-24 bg-white">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold text-brand-900 mb-4">Cómo trabajamos</h2>
        <p className="text-lg text-brand-600 max-w-2xl mx-auto">
          Un proceso simple, transparente y orientado a resultados.
        </p>
      </div>

      <ol className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {processSteps.map((step) => (
          <li key={step.number} className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <span
                className={`flex items-center justify-center w-10 h-10 rounded-full text-white font-bold text-sm flex-shrink-0 ${
                  step.isFree ? 'bg-brand-600' : 'bg-brand-800'
                }`}
                aria-label={`Paso ${step.number}`}
              >
                {step.number}
              </span>
              {step.isFree && (
                <span className="text-xs font-semibold text-brand-600 bg-brand-100 px-2.5 py-1 rounded-full uppercase tracking-wide">
                  Sin costo
                </span>
              )}
            </div>
            <h3 className="text-lg font-bold text-brand-900">{step.title}</h3>
            <p className="text-brand-600 text-sm leading-relaxed">{step.description}</p>
          </li>
        ))}
      </ol>
    </SectionWrapper>
  )
}
