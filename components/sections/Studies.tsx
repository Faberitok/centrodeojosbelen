import SectionWrapper from '@/components/shared/SectionWrapper'
import { studies } from '@/content/site'
import Image from 'next/image'
import Link from 'next/link'

const studyLinks: Record<string, string | undefined> = {
  oct: '/retinopatia-diabetica',
  'topografia-corneal': '/queratocono',
  tonometria: '/glaucoma',
  biometria: '/cirugia-de-cataratas',
}

export default function Studies() {
  return (
    <SectionWrapper id="estudios" className="bg-brand-50 py-20 md:py-28">
      <div className="grid gap-6 lg:grid-cols-[1fr_0.7fr] lg:items-end">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-accent-700">
            Estudios oftalmológicos
          </p>
          <h2 className="mt-3 max-w-3xl text-3xl font-extrabold leading-tight tracking-tight text-brand-900 md:text-4xl">
            Información precisa para cuidar mejor tus ojos
          </h2>
        </div>
        <p className="text-lg leading-relaxed text-brand-700">
          Estudios no invasivos realizados en el centro como parte del diagnóstico y
          seguimiento de cada paciente.
        </p>
      </div>

      <ul className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {studies.map((study, index) => {
          const href = studyLinks[study.id]
          return (
            <li
              key={study.id}
              className={`group overflow-hidden rounded-[1.75rem] border border-brand-200 bg-white ${
                index === 0 ? 'md:col-span-2 lg:col-span-1' : ''
              }`}
            >
              <article className="flex h-full flex-col">
                <div className="relative aspect-[16/10] overflow-hidden bg-brand-100">
                  <Image
                    src={study.image}
                    alt={`Equipamiento para ${study.title}`}
                    fill
                    sizes="(min-width: 1024px) 360px, (min-width: 768px) 50vw, 100vw"
                    className="object-cover transition duration-700 group-hover:scale-[1.04]"
                  />
                  <span className="absolute right-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-bold text-brand-800 backdrop-blur-sm">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="text-xl font-extrabold text-brand-900">{study.title}</h3>
                  <p className="mt-3 flex-1 text-[15px] leading-relaxed text-brand-700">
                    {study.description}
                  </p>
                  {href && (
                    <Link
                      href={href}
                      className="mt-5 inline-flex min-h-11 items-center gap-2 font-bold text-accent-800 underline decoration-accent-300 underline-offset-4 hover:text-accent-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-700"
                    >
                      Conocer más
                      <span aria-hidden="true">→</span>
                    </Link>
                  )}
                </div>
              </article>
            </li>
          )
        })}
      </ul>
    </SectionWrapper>
  )
}
