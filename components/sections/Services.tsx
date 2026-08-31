import ServiceIcon from '@/components/shared/ServiceIcon'
import SectionWrapper from '@/components/shared/SectionWrapper'
import { services } from '@/content/site'
import Image from 'next/image'

/**
 * Tarjetas de servicios. El detalle de cada uno se abre con <details>: es
 * nativo, accesible por teclado y funciona sin JavaScript, así que la
 * información sigue estando disponible para el buscador y para el paciente
 * aunque falle el bundle.
 *
 * La grilla se adapta sola a la cantidad de servicios que defina el centro.
 */
export default function Services() {
  return (
    <SectionWrapper id="servicios" className="py-20 md:py-28 bg-white">
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
            <article className="group h-full overflow-hidden rounded-[1.75rem] border border-brand-200 bg-white transition duration-300 hover:-translate-y-1 hover:border-accent-400 focus-within:border-accent-500">
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

              <div className="p-6">
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-accent-50 text-accent-700 transition-colors group-hover:bg-accent-100">
                  <ServiceIcon name={service.icon} />
                </span>

                <h3 className="mt-4 text-xl font-bold text-brand-900">
                  {service.title}
                </h3>
                <p className="mt-2 leading-relaxed text-brand-700">
                  {service.description}
                </p>

                <details className="group/details mt-4 border-t border-brand-100 pt-1">
                  <summary className="flex min-h-11 cursor-pointer list-none items-center gap-1.5 rounded py-3 text-sm font-bold text-accent-700 hover:text-accent-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-600 focus-visible:ring-offset-2 [&::-webkit-details-marker]:hidden">
                    Qué incluye
                    <svg
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className="h-4 w-4 transition-transform group-open/details:rotate-180"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </summary>

                  <ul className="mt-3 space-y-2">
                    {service.details.map((detail) => (
                      <li
                        key={detail}
                        className="flex items-start gap-2 text-[15px] text-brand-700"
                      >
                        <svg
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          className="mt-1 h-3.5 w-3.5 shrink-0 text-accent-600"
                          aria-hidden="true"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.7 4.15a.75.75 0 0 1 .14 1.05l-8 10.5a.75.75 0 0 1-1.12.08l-4.5-4.5a.75.75 0 1 1 1.06-1.06l3.89 3.89 7.48-9.82a.75.75 0 0 1 1.05-.14Z"
                            clipRule="evenodd"
                          />
                        </svg>
                        {detail}
                      </li>
                    ))}
                  </ul>
                </details>
              </div>
            </article>
          </li>
        ))}
      </ul>
    </SectionWrapper>
  )
}
