import About from '@/components/sections/About'
import Branches from '@/components/sections/Branches'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Nosotros',
  description:
    'Centro de Ojos Belén nace para brindar atención oftalmológica integral en Belén, Andalgalá y Tinogasta, con consulta, estudios y seguimiento en un mismo espacio.',
  alternates: { canonical: '/nosotros' },
}

export default function NosotrosPage() {
  return (
    <>
      <About />
      <Branches />
    </>
  )
}
