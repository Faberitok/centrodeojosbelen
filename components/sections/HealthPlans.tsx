import Button from '@/components/shared/Button'
import SectionWrapper from '@/components/shared/SectionWrapper'
import { healthPlans, healthPlansSection } from '@/content/health-plans'
import { appointmentHref } from '@/lib/whatsapp'

export default function HealthPlans() {
  const ctaHref = appointmentHref(
    'Hola, quisiera consultar si atienden mi obra social.'
  )

  return (
    <SectionWrapper id="obras-sociales" className="bg-white py-20 md:py-28">
      <div className="max-w-2xl">
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-accent-700">
          {healthPlansSection.eyebrow}
        </p>
        <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-brand-800 md:text-4xl">
          {healthPlansSection.title}
        </h2>
        <p className="mt-4 text-lg leading-relaxed text-brand-700">
          {healthPlansSection.subtitle}
        </p>
      </div>

      <ul className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {healthPlans.map((plan) => (
          <li key={plan.name}>
            <a
              href={plan.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${plan.name}: visitar sitio oficial`}
              className="flex h-36 items-center justify-center overflow-hidden rounded-2xl border border-brand-200 bg-white p-3 transition hover:-translate-y-0.5 hover:border-accent-400 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-600"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={plan.logo}
                alt={plan.name}
                className="h-full w-full object-contain"
              />
            </a>
          </li>
        ))}
      </ul>

      <div className="mt-10 flex flex-col gap-5 rounded-2xl border border-accent-200 bg-accent-50 p-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="max-w-2xl text-[15px] leading-relaxed text-accent-900">
          {healthPlansSection.disclaimer}
        </p>
        <Button href={ctaHref} external className="shrink-0">
          {healthPlansSection.ctaLabel}
        </Button>
      </div>
    </SectionWrapper>
  )
}
