// content/site.ts
// Fuente única de verdad de todo el contenido del sitio.
// Ningún texto debe estar hardcodeado en el JSX de los componentes.
//
// Los bloques marcados con PLACEHOLDER son contenido de referencia acordado en
// el kick-off (§4) y deben reemplazarse por el material definitivo del centro
// antes de publicar. Para encontrarlos todos:  grep -rn "PLACEHOLDER" content/

import { brand, siteName } from './brand'

// Se re-exporta para que los componentes de servidor sigan importando todo
// desde content/site.ts. Los de cliente deben importar de './brand' directo.
export { brand }

// ─── Datos del sitio ──────────────────────────────────────────────────────────

export const site = {
  name: siteName,
  shortName: siteName,
  legalName: siteName,
  domain: 'www.centrodeojosbelen.com.ar',
  city: 'Belén',
  province: 'Catamarca',
  country: 'AR',
  specialty: 'Oftalmología',
  description:
    'Centro oftalmológico dedicado al cuidado integral de la salud visual: consultas, estudios diagnósticos y cirugía ocular.',
} as const

// ─── Navegación ───────────────────────────────────────────────────────────────

export const nav = {
  ctaLabel: 'Sacar un turno',
  links: [
    { label: 'Servicios', href: '#servicios' },
    { label: 'El centro', href: '#nosotros' },
    { label: 'Obras sociales', href: '#obras-sociales' },
    { label: 'Sedes', href: '#sedes' },
    { label: 'Preguntas', href: '#preguntas' },
    { label: 'Contacto', href: '#contacto' },
  ],
} as const

// ─── Inicio ───────────────────────────────────────────────────────────────────

export const hero = {
  eyebrow: 'Oftalmología integral',
  // PLACEHOLDER — mensaje institucional a definir con el centro
  headline: 'Cuidamos tu visión\ncon la atención que merece.',
  subtitle:
    'Consultas, estudios diagnósticos y cirugía ocular en un solo lugar, con equipamiento actualizado y un equipo que te acompaña en cada paso.',
  ctaPrimary: { label: 'Sacar un turno', href: 'whatsapp' as const },
  ctaSecondary: { label: 'Ver servicios', href: '#servicios' },
  // Imagen de fondo opcional. Cuando el centro entregue las fotos del
  // consultorio, apuntar acá; mientras tanto se usa la composición de marca.
  image: null as string | null,
  imageAlt: '',
} as const

// ─── Servicios y especialidades ───────────────────────────────────────────────

export type ServiceIcon =
  | 'eye'
  | 'lens'
  | 'scalpel'
  | 'retina'
  | 'pressure'
  | 'child'
  | 'scan'
  | 'glasses'

export interface Service {
  id: string
  title: string
  description: string
  details: string[]
  icon: ServiceIcon
  /** Foto del servicio. Opcional: si no hay, la tarjeta usa el ícono. */
  image?: string
}

