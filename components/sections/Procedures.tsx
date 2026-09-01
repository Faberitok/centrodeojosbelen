import Button from '@/components/shared/Button'
import CardCarousel from '@/components/shared/CardCarousel'
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
      <section className="bg-brand-50">
        <div className="mx-auto grid max-w-[1140px] gap-8 px-6 py-10 md:py-14 lg:min-h-[28rem] lg:grid-cols-[1fr_0.9fr] lg:items-center lg:gap-12">
          <div className="max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-accent-700">
              Cirugías y procedimientos
            </p>
            <h1 className="mt-4 text-4xl font-extrabold leading-tight tracking-tight text-brand-800 md:text-6xl">
              Cirugías
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-brand-700 md:text-xl">
              Cada indicación comienza con una evaluación completa. Planificamos los
              estudios previos, el procedimiento y los controles posteriores con el
              mismo equipo médico.
            </p>
            <Button href={ctaHref} external className="mt-9">
              Consultar por WhatsApp
            </Button>
          </div>
          <div className="relative min-h-80 overflow-hidden rounded-[1.75rem] border border-brand-200 shadow-[0_24px_60px_-45px_rgba(16,16,48,0.45)] md:min-h-[26rem]">
            <Image
              src="/media/yag-laser-appasamy.webp"
              alt="Equipamiento quirúrgico de Centro de Ojos Belén"
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
            ariaLabel="Cirugías y procedimientos"
            prevLabel="Ver procedimiento anterior"
            nextLabel="Ver procedimiento siguiente"
            infinite
            controlsClassName="lg:hidden"
            itemClassName="w-[min(88vw,40rem)] shrink-0 lg:w-full lg:max-w-none"
            desktopGridClassName="lg:flex-col lg:gap-16 lg:overflow-visible"
          >
            {procedures.map((procedure, index) => {
              const image = images[procedure.id]
              return (
                <article
                  key={procedure.id}
                  className="grid h-full overflow-hidden rounded-[2rem] border border-brand-200 bg-brand-50 lg:grid-cols-2"
                >
                  <div
                    className={`relative min-h-72 lg:min-h-[34rem] ${
                      index % 2 === 1 ? 'lg:order-2' : ''
                    }`}
                  >
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      sizes="(min-width: 1024px) 50vw, 88vw"
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-900/35 to-transparent" />
                  </div>

                  <div className="flex flex-col justify-center p-6 md:p-10 lg:p-12">
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
          </CardCarousel>
        </div>
      </section>
    </>
  )
}
