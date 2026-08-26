import SectionWrapper from '@/components/shared/SectionWrapper'
import { clientLogos, showClientLogos } from '@/content/landing'
import Image from 'next/image'

export default function ClientLogos() {
  if (!showClientLogos || clientLogos.length === 0) {
    return null
  }

  return (
    <SectionWrapper className="py-16 bg-brand-50">
      <div className="text-center mb-10">
        <h2 className="text-xl font-semibold text-brand-700">
          Empresas que confían en nosotros
        </h2>
      </div>
      <ul
        className="flex flex-wrap gap-8 justify-center items-center"
        aria-label="Logos de clientes"
      >
        {clientLogos.map((logo) => (
          <li key={logo.name}>
            <Image
              src={logo.src}
              alt={logo.alt}
              width={140}
              height={50}
              className="object-contain grayscale hover:grayscale-0 transition-all"
            />
          </li>
        ))}
      </ul>
    </SectionWrapper>
  )
}
