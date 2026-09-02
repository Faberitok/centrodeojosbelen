import CardCarousel from '@/components/shared/CardCarousel'
import SectionWrapper from '@/components/shared/SectionWrapper'
import { conditionPages } from '@/content/site'
import Image from 'next/image'
import Link from 'next/link'

export default function ConditionCards() {
  return (
    <SectionWrapper id="especialidades" className="bg-white py-14 md:py-20">
      <CardCarousel
        ariaLabel="Condiciones oftalmológicas"
        prevLabel="Ver condición anterior"
        nextLabel="Ver condición siguiente"
        infinite
        itemClassName="w-[85%] max-w-[32rem] shrink-0 sm:w-[30rem] lg:w-[32rem]"
        listClassName="mt-12"
        header={
          <div className="max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-accent-700">
              Evaluación y seguimiento
            </p>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-brand-800 md:text-5xl">
              Información para cuidar tu visión
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-brand-700">
              Conocé los signos de alerta, cómo realizamos el diagnóstico y las alternativas
              de seguimiento y tratamiento para cada condición.
            </p>
          </div>
        }
      >
        {conditionPages.map((condition) => (
          <Link
            key={condition.slug}
            href={`/${condition.slug}`}
            className="group relative flex min-h-[28rem] overflow-hidden rounded-[2rem] border border-brand-200 shadow-[0_24px_60px_-45px_rgba(16,16,48,0.5)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-500 focus-visible:ring-offset-4"
          >
            <article className="absolute inset-0">
              <Image
                src={condition.image}
                alt={condition.imageAlt}
                fill
                sizes="(min-width: 768px) 32rem, 86vw"
                className="object-cover transition duration-700 group-hover:scale-[1.035]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-950 via-brand-900/60 to-transparent" />
            </article>

            <div className="relative z-10 mt-auto p-7 md:p-9">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-accent-300">
                {condition.lead}
              </p>
              <h3 className="mt-3 text-3xl font-extrabold text-white">{condition.title}</h3>
              <p className="mt-4 line-clamp-3 max-w-xl leading-relaxed text-white/85">
                {condition.summary}
              </p>
            </div>
          </Link>
        ))}
      </CardCarousel>
    </SectionWrapper>
  )
}
