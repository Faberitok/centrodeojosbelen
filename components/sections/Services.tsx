import CardCarousel from '@/components/shared/CardCarousel'
import SectionWrapper from '@/components/shared/SectionWrapper'
import { services } from '@/content/site'
import Image from 'next/image'

export default function Services() {
  return (
    <SectionWrapper id="atencion" className="bg-white py-14 md:py-20">
      <CardCarousel
        ariaLabel="Atención oftalmológica por etapa"
        prevLabel="Ver etapa anterior"
        nextLabel="Ver etapa siguiente"
        controlsClassName="lg:hidden"
        infinite
        itemClassName="w-[85%] max-w-[28rem] shrink-0 lg:w-auto lg:max-w-none"
        desktopGridClassName="lg:grid lg:grid-cols-3 lg:overflow-visible"
        listClassName="mt-12"
        header={
          <div className="max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-accent-700">
              Atención oftalmológica
            </p>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-brand-900 md:text-4xl">
              Cuidamos la visión de toda la familia
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-brand-700">
              Controles y seguimiento adaptados a las necesidades de cada etapa de la vida.
            </p>
          </div>
        }
      >
        {services.map((service) => (
          <article
            key={service.id}
            className="group flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-brand-200 bg-white shadow-[0_18px_45px_-40px_rgba(16,16,48,0.38)] transition duration-300 hover:-translate-y-1 hover:border-accent-300 hover:shadow-[0_24px_55px_-36px_rgba(16,16,48,0.36)]"
          >
            {service.image && (
              <div className="relative aspect-[16/9] overflow-hidden rounded-t-2xl">
                <Image
                  src={service.image}
                  alt={`Atención de ${service.title.toLowerCase()} en Centro de Ojos Belén`}
                  fill
                  sizes="(min-width: 1024px) 360px, (min-width: 640px) 50vw, 82vw"
                  className="object-cover transition duration-700 group-hover:scale-[1.025]"
                />
              </div>
            )}

            <div className="flex flex-1 flex-col p-6">
              <h3 className="text-xl font-bold text-brand-900">{service.title}</h3>
              <p className="mb-5 mt-2 leading-relaxed text-brand-700">{service.description}</p>

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
        ))}
      </CardCarousel>
    </SectionWrapper>
  )
}
