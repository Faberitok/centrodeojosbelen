import Studies from '@/components/sections/Studies'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Estudios',
  description:
    'Estudios oftalmológicos en Belén: OCT, campimetría computarizada, topografía corneal, paquimetría, biometría, tonometría y autorrefractometría con equipamiento propio.',
  alternates: { canonical: '/estudios' },
}

export default function EstudiosPage() {
  return <Studies />
}
