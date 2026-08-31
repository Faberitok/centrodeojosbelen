export interface HealthPlan {
  name: string
  note?: string
}

// Se completa únicamente con convenios confirmados y sus logos oficiales.
export const healthPlans: HealthPlan[] = []

export const healthPlansSection = {
  eyebrow: 'Coberturas',
  title: 'Obras sociales',
  subtitle: 'Trabajamos con diferentes obras sociales y sistemas de cobertura médica.',
  searchLabel: 'Buscar obra social o prepaga',
  searchPlaceholder: 'Escribí el nombre de tu cobertura…',
  emptyMessage:
    'No encontramos esa cobertura en el listado. Escribinos por WhatsApp y lo verificamos.',
  disclaimer:
    'Las prestaciones cubiertas pueden variar según la obra social, el plan del afiliado y las autorizaciones correspondientes.',
  ctaLabel: 'Consultar cobertura por WhatsApp',
} as const