// PLACEHOLDER — listado y descripciones a reemplazar por los del centro
export const services: Service[] = [
  {
    id: 'consulta-general',
    title: 'Consulta oftalmológica',
    description:
      'El control completo de la vista: agudeza visual, presión ocular y examen del fondo de ojo.',
    details: [
      'Control de agudeza visual y graduación',
      'Medición de la presión intraocular',
      'Examen de fondo de ojo con dilatación',
      'Indicación de anteojos y lentes de contacto',
    ],
    icon: 'eye',
  },
  {
    id: 'cataratas',
    title: 'Cirugía de cataratas',
    description:
      'Procedimiento ambulatorio para recuperar la nitidez de la visión cuando el cristalino pierde transparencia.',
    details: [
      'Estudio prequirúrgico completo',
      'Técnica de facoemulsificación',
      'Lentes intraoculares monofocales y multifocales',
      'Control postoperatorio incluido',
    ],
    icon: 'lens',
  },
  {
    id: 'cirugia-refractiva',
    title: 'Cirugía refractiva',
    description:
      'Corrección de miopía, hipermetropía y astigmatismo para reducir o eliminar la dependencia de los anteojos.',
    details: [
      'Evaluación de aptitud con topografía corneal',
      'Tratamiento con láser',
      'Indicaciones y cuidados postoperatorios',
      'Seguimiento a los 30, 90 y 180 días',
    ],
    icon: 'scalpel',
  },
  {
    id: 'retina',
    title: 'Retina y vítreo',
    description:
      'Diagnóstico y tratamiento de las afecciones de la retina, incluida la retinopatía diabética.',
    details: [
      'Control de retinopatía diabética',
      'Degeneración macular relacionada con la edad',
      'Tratamiento con láser y aplicaciones intravítreas',
      'Estudio de desprendimiento de retina',
    ],
    icon: 'retina',
  },
  {
    id: 'glaucoma',
    title: 'Glaucoma',
    description:
      'Detección temprana y seguimiento de una enfermedad que avanza sin síntomas hasta etapas tardías.',
    details: [
      'Medición y curva de presión intraocular',
      'Campo visual computarizado',
      'OCT de nervio óptico',
      'Seguimiento y ajuste del tratamiento',
    ],
    icon: 'pressure',
  },
  {
    id: 'pediatrica',
    title: 'Oftalmología pediátrica',
    description:
      'Controles de la visión en la infancia, donde la detección temprana define el resultado del tratamiento.',
    details: [
      'Control de visión escolar',
      'Estrabismo y ojo vago (ambliopía)',
      'Graduación en niños',
      'Seguimiento del desarrollo visual',
    ],
    icon: 'child',
  },
  {
    id: 'estudios',
    title: 'Estudios diagnósticos',
    description:
      'Estudios complementarios realizados en el centro, sin necesidad de derivación a otra institución.',
    details: [
      'OCT (tomografía de coherencia óptica)',
      'Campo visual computarizado',
      'Topografía y paquimetría corneal',
      'Retinografía y biometría',
    ],
    icon: 'scan',
  },
  {
    id: 'optica',
    title: 'Óptica y lentes de contacto',
    description:
      'Adaptación de anteojos y lentes de contacto a partir de la graduación indicada en la consulta.',
    details: [
      'Adaptación de lentes de contacto',
      'Anteojos recetados y de sol con graduación',
      'Lentes multifocales y ocupacionales',
      'Control de adaptación',
    ],
    icon: 'glasses',
  },
]

// ─── Sobre el centro ──────────────────────────────────────────────────────────

// PLACEHOLDER — presentación institucional a redactar con el centro
export const about = {
  eyebrow: 'El centro',
  title: 'Un equipo dedicado a cuidar tu visión',
  paragraphs: [
    'El Centro de Ojos Belén reúne consultas, estudios diagnósticos y cirugía ocular en un mismo lugar, para que el paciente resuelva todo su tratamiento sin tener que trasladarse entre instituciones.',
    'Trabajamos con equipamiento actualizado y con un criterio simple: explicar cada diagnóstico en palabras claras, para que puedas decidir con información sobre tu propia salud.',
  ],
  highlights: [
    {
      title: 'Todo en un solo lugar',
      description: 'Consulta, estudios y cirugía sin derivaciones ni traslados.',
    },
    {
      title: 'Equipamiento actualizado',
      description: 'Tecnología diagnóstica que permite detectar a tiempo.',
    },
    {
      title: 'Explicaciones claras',
      description: 'Te contamos qué tenés y qué opciones hay, sin tecnicismos.',
    },
    {
      title: 'Turnos por WhatsApp',
      description: 'Sacá tu turno desde el celular, sin llamadas ni esperas.',
    },
  ],
} as const

export interface TeamMember {
  name: string
  role: string
  license?: string
  photo?: string
}

// PLACEHOLDER — el equipo real, con matrículas y fotos, lo provee el centro.
// Los nombres y matrículas de abajo son deliberadamente genéricos: no se
// publican datos profesionales inventados en un sitio de salud.
export const team: TeamMember[] = [
  { name: 'Profesional 1', role: 'Oftalmología general · Segmento anterior', license: 'M.P. —' },
  { name: 'Profesional 2', role: 'Retina y vítreo', license: 'M.P. —' },
  { name: 'Profesional 3', role: 'Glaucoma', license: 'M.P. —' },
  { name: 'Profesional 4', role: 'Oftalmología pediátrica', license: 'M.P. —' },
]

export const showTeam = true

// ─── Obras sociales ───────────────────────────────────────────────────────────

export interface HealthPlan {
  name: string
  note?: string
}

