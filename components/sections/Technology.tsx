import EquipmentCarousel from '@/components/shared/EquipmentCarousel'
import SectionWrapper from '@/components/shared/SectionWrapper'
import { equipment } from '@/content/site'

export default function Technology() {
  return (
    <SectionWrapper id="tecnologia" className="overflow-hidden bg-brand-900 py-20 text-white md:py-28">
      <div className="grid gap-6 lg:grid-cols-[1fr_0.8fr] lg:items-end">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-accent-300">
            Tecnología en Belén
          </p>
          <h2 className="mt-3 max-w-3xl text-3xl font-extrabold leading-tight tracking-tight md:text-5xl">
            Más herramientas para entender mejor tu visión
          </h2>
        </div>
        <p className="max-w-xl text-lg leading-relaxed text-brand-100 lg:justify-self-end">
          Realizamos estudios y evaluaciones con equipamiento propio, reduciendo la
          necesidad de trasladarse a otros centros urbanos para numerosas prestaciones.
        </p>
      </div>

      <EquipmentCarousel items={equipment} />
    </SectionWrapper>
  )
}
