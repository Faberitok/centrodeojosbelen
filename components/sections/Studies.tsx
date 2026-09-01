import EquipmentCarousel from '@/components/shared/EquipmentCarousel'
import SectionWrapper from '@/components/shared/SectionWrapper'
import { equipment, studies } from '@/content/site'
import Image from 'next/image'

export default function Studies() {
  return (
    <>
      <SectionWrapper className="bg-white py-16 md:py-24">
        <div className="grid gap-6 lg:grid-cols-[1fr_0.7fr] lg:items-end">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-accent-700">
              Estudios oftalmológicos
            </p>
            <h1 className="mt-3 max-w-3xl text-3xl font-extrabold leading-tight tracking-tight text-brand-800 md:text-5xl">
              Estudios
            </h1>
          </div>
          <p className="text-lg leading-relaxed text-brand-700">
            Realizamos estudios complementarios con equipamiento propio. Cada estudio
            forma parte del diagnóstico y del seguimiento, sin necesidad de trasladarse
            a otros centros urbanos para numerosas prestaciones.
          </p>
        </div>

        <ul className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {studies.map((study) => (
            <li key={study.id}>
              <article className="flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-brand-200 bg-brand-50">
                <div className="relative aspect-[16/10] overflow-hidden bg-brand-100">
                  <Image
                    src={study.image}
                    alt={`Equipamiento para ${study.title}`}
                    fill
                    sizes="(min-width: 1024px) 360px, (min-width: 768px) 50vw, 100vw"
                    className="object-cover"
                  />
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <h2 className="text-xl font-extrabold text-brand-800">{study.title}</h2>
                  <p className="mt-3 text-[15px] leading-relaxed text-brand-700">
                    {study.description}
                  </p>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </SectionWrapper>

      <SectionWrapper className="overflow-hidden bg-[#2A4A78] py-20 text-white md:py-28">
        <div className="max-w-3xl">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-accent-200">
            Equipamiento
          </p>
          <h2 className="mt-3 text-3xl font-extrabold leading-tight md:text-4xl">
            Los equipos con los que estudiamos
          </h2>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-white/85">
            OCT, topografía, paquimetría, biometría, tonometría y autorrefractometría
            en un mismo centro.
          </p>
        </div>
        <EquipmentCarousel items={equipment} />
      </SectionWrapper>
    </>
  )
}
