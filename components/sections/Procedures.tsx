import Button from '@/components/shared/Button'
import { procedures } from '@/content/site'
import { appointmentHref } from '@/lib/whatsapp'
import Image from 'next/image'

export default function Procedures() {
  const ctaHref = appointmentHref(
    'Hola, quisiera consultar por cirugías y procedimientos oftalmológicos.'
  )

  const images: Record<string, { src: string; alt: string }> = {
    cataratas: {
      src: '/media/evaluacion-cataratas.webp',
      alt: 'Evaluación oftalmológica para cirugía de cataratas',
    },
    'yag-laser': {
      src: '/media/yag-laser-appasamy.webp',
      alt: 'Equipo YAG láser de Centro de Ojos Belén',
    },
    inyecciones: {
      src: '/media/retina-control.webp',
      alt: 'Evaluación de retina previa al tratamiento',
    },
    pterigion: {
      src: '/media/oftalmoscopio-keeler.webp',
      alt: 'Equipamiento para evaluación oftalmológica',
    },
  }

  return (
    <>
      <section className="page-hero-panel dark-brand-gradient relative overflow-hidden text-white">
        <div className="mx-auto grid max-w-[1240px] gap-8 px-6 py-6 md:px-10 md:py-8 lg:min-h-[32rem] lg:grid-cols-[1fr_0.9fr] lg:gap-12 lg:px-12">
          <div className="relative z-10 flex items-center py-8 md:py-10">
            <div className="max-w-2xl">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-accent-300">
                Cirugías y procedimientos
              </p>
              <h1 className="mt-4 text-4xl font-extrabold leading-tight tracking-tight md:text-6xl">
                Cirugías
              </h1>
              <p className="mt-6 text-lg leading-relaxed text-white/85 md:text-xl">
                Cada indicación comienza con una evaluación completa. Planificamos los
                estudios previos, el procedimiento y los controles posteriores con el
                mismo equipo médico.
              </p>
              <Button href={ctaHref} external variant="accent" className="mt-9">
                Consultar por WhatsApp
              </Button>
            </div>
          </div>
          <div className="relative min-h-80 overflow-hidden rounded-[1.75rem] border border-white/15 shadow-[0_28px_70px_-42px_rgba(0,0,0,0.75)] md:min-h-[26rem] lg:my-3 lg:min-h-0">
            <Image
              src="/media/yag-laser-appasamy.webp"
              alt="Equipamiento quirúrgico de Centro de Ojos Belén"
              fill
              priority
              sizes="(min-width: 1024px) 45vw, 100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-brand-900/70 via-brand-900/25 to-transparent" />
          </div>
        </div>
      </section>

      <section className="bg-white py-12 md:py-16">
        <div className="mx-auto max-w-[1140px] space-y-16 px-6 md:space-y-24">
          {procedures.map((procedure, index) => {
            const image = images[procedure.id]
            return (
              <article
                key={procedure.id}
                className="grid overflow-hidden rounded-[2rem] border border-brand-200 bg-brand-50 lg:grid-cols-2"
              >
                <div
                  className={`relative min-h-80 lg:min-h-[34rem] ${
                    index % 2 === 1 ? 'lg:order-2' : ''
                  }`}
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-900/35 to-transparent" />
                </div>

                <div className="flex flex-col justify-center p-7 md:p-10 lg:p-12">
                  <p className="text-xs font-bold uppercase tracking-[0.16em] text-accent-700">
                    Evaluación · Procedimiento · Seguimiento
                  </p>
                  <h2 className="mt-3 text-3xl font-extrabold leading-tight text-brand-800 md:text-4xl">
                    {procedure.title}
                  </h2>
                  <p className="mt-5 leading-relaxed text-brand-700">
                    {procedure.description}
                  </p>

                  <div className="mt-8 space-y-6 border-t border-brand-200 pt-7">
                    <div>
                      <h3 className="font-extrabold text-brand-800">Antes del procedimiento</h3>
                      <p className="mt-2 text-[15px] leading-relaxed text-brand-700">
                        {procedure.preparation}
                      </p>
                    </div>
                    <div>
                      <h3 className="font-extrabold text-brand-800">Tratamiento y controles</h3>
                      <p className="mt-2 text-[15px] leading-relaxed text-brand-700">
                        {procedure.treatment}
                      </p>
                    </div>
                  </div>
                </div>
              </article>
            )
          })}
        </div>
      </section>
    </>
  )
}
