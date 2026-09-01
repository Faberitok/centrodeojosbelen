import SectionWrapper from '@/components/shared/SectionWrapper'
import { conditionPages } from '@/content/site'
import Image from 'next/image'
import Link from 'next/link'

export default function ConditionCards() {
  return (
    <SectionWrapper id="especialidades" className="overflow-hidden bg-[#202055] py-20 text-white md:py-28">
      <div className="max-w-2xl">
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-accent-300">
          Evaluación y seguimiento
        </p>
        <h2 className="mt-3 text-3xl font-extrabold tracking-tight md:text-5xl">
          Información para cuidar tu visión
        </h2>
        <p className="mt-4 text-lg leading-relaxed text-white/75">
          Conocé los signos de alerta, cómo realizamos el diagnóstico y las alternativas
          de seguimiento y tratamiento para cada condición.
        </p>
      </div>

      <ul className="mt-12 grid gap-5 md:grid-cols-2">
        {conditionPages.map((condition) => (
          <li key={condition.slug}>
            <Link
              href={`/${condition.slug}`}
              className="group relative flex min-h-[28rem] overflow-hidden rounded-[2rem] border border-white/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-300 focus-visible:ring-offset-4 focus-visible:ring-offset-[#202055]"
            >
              <article className="absolute inset-0">
                <Image
                  src={condition.image}
                  alt={condition.imageAlt}
                  fill
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className="object-cover transition duration-700 group-hover:scale-[1.035]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#10102E] via-[#202055]/55 to-transparent" />
              </article>

              <div className="relative z-10 mt-auto p-7 md:p-9">
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-accent-300">
                  {condition.lead}
                </p>
                <h3 className="mt-3 text-3xl font-extrabold text-white">
                  {condition.title}
                </h3>
                <p className="mt-4 line-clamp-3 max-w-xl leading-relaxed text-white/85">
                  {condition.summary}
                </p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </SectionWrapper>
  )
}
