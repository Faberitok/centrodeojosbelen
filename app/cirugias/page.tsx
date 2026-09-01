import Procedures from '@/components/sections/Procedures'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Cirugías',
  description:
    'Cirugía de cataratas, YAG láser, inyecciones intravítreas y cirugía de pterigión en Centro de Ojos Belén, con preparación y seguimiento.',
  alternates: { canonical: '/cirugias' },
}

export default function CirugiasPage() {
  return <Procedures />
}
