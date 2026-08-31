import SectionWrapper from '@/components/shared/SectionWrapper'
import { procedures } from '@/content/site'
import { appointmentHref } from '@/lib/whatsapp'
import Image from 'next/image'
import Link from 'next/link'

export default function Procedures() {
  const ctaHref = appointmentHref(
    'Hola, quisiera consultar por cirugías y procedimientos oftalmológicos.'
  )

  return (
    <SectionWrapper id="cirugias" className="overflow-hidden bg-white py-20 md:py-28">
      <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-stretch">
        <div className="relative min-h-[30rem] overflow-hidden rounded-[2rem] bg-brand-900">
          <Image
            src="/media/yag-laser-appasamy.webp"
            alt="Equipo YAG láser de Centro de Ojos Belén"
            fill
            sizes="(min-width: 1024px) 45vw, 100vw"
            className="object-cover opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-900 via-brand-900/30 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 p-7 text-white md:p-10">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-accent-300">
              De principio a fin
            </p>
            <h2 className="mt-3 text-3xl font-extrabold leading-tight md:text-4xl">
              Acompañamiento en todo el proceso
            </h2>
            <p className="mt-4 max-w-xl leading-relaxed text-brand-100">
              Diagnóstico, indicación, estudios prequirúrgicos, procedimiento y
              controles posteriores con el mismo equipo.
            </p>
          </div>
        </div>

        <div className="flex flex-col justify-center">
          <ol className="divide-y divide-brand-200 border-y border-brand-200">
            {procedures.map((procedure, index) => (
              <li key={procedure.id} className="grid grid-cols-[2.5rem_1fr] gap-4 py-6">
                <span className="pt-1 font-mono text-sm font-bold text-accent-700">
                  0{index + 1}
                </span>
                <div>
                  <h3 className="text-xl font-extrabold text-brand-900">{procedure.title}</h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-brand-700">
                    {procedure.description}
                  </p>
                  {procedure.href && (
                    <Link
                      href={procedure.href}
                      className="mt-3 inline-flex min-h-11 items-center font-bold text-accent-800 underline decoration-accent-300 underline-offset-4 hover:text-accent-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-700"
                    >
                      Ver evaluación y tratamiento
                    </Link>
                  )}
                </div>
              </li>
            ))}
          </ol>

          <a
            href={ctaHref}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex min-h-12 w-fit items-center justify-center rounded-full bg-brand-900 px-7 py-3 font-bold text-white transition hover:bg-brand-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-900 focus-visible:ring-offset-2"
          >
            Consultar por WhatsApp
          </a>
        </div>
      </div>
    </SectionWrapper>
  )
}
