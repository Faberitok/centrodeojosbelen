import SectionWrapper from '@/components/shared/SectionWrapper'
import { about } from '@/content/site'
import Image from 'next/image'

export default function About() {
  return (
    <SectionWrapper id="nosotros" className="bg-white py-20 md:py-28">
      <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-16">
        <div className="relative min-h-[28rem] overflow-hidden rounded-[2rem] bg-brand-100 md:min-h-[36rem]">
          <Image
            src={about.image}
            alt={about.imageAlt}
            fill
            sizes="(min-width: 1024px) 55vw, 100vw"
            className="object-cover"
          />
          <div
            className="absolute inset-0 bg-gradient-to-t from-brand-900/35 via-transparent to-transparent"
            aria-hidden="true"
          />
          <div className="absolute bottom-6 left-6 rounded-2xl border border-white/30 bg-white/90 px-5 py-4 text-brand-900 shadow-xl backdrop-blur-md">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-accent-800">
              Belén · Catamarca
            </p>
            <p className="mt-1 font-extrabold">Consulta · Estudios · Seguimiento</p>
          </div>
        </div>

        <div>
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-accent-700">
            {about.eyebrow}
          </p>
          <h2 className="mt-3 text-3xl font-extrabold leading-tight tracking-tight text-brand-900 md:text-4xl">
            {about.title}
          </h2>
          {about.paragraphs.map((paragraph) => (
            <p key={paragraph} className="mt-5 text-lg leading-relaxed text-brand-700">
              {paragraph}
            </p>
          ))}

          <ul className="mt-8 space-y-5 border-t border-brand-200 pt-7">
            {about.highlights.map((highlight) => (
              <li key={highlight.title} className="grid gap-2 sm:grid-cols-[8rem_1fr]">
                <h3 className="font-extrabold text-brand-900">{highlight.title}</h3>
                <p className="text-[15px] leading-relaxed text-brand-700">
                  {highlight.description}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </SectionWrapper>
  )
}
