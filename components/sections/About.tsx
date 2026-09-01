import PhotoCarousel from '@/components/shared/PhotoCarousel'
import SectionWrapper from '@/components/shared/SectionWrapper'
import { about } from '@/content/site'

export default function About() {
  return (
    <SectionWrapper className="bg-white py-16 md:py-24">
      <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-16">
        <PhotoCarousel
          images={about.gallery}
          overlay={
            <div className="absolute bottom-6 left-6 rounded-2xl border border-white/30 bg-white/90 px-5 py-4 text-brand-800 shadow-xl backdrop-blur-md">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-accent-800">
                Belén · Catamarca
              </p>
              <p className="mt-1 font-extrabold">Consulta · Estudios · Seguimiento</p>
            </div>
          }
        />

        <div>
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-accent-700">
            {about.eyebrow}
          </p>
          <h1 className="mt-3 text-3xl font-extrabold leading-tight tracking-tight text-brand-800 md:text-5xl">
            {about.title}
          </h1>
          {about.paragraphs.map((paragraph) => (
            <p key={paragraph} className="mt-5 text-lg leading-relaxed text-brand-700">
              {paragraph}
            </p>
          ))}

          <ul className="mt-8 space-y-5 border-t border-brand-200 pt-7">
            {about.highlights.map((highlight) => (
              <li key={highlight.title} className="grid gap-2 sm:grid-cols-[8rem_1fr]">
                <h2 className="font-extrabold text-brand-800">{highlight.title}</h2>
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
