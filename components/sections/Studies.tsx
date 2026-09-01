import StudiesCatalog from '@/components/sections/StudiesCatalog'
import Button from '@/components/shared/Button'
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

      <StudiesCatalog />
    </>
  )
}
