import SectionWrapper from '@/components/shared/SectionWrapper'
import { services } from '@/content/site'
import Image from 'next/image'

export default function Services() {
  return (
    <SectionWrapper id="atencion" className="bg-white py-20 md:py-28">
      <div className="max-w-2xl">
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-accent-700">
          Atención oftalmológica
        </p>
        <h2 className="mt-3 text-3xl md:text-4xl font-extrabold tracking-tight text-brand-900">
          Cuidamos la visión de toda la familia
        </h2>
        <p className="mt-4 text-lg text-brand-700 leading-relaxed">
          Controles y seguimiento adaptados a las necesidades de cada etapa de la vida.
        </p>
      </div>

      <ul className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((service) => (
          <li key={service.id}>
            <article className="flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-brand-200 bg-white">
              {service.image && (
                <div className="relative aspect-[16/9] overflow-hidden rounded-t-2xl">
                  <Image
                    src={service.image}
                    alt={`Atención de ${service.title.toLowerCase()} en Centro de Ojos Belén`}
                    fill
                    sizes="(min-width: 1024px) 360px, (min-width: 640px) 50vw, 100vw"
                    className="object-cover"
                  />
                </div>
              )}

              <div className="flex flex-1 flex-col p-6">
                <h3 className="text-xl font-bold text-brand-900">
                  {service.title}
                </h3>
                <p className="mb-5 mt-2 leading-relaxed text-brand-700">
                  {service.description}
                </p>

                <ul className="mt-auto space-y-2.5 border-t border-brand-100 pt-5">
                  {service.details.map((detail) => (
                    <li
                      key={detail}
                      className="flex items-start gap-2.5 text-[15px] leading-relaxed text-brand-700"
                    >
                      <span
                        className="mt-[0.55rem] h-1.5 w-1.5 shrink-0 rounded-full bg-accent-500"
                        aria-hidden="true"
                      />
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          </li>
        ))}
      </ul>
    </SectionWrapper>
  )
}
