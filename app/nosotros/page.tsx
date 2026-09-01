import About from '@/components/sections/About'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Nosotros',
  description:
    'Centro de Ojos Belén nace para brindar atención oftalmológica integral en Belén y la región, con consulta, estudios y seguimiento en un mismo espacio.',
  alternates: { canonical: '/nosotros' },
}

export default function NosotrosPage() {
  return <About />
}
