import ProceduresCatalog from '@/components/sections/ProceduresCatalog'
import Button from '@/components/shared/Button'
import { appointmentHref } from '@/lib/whatsapp'
import Image from 'next/image'

export default function Procedures() {
  const ctaHref = appointmentHref(
    'Hola, quisiera consultar por cirugías y procedimientos oftalmológicos.'
  )

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

      <ProceduresCatalog />
    </>
  )
}