// PLACEHOLDER — listado a reemplazar por las coberturas reales del centro
export const healthPlans: HealthPlan[] = [
  { name: 'OSDE' },
  { name: 'Swiss Medical' },
  { name: 'Galeno' },
  { name: 'Medifé' },
  { name: 'Sancor Salud' },
  { name: 'Federada Salud' },
  { name: 'Jerárquicos Salud' },
  { name: 'Unión Personal' },
  { name: 'Accord Salud' },
  { name: 'OSECAC' },
  { name: 'OSPE' },
  { name: 'OSDOP' },
  { name: 'Prevención Salud' },
  { name: 'PAMI', note: 'Requiere orden médica' },
  { name: 'IOSFA' },
  { name: 'OSEP Catamarca' },
]

export const healthPlansSection = {
  eyebrow: 'Coberturas',
  title: 'Obras sociales y prepagas',
  subtitle:
    'Trabajamos con las siguientes coberturas. Buscá la tuya en el listado.',
  searchLabel: 'Buscar obra social o prepaga',
  searchPlaceholder: 'Escribí el nombre de tu cobertura…',
  emptyMessage:
    'No encontramos esa cobertura en el listado. Escribinos por WhatsApp y lo verificamos.',
  disclaimer:
    'Las condiciones de cobertura pueden cambiar y algunas prácticas requieren autorización previa. Ante cualquier duda, consultanos antes de sacar el turno.',
  ctaLabel: 'Consultar por mi cobertura',
} as const

// ─── Sedes y horarios ─────────────────────────────────────────────────────────

export interface OpeningHours {
  /** Etiqueta visible, ej. "Lunes a viernes" */
  days: string
  /** Horario visible, ej. "8:00 a 13:00 y 16:00 a 20:00" */
  hours: string
  /** Días en formato schema.org, para el JSON-LD */
  schemaDays: string[]
  /** Apertura y cierre en HH:MM, para el JSON-LD. Un tramo por objeto. */
  schemaOpens: string
  schemaCloses: string
}

export interface Location {
  id: string
  name: string
  street: string
  city: string
  province: string
  postalCode?: string
  phones: string[]
  hours: OpeningHours[]
  /** URL del iframe de Google Maps (Compartir → Insertar un mapa) */
  mapEmbedUrl: string
  /** URL de "Cómo llegar" — abre la app de mapas del dispositivo */
  mapDirectionsUrl: string
  geo?: { lat: number; lng: number }
}

export const locations: Location[] = [
  {
    id: 'sede-belen',
    name: 'Belén',
    street: 'Rivadavia 490',
    city: 'Belén',
    province: 'Catamarca',
    postalCode: '4750',
    // PLACEHOLDER — teléfonos y horarios reales del centro
    phones: ['+54 383 400-0000'],
    hours: [
      {
        days: 'Lunes a viernes',
        hours: '8:00 a 13:00 y 16:00 a 20:00',
        schemaDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        schemaOpens: '08:00',
        schemaCloses: '20:00',
      },
      {
        days: 'Sábados',
        hours: '9:00 a 13:00',
        schemaDays: ['Saturday'],
        schemaOpens: '09:00',
        schemaCloses: '13:00',
      },
    ],
    // Se consulta por nombre + dirección para que el pin caiga sobre la ficha
    // del centro y no sobre el número de la calle.
    mapEmbedUrl:
      'https://www.google.com/maps?q=Centro+de+Ojos+Bel%C3%A9n%2C+Rivadavia+490%2C+Bel%C3%A9n%2C+Catamarca&output=embed',
    mapDirectionsUrl:
      'https://www.google.com/maps/dir/?api=1&destination=Centro+de+Ojos+Bel%C3%A9n%2C+Rivadavia+490%2C+Bel%C3%A9n%2C+Catamarca',
  },
]

export const locationsSection = {
  eyebrow: 'Dónde estamos',
  title: 'Sedes y horarios de atención',
  subtitle: 'Nos encontrás en Belén, Catamarca. Tocá "Cómo llegar" y te abre el mapa.',
  directionsLabel: 'Cómo llegar',
} as const

// ─── Preguntas frecuentes ─────────────────────────────────────────────────────

export interface FaqItem {
  question: string
  answer: string
}

