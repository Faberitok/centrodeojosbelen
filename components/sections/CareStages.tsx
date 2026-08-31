import SectionWrapper from '@/components/shared/SectionWrapper'
import { careStages } from '@/content/site'

export default function CareStages() {
  return (
    <SectionWrapper className="relative overflow-hidden bg-white py-16 md:py-20">
      <div
        className="pointer-events-none absolute -right-20 top-8 h-64 w-64 rounded-full border-[44px] border-accent-50"
        aria-hidden="true"
      />

      <div className="relative grid gap-10 lg:grid-cols-[0.75fr_1.25fr] lg:items-end">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-accent-700">
            Atención integral
          </p>
          <h2 className="mt-3 text-3xl font-extrabold leading-tight tracking-tight text-brand-900 md:text-4xl">
            Una mirada para cada etapa
          </h2>
        </div>

        <ol className="grid gap-px overflow-hidden rounded-3xl border border-brand-200 bg-brand-200 md:grid-cols-3">
          {careStages.map((stage, index) => (
            <li key={stage.title} className="group bg-brand-50 p-6 md:p-7">
              <div className="flex items-center justify-between gap-4">
                <span className="text-xs font-bold uppercase tracking-[0.16em] text-accent-700">
                  {stage.label}
                </span>
                <span className="font-mono text-sm text-brand-400" aria-hidden="true">
                  0{index + 1}
                </span>
              </div>
              <h3 className="mt-8 text-xl font-bold text-brand-900">{stage.title}</h3>
              <p className="mt-3 text-[15px] leading-relaxed text-brand-700">
                {stage.description}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </SectionWrapper>
  )
}
