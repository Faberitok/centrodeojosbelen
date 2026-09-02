import CardCarousel from '@/components/shared/CardCarousel'
import SectionWrapper from '@/components/shared/SectionWrapper'
import { healthPlans, healthPlansSection } from '@/content/health-plans'

export default function HealthPlans() {
  return (
    <SectionWrapper id="obras-sociales" className="landing-panel bg-brand-50 py-14 md:py-20">
      <CardCarousel
        ariaLabel="Obras sociales y coberturas"
        prevLabel="Ver cobertura anterior"
        nextLabel="Ver cobertura siguiente"
        infinite
        autoplay
        itemClassName="w-[72%] max-w-[16rem] shrink-0"
        listClassName="mt-10"
        header={
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
        }
      >
        {healthPlans.map((plan) => (
          <a
            key={plan.name}
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
        ))}
      </CardCarousel>

      <p className="mt-10 text-center text-[15px] leading-relaxed text-brand-700">
        {healthPlansSection.disclaimer}
      </p>
    </SectionWrapper>
  )
}