// PLACEHOLDER — respuestas a validar con el centro antes de publicar.
// Este bloque cumple dos funciones: responde las objeciones que frenan a un
// paciente antes de pedir turno, y alimenta el JSON-LD de FAQPage, que Google
// muestra desplegado en los resultados de búsqueda.
export const faq: FaqItem[] = [
  {
    question: '¿Necesito orden médica para sacar un turno?',
    answer:
      'Para una consulta oftalmológica general no hace falta. Algunas coberturas sí piden orden para estudios y cirugías: cuando saques el turno te avisamos si tu caso la requiere.',
  },
  {
    question: '¿Cómo saco un turno?',
    answer:
      'Por WhatsApp es lo más rápido: escribinos y te ofrecemos los horarios disponibles. También podés llamarnos por teléfono o dejarnos tu consulta en el formulario de esta página.',
  },
  {
    question: '¿Cuánto dura una consulta?',
    answer:
      'Una consulta general lleva entre 30 y 45 minutos. Si necesitás estudios complementarios el mismo día, puede extenderse un poco más.',
  },
  {
    question: 'Me van a dilatar la pupila. ¿Puedo manejar después?',
    answer:
      'No. La dilatación deja la visión borrosa y muy sensible a la luz durante 4 a 6 horas. Vení acompañado o previendo volver en transporte, y traé anteojos de sol.',
  },
  {
    question: '¿Tengo que ir en ayunas?',
    answer:
      'No hace falta para la consulta ni para los estudios habituales. Si tu caso requiere alguna preparación especial, te la indicamos al confirmar el turno.',
  },
  {
    question: '¿Desde qué edad hay que controlar la vista de los chicos?',
    answer:
      'El primer control se recomienda entre los 3 y 4 años, incluso sin síntomas. Muchos problemas visuales de la infancia no dan señales y solo se detectan en un examen.',
  },
  {
    question: '¿Qué llevo a la consulta?',
    answer:
      'Documento, credencial de la obra social, los anteojos que usás actualmente y, si tenés, estudios oftalmológicos previos y la lista de medicación que tomás.',
  },
]

export const faqSection = {
  eyebrow: 'Preguntas frecuentes',
  title: 'Lo que más nos consultan',
  subtitle:
    'Si tu duda no está acá, escribinos por WhatsApp y te respondemos sin compromiso.',
} as const

// ─── Contacto ─────────────────────────────────────────────────────────────────

export const contact = {
  eyebrow: 'Contacto',
  heading: 'Escribinos',
  subtext:
    'Completá el formulario y te respondemos por correo. Si necesitás un turno, WhatsApp es el camino más rápido.',
  // PLACEHOLDER — teléfonos del centro
  phones: ['+54 383 400-0000'],
  email: 'contacto@centrodeojosbelen.com.ar',
  whatsappLabel: 'Sacar un turno por WhatsApp',
  form: {
    nameLabel: 'Nombre y apellido',
    namePlaceholder: 'Tu nombre completo',
    emailLabel: 'Correo electrónico',
    emailPlaceholder: 'tunombre@correo.com',
    phoneLabel: 'Teléfono',
    phonePlaceholder: '383 400 0000',
    messageLabel: 'Tu consulta',
    messagePlaceholder: '¿En qué podemos ayudarte?',
    submitLabel: 'Enviar consulta',
    submittingLabel: 'Enviando…',
    successTitle: '¡Consulta enviada!',
    successMessage: 'Te respondemos a la brevedad por correo o teléfono.',
    successAgainLabel: 'Enviar otra consulta',
    // Aviso obligatorio: el formulario no es un canal clínico
    healthNotice:
      'No incluyas información médica ni resultados de estudios en este formulario. Para consultas sobre tu tratamiento, comunicate por teléfono o WhatsApp.',
    privacyNotice:
      'Tus datos se usan únicamente para responder esta consulta y no se almacenan en el sitio.',
  },
} as const

// ─── Pie de página ────────────────────────────────────────────────────────────

export type SocialNetwork = 'instagram' | 'facebook' | 'whatsapp'

export interface SocialLink {
  network: SocialNetwork
  label: string
  href: string
}

// PLACEHOLDER — redes reales del centro
export const footer = {
  tagline:
    'Cuidado integral de la salud visual: consultas, estudios diagnósticos y cirugía ocular.',
  links: nav.links,
  social: [
    { network: 'instagram', label: 'Instagram', href: 'https://instagram.com/' },
    { network: 'facebook', label: 'Facebook', href: 'https://facebook.com/' },
  ] as SocialLink[],
  // El año NO se calcula acá: content/site.ts lo importan componentes de
  // cliente, así que new Date() terminaría corriendo en el navegador y podría
  // no coincidir con el HTML del servidor. Lo resuelve el Footer.
  copyrightSuffix: `${site.name}. Todos los derechos reservados.`,
} as const
