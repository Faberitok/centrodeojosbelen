export interface HealthPlan {
  name: string
  logo: string
  href?: string
}

export const healthPlans: HealthPlan[] = [
  {
    name: 'OSEP Catamarca',
    logo: '/obras-sociales/osep.png',
    href: 'https://www.osep.gob.ar/osep/',
  },
  {
    name: 'Red de Seguro Médico',
    logo: '/obras-sociales/red-seguro-medico.jpg',
    href: 'https://reddeseguromedico.com/',
  },
  {
    name: 'OSDE',
    logo: '/obras-sociales/osde.webp',
    href: 'https://www.osde.com.ar/',
  },
  {
    name: 'Swiss Medical',
    logo: '/obras-sociales/swiss-medical.png',
    href: 'https://www.swissmedical.com.ar/prepagaclientes/',
  },
  {
    name: 'Nobis',
    logo: '/obras-sociales/nobis.png',
    href: 'https://nobis.com.ar/',
  },
  {
    name: 'SanCor Salud',
    logo: '/obras-sociales/sancor-salud.png',
    href: 'https://sancorsalud.com.ar/',
  },
  {
    name: 'Medicus',
    logo: '/obras-sociales/medicus.png',
    href: 'https://medicus.com.ar/',
  },
]

export const healthPlansSection = {
  eyebrow: 'Coberturas',
  title: 'Obras sociales',
  subtitle: 'Trabajamos con diferentes obras sociales y sistemas de cobertura médica.',
  searchLabel: 'Buscar obra social o prepaga',
  searchPlaceholder: 'Escribí el nombre de tu cobertura…',
  emptyMessage:
    'No encontramos esa cobertura en el listado. Escribinos por WhatsApp y lo verificamos.',
  disclaimer:
    'La cobertura depende del plan y las autorizaciones. Si necesitás consultar, escribinos desde el ícono de WhatsApp.',
  ctaLabel: 'Consultar cobertura por WhatsApp',
} as const
