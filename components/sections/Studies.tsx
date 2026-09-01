import Button from '@/components/shared/Button'
import CardCarousel from '@/components/shared/CardCarousel'
import { studies } from '@/content/site'
import { appointmentHref } from '@/lib/whatsapp'
import Image from 'next/image'

export default function Studies() {
  const ctaHref = appointmentHref(
    'Hola, quisiera consultar por un estudio oftalmológico.'
  )

  return (
    <>
      <section className="bg-brand-50">
        <div className="mx-auto grid max-w-[1140px] gap-8 px-6 py-10 md:py-14 lg:min-h-[28rem] lg:grid-cols-[1fr_0.9fr] lg:items-center lg:gap-12">
          <div className="max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-accent-700">
              Diagnóstico y seguimiento
            </p>
            <h1 className="mt-4 text-4xl font-extrabold leading-tight tracking-tight text-brand-800 md:text-6xl">
              Estudios
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-brand-700 md:text-xl">
              Tecnología diagnóstica para observar distintas estructuras del ojo,
              acompañar el diagnóstico y comparar la evolución en los controles.
            </p>
            <Button href={ctaHref} external className="mt-9">
              Consultar por un estudio
            </Button>
          </div>
          <div className="relative min-h-80 overflow-hidden rounded-[1.75rem] border border-brand-200 shadow-[0_24px_60px_-45px_rgba(16,16,48,0.45)] md:min-h-[26rem]">
            <Image
              src="/media/atencion-adultos.webp"
              alt="Evaluación oftalmológica con lámpara de hendidura"
              fill
              priority
              sizes="(min-width: 1024px) 45vw, 100vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      <section className="bg-white py-12 md:py-16">
        <div className="mx-auto max-w-[1140px] px-6">
          <CardCarousel
            ariaLabel="Estudios oftalmológicos"
            prevLabel="Ver estudio anterior"
            nextLabel="Ver estudio siguiente"
            infinite
            controlsClassName="lg:hidden"
            itemClassName="w-[min(88vw,40rem)] shrink-0 lg:w-full lg:max-w-none"
            desktopGridClassName="lg:flex-col lg:gap-16 lg:overflow-visible"
          >
            {studies.map((study, index) => (
              <article
                key={study.id}
                className="grid h-full overflow-hidden rounded-[2rem] border border-brand-200 bg-brand-50 lg:grid-cols-2"
              >
                <div
                  className={`relative min-h-72 lg:min-h-[36rem] ${
                    index % 2 === 1 ? 'lg:order-2' : ''
                  }`}
                >
                  <Image
                    src={study.image}
                    alt={`Realización de ${study.title}`}
                    fill
                    sizes="(min-width: 1024px) 50vw, 88vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-900/30 to-transparent" />
                  <p className="absolute bottom-5 left-5 rounded-full bg-white/90 px-4 py-2 text-xs font-bold text-brand-800 shadow-sm backdrop-blur">
                    {study.equipment}
                  </p>
                </div>

                <div className="flex flex-col justify-center p-6 md:p-10 lg:p-12">
                  <p className="text-xs font-bold uppercase tracking-[0.16em] text-accent-700">
                    Estudio diagnóstico
                  </p>
                  <h2 className="mt-3 text-3xl font-extrabold leading-tight text-brand-800 md:text-4xl">
                    {study.title}
                  </h2>
                  <p className="mt-5 text-lg leading-relaxed text-brand-700">
                    {study.description}
                  </p>

                  <div className="mt-8 space-y-6 border-t border-brand-200 pt-7">
                    <div>
                      <h3 className="font-extrabold text-brand-800">Para qué se utiliza</h3>
                      <p className="mt-2 text-[15px] leading-relaxed text-brand-700">
                        {study.purpose}
                      </p>
                    </div>
                    <div>
                      <h3 className="font-extrabold text-brand-800">Cómo es el estudio</h3>
                      <p className="mt-2 text-[15px] leading-relaxed text-brand-700">
                        {study.experience}
                      </p>
                    </div>
                    <div>
                      <h3 className="font-extrabold text-brand-800">Antes de venir</h3>
                      <p className="mt-2 text-[15px] leading-relaxed text-brand-700">
                        {study.preparation}
                      </p>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </CardCarousel>
        </div>
      </section>
    </>
  )
}
