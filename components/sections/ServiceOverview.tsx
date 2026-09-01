import Button from '@/components/shared/Button'
import CardCarousel from '@/components/shared/CardCarousel'
import SectionWrapper from '@/components/shared/SectionWrapper'

const items = [
  {
    title: 'Estudios oftalmológicos',
    description:
      'Contamos con tecnología para estudiar la retina, el nervio óptico, la córnea, la presión ocular y el cálculo de lentes intraoculares. Los resultados acompañan el diagnóstico y permiten comparar la evolución en cada control.',
    href: '/estudios',
    label: 'Ver estudios',
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="h-12 w-12" aria-hidden="true">
        <path d="M5 25s7-11 19-11 19 11 19 11-7 11-19 11S5 25 5 25Z" stroke="currentColor" strokeWidth="2.5" />
        <circle cx="24" cy="25" r="6" stroke="currentColor" strokeWidth="2.5" />
        <path d="M34 8v8M30 12h8" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: 'Cirugías y procedimientos',
    description:
      'Realizamos evaluación, planificación y seguimiento de cirugía de cataratas, YAG láser, inyecciones intravítreas y cirugía de pterigión. El mismo equipo acompaña cada etapa, desde la indicación hasta los controles posteriores.',
    href: '/cirugias',
    label: 'Ver cirugías',
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="h-12 w-12" aria-hidden="true">
        <circle cx="22" cy="23" r="13" stroke="currentColor" strokeWidth="2.5" />
        <path d="M15 23h14M22 16v14M34 33l8 8M38 29v8M34 33h8" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      </svg>
    ),
  },
] as const

export default function ServiceOverview() {
  return (
    <SectionWrapper id="servicios" className="landing-panel bg-brand-50 py-14 md:py-20">
      <CardCarousel
        ariaLabel="Nuestros servicios"
        prevLabel="Ver servicio anterior"
        nextLabel="Ver servicio siguiente"
        itemClassName="w-[82vw] max-w-[28rem] shrink-0 md:w-auto md:max-w-none"
        desktopGridClassName="md:grid md:grid-cols-2 md:overflow-visible"
        listClassName="mt-12"
        infinite
        controlsClassName="md:hidden"
        headerLayout="below"
        header={
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-accent-700">
              Atención integral
            </p>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-brand-800 md:text-5xl">
              Nuestros servicios
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-brand-700">
              Consulta, diagnóstico, tecnología y seguimiento en un mismo centro.
            </p>
          </div>
        }
      >
        {items.map((item) => (
          <article
            key={item.title}
            className="flex h-full flex-col rounded-[2rem] border border-brand-200 bg-white p-7 shadow-[0_24px_60px_-48px_rgba(16,16,48,0.5)] transition duration-300 hover:-translate-y-1 hover:border-accent-300 hover:shadow-[0_28px_70px_-44px_rgba(16,16,48,0.42)] md:p-10"
          >
            <span className="text-accent-700">{item.icon}</span>
            <h3 className="mt-6 text-2xl font-extrabold text-brand-800 md:text-3xl">
              {item.title}
            </h3>
            <p className="mt-4 flex-1 leading-relaxed text-brand-700">
              {item.description}
            </p>
            <Button href={item.href} className="mt-8 w-fit">
              {item.label}
            </Button>
          </article>
        ))}
      </CardCarousel>
    </SectionWrapper>
  )
}
