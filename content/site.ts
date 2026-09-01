// content/site.ts
// Fuente única de verdad de todo el contenido del sitio.
// Ningún texto debe estar hardcodeado en el JSX de los componentes.
//
import { brand, siteName } from './brand'
import { contact } from './contact'
import { healthPlans, healthPlansSection } from './health-plans'
import { nav } from './navigation'

// Se re-exporta para que los componentes de servidor sigan importando todo
// desde content/site.ts. Los de cliente deben importar de './brand' directo.
export { brand, contact, healthPlans, healthPlansSection, nav }

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
    'Atención oftalmológica integral para bebés, niños, adolescentes y adultos en Belén, Catamarca: consultas, estudios, tecnología y cirugías.',
} as const

// ─── Inicio ───────────────────────────────────────────────────────────────────

export const hero = {
  eyebrow: 'Centro de Ojos Belén',
  headline: 'Cuidamos tu visión\nen cada etapa de la vida.',
  subtitle:
    'Atención oftalmológica integral para bebés, niños, adolescentes y adultos, con tecnología diagnóstica y seguimiento cercano.',
  ctaPrimary: { label: 'Solicitar turno por WhatsApp', href: 'whatsapp' as const },
  ctaSecondary: { label: 'Conocer el centro', href: '/nosotros' },
  image: '/media/hero-centro.webp',
  imageAlt: 'Fachada de Centro de Ojos Belén',
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

export const services: Service[] = [
  {
    id: 'bebes-ninos',
    title: 'Bebés y niños',
    description:
      'Controles desde los primeros meses de vida y acompañamiento del desarrollo visual.',
    details: [
      'Control oftalmológico del bebé y del niño',
      'Detección de ambliopía y estrabismo',
      'Miopía, hipermetropía y astigmatismo',
      'Controles escolares y fondo de ojos',
    ],
    icon: 'child',
    image: '/media/atencion-bebes-ninos.webp',
  },
  {
    id: 'adultos',
    title: 'Adultos',
    description:
      'Prevención, diagnóstico temprano y evaluación integral de la salud visual.',
    details: [
      'Agudeza visual y defectos refractivos',
      'Presbicia, ojo seco y cataratas',
      'Presión intraocular y fondo de ojos',
      'Glaucoma, córnea y retina',
    ],
    icon: 'eye',
    image: '/media/atencion-adultos.webp',
  },
  {
    id: 'adultos-mayores',
    title: 'Adultos mayores',
    description:
      'Diagnóstico y seguimiento de las enfermedades oculares más frecuentes con el paso del tiempo.',
    details: [
      'Cataratas y glaucoma',
      'Degeneración macular',
      'Retinopatía diabética',
      'Superficie ocular y enfermedades crónicas',
    ],
    icon: 'pressure',
    image: '/media/atencion-adultos-mayores.webp',
  },
]

export interface Study {
  id: string
  title: string
  description: string
  image: string
}

export const studies: Study[] = [
  {
    id: 'oct',
    title: 'OCT · Tomografía de Coherencia Óptica',
    description:
      'Imágenes de alta resolución de la retina, la mácula y el nervio óptico para diagnóstico y seguimiento.',
    image: '/media/oct-estudio.webp',
  },
  {
    id: 'topografia-corneal',
    title: 'Topografía corneal',
    description:
      'Analiza la forma y curvatura de la córnea para detectar queratocono y planificar evaluaciones prequirúrgicas.',
    image: '/media/topografia-corneal.webp',
  },
  {
    id: 'paquimetria',
    title: 'Paquimetría corneal',
    description:
      'Mide el espesor de la córnea, un dato importante para evaluar glaucoma y patologías corneales.',
    image: '/media/paquimetria-estudio.webp',
  },
  {
    id: 'biometria',
    title: 'Biometría óptica',
    description:
      'Realiza mediciones precisas del ojo para calcular la lente intraocular de una cirugía de cataratas.',
    image: '/media/biometria-meda.webp',
  },
  {
    id: 'tonometria',
    title: 'Tonometría',
    description:
      'Mide la presión intraocular para la detección y el seguimiento del glaucoma.',
    image: '/media/tonometro-icare-100.webp',
  },
  {
    id: 'autorrefractometria',
    title: 'Autorrefractometría',
    description:
      'Obtiene una medición objetiva de los defectos refractivos como parte de la evaluación oftalmológica.',
    image: '/media/autorrefractometria-estudio.webp',
  },
]

export interface Equipment {
  id: string
  name: string
  kicker: string
  description: string
  image: string
  imageAlt: string
}

export const equipment: Equipment[] = [
  {
    id: 'oct-optovue',
    name: 'OCT Optovue iScan',
    kicker: 'Retina y nervio óptico',
    description: 'Tomografía no invasiva de alta resolución.',
    image: '/media/oct-optovue-iscan.webp',
    imageAlt: 'Equipo OCT Optovue iScan de Centro de Ojos Belén',
  },
  {
    id: 'topografo-tomey',
    name: 'Topógrafo Tomey TMS-4',
    kicker: 'Mapa de la córnea',
    description: 'Análisis preciso de forma y curvatura corneal.',
    image: '/media/topografo-tomey-tms4.webp',
    imageAlt: 'Topógrafo corneal Tomey TMS-4',
  },
  {
    id: 'paquimetro',
    name: 'Paquímetro corneal',
    kicker: 'Espesor corneal',
    description: 'Medición relevante para glaucoma y córnea.',
    image: '/media/paquimetro-corneal.webp',
    imageAlt: 'Paquímetro corneal del centro',
  },
  {
    id: 'biometria-meda',
    name: 'Regla biométrica MEDA',
    kicker: 'Planificación de cataratas',
    description: 'Mediciones para el cálculo de lentes intraoculares.',
    image: '/media/biometria-meda.webp',
    imageAlt: 'Regla biométrica MEDA',
  },
  {
    id: 'tonometro-icare',
    name: 'Tonómetro iCare 100',
    kicker: 'Presión intraocular',
    description: 'Medición rápida para detección y control de glaucoma.',
    image: '/media/tonometro-icare-100.webp',
    imageAlt: 'Tonómetro de rebote iCare 100',
  },
  {
    id: 'autorrefractometro',
    name: 'Autorrefractómetro',
    kicker: 'Evaluación refractiva',
    description: 'Medición objetiva para complementar la consulta.',
    image: '/media/autorrefractometro.webp',
    imageAlt: 'Autorrefractómetro de escritorio',
  },
  {
    id: 'retinomax',
    name: 'Retinomax portátil',
    kicker: 'Evaluación pediátrica',
    description: 'Autorrefracción portátil para pacientes de todas las edades.',
    image: '/media/retinomax-portatil.webp',
    imageAlt: 'Autorrefractómetro portátil Retinomax',
  },
  {
    id: 'oftalmoscopio-keeler',
    name: 'Oftalmoscopio Keeler',
    kicker: 'Fondo de ojos',
    description: 'Evaluación binocular indirecta de la retina.',
    image: '/media/oftalmoscopio-keeler.webp',
    imageAlt: 'Oftalmoscopio binocular indirecto Keeler',
  },
  {
    id: 'yag-appasamy',
    name: 'YAG láser Appasamy 307',
    kicker: 'Procedimientos ambulatorios',
    description: 'Tecnología láser para indicaciones del segmento anterior.',
    image: '/media/yag-laser-appasamy.webp',
    imageAlt: 'Equipo YAG láser Appasamy 307',
  },
]

export interface Procedure {
  id: string
  title: string
  description: string
  preparation: string
  treatment: string
  href?: string
  ctaLabel?: string
}

export const procedures: Procedure[] = [
  {
    id: 'cataratas',
    title: 'Cirugía de cataratas',
    description:
      'La catarata produce una pérdida progresiva de transparencia del cristalino. Su tratamiento es quirúrgico y consiste en reemplazar el cristalino opacificado por una lente intraocular.',
    preparation:
      'Antes de la cirugía realizamos una evaluación oftalmológica completa y los estudios necesarios para planificar el procedimiento y seleccionar la lente intraocular.',
    treatment:
      'Acompañamos al paciente durante todo el proceso: indicación, estudios prequirúrgicos, procedimiento y controles posteriores.',
    href: '/cirugia-de-cataratas',
    ctaLabel: 'Ver página de cataratas',
  },
  {
    id: 'yag-laser',
    title: 'YAG láser',
    description:
      'Procedimiento láser ambulatorio utilizado para determinadas patologías del segmento anterior y, especialmente, para el tratamiento de la opacificación de la cápsula posterior luego de una cirugía de cataratas.',
    preparation:
      'La indicación se confirma en consulta, con evaluación del segmento anterior y revisión de estudios previos cuando correspondan.',
    treatment:
      'Se realiza de forma ambulatoria. Luego del procedimiento indicamos controles y cuidados para el seguimiento.',
  },
  {
    id: 'inyecciones',
    title: 'Inyecciones intravítreas',
    description:
      'Procedimiento utilizado para el tratamiento de diferentes enfermedades retinales, como edema macular diabético, oclusiones vasculares retinales y determinadas enfermedades maculares.',
    preparation:
      'La indicación surge de la evaluación de la retina y, cuando corresponde, de estudios como OCT.',
    treatment:
      'El procedimiento se planifica de forma personalizada y se acompaña con controles posteriores para valorar la respuesta.',
  },
  {
    id: 'pterigion',
    title: 'Cirugía de pterigión',
    description:
      'Evaluación, indicación quirúrgica y seguimiento de pacientes con pterigión.',
    preparation:
      'En la consulta definimos si corresponde tratamiento médico o quirúrgico, según el tamaño, los síntomas y la evolución.',
    treatment:
      'Cuando hay indicación quirúrgica, planificamos el procedimiento y realizamos los controles posteriores.',
  },
]

export interface ConditionPage {
  slug: string
  title: string
  lead: string
  summary: string
  sections: { title: string; body: string }[]
  ctaLabel: string
  whatsappMessage: string
  image: string
  imageAlt: string
}

export const conditionPages: ConditionPage[] = [
  {
    slug: 'cirugia-de-cataratas',
    title: 'Cirugía de cataratas',
    lead: 'Volver a ver con claridad',
    summary:
      'La catarata es la pérdida progresiva de transparencia del cristalino, una lente natural que se encuentra dentro del ojo. Puede provocar visión borrosa, disminución del contraste, molestias con las luces y cambios frecuentes en la graduación.',
    sections: [
      {
        title: 'Preparación',
        body: 'Antes de la cirugía realizamos una evaluación oftalmológica completa y los estudios necesarios para planificar el procedimiento y seleccionar la lente intraocular.',
      },
      {
        title: 'Tratamiento',
        body: 'El tratamiento definitivo es quirúrgico. Durante la cirugía se retira el cristalino opacificado y se implanta una lente intraocular calculada específicamente para cada paciente.',
      },
      {
        title: 'Seguimiento',
        body: 'Acompañamos al paciente antes y después de su cirugía mediante controles postoperatorios programados.',
      },
    ],
    ctaLabel: 'Solicitar evaluación de cataratas',
    whatsappMessage: 'Hola, quisiera solicitar una evaluación de cataratas.',
    image: '/media/evaluacion-cataratas.webp',
    imageAlt: 'Profesional de Centro de Ojos Belén junto a equipo oftalmológico',
  },
  {
    slug: 'glaucoma',
    title: 'Glaucoma',
    lead: 'Puede avanzar sin dar síntomas',
    summary:
      'El glaucoma comprende un grupo de enfermedades capaces de producir daño progresivo del nervio óptico. En sus etapas iniciales puede no producir síntomas, por lo que los controles oftalmológicos periódicos son fundamentales para detectarlo tempranamente.',
    sections: [
      {
        title: 'Preparación',
        body: 'La evaluación puede incluir medición de presión intraocular, evaluación del nervio óptico, paquimetría corneal, OCT y otros estudios según cada paciente.',
      },
      {
        title: 'Tratamiento',
        body: 'El diagnóstico temprano permite iniciar tratamiento y disminuir el riesgo de pérdida visual, con un seguimiento cercano de cada caso.',
      },
    ],
    ctaLabel: 'Solicitar control de glaucoma',
    whatsappMessage: 'Hola, quisiera solicitar un control de glaucoma.',
    image: '/media/tonometro-icare-100.webp',
    imageAlt: 'Tonómetro iCare para medición de presión intraocular',
  },
  {
    slug: 'queratocono',
    title: 'Queratocono',
    lead: 'Diagnóstico y seguimiento',
    summary:
      'El queratocono es una enfermedad que produce un adelgazamiento y una modificación progresiva de la forma de la córnea. Puede generar astigmatismo irregular y disminución progresiva de la visión.',
    sections: [
      {
        title: 'Preparación',
        body: 'La topografía corneal constituye una herramienta fundamental para su detección. En la consulta definimos qué estudios complementar según cada paciente.',
      },
      {
        title: 'Tratamiento',
        body: 'El seguimiento con mediciones comparables permite acompañar la evolución y definir la conducta terapéutica más adecuada en cada etapa.',
      },
    ],
    ctaLabel: 'Solicitar topografía corneal',
    whatsappMessage: 'Hola, quisiera solicitar una topografía corneal.',
    image: '/media/topografia-corneal.webp',
    imageAlt: 'Topógrafo corneal Tomey TMS-4',
  },
  {
    slug: 'retinopatia-diabetica',
    title: 'Retinopatía diabética',
    lead: 'Diabetes y salud visual',
    summary:
      'La diabetes puede afectar los pequeños vasos sanguíneos de la retina y producir retinopatía diabética. Durante sus primeras etapas puede no generar síntomas.',
    sections: [
      {
        title: 'Preparación',
        body: 'Las personas con diabetes deben realizar controles oftalmológicos periódicos aunque tengan buena visión. La evaluación puede incluir fondo de ojos y estudios como OCT cuando estén indicados.',
      },
      {
        title: 'Tratamiento',
        body: 'Según cada caso, el seguimiento puede incluir controles periódicos, estudios complementarios y procedimientos como inyecciones intravítreas cuando estén indicados.',
      },
    ],
    ctaLabel: 'Solicitar control oftalmológico',
    whatsappMessage: 'Hola, quisiera solicitar un control por diabetes.',
    image: '/media/retina-control.webp',
    imageAlt: 'Evaluación de retina con oftalmoscopio binocular indirecto',
  },
]

// ─── Sobre el centro ──────────────────────────────────────────────────────────

export const about = {
  eyebrow: 'El centro',
  title: 'Nosotros',
  paragraphs: [
    'Centro de Ojos Belén nace con el objetivo de brindar atención oftalmológica integral en Belén y la región, acercando profesionales especializados y tecnología diagnóstica a nuestros pacientes.',
    'Nuestro modelo de atención integra en un mismo espacio la consulta, los estudios complementarios, el seguimiento de enfermedades oculares y la planificación de tratamientos y procedimientos quirúrgicos.',
  ],
  highlights: [
    {
      title: 'Nuestra misión',
      description:
        'Brindar atención oftalmológica de calidad, accesible y cercana, incorporando tecnología y formación profesional continua.',
    },
    {
      title: 'Nuestra visión',
      description:
        'Ser un centro oftalmológico de referencia para Belén y el oeste de Catamarca, ampliando nuestra capacidad diagnóstica, terapéutica y quirúrgica.',
    },
  ],
  image: '/media/centro-interior.webp',
  imageAlt: 'Interior de Centro de Ojos Belén en Belén, Catamarca',
  gallery: [
    {
      src: '/media/centro-interior.webp',
      alt: 'Interior de Centro de Ojos Belén',
    },
    {
      src: '/media/pasillo-centro.webp',
      alt: 'Pasillo y consultorios de Centro de Ojos Belén',
    },
    {
      src: '/media/sala-espera.webp',
      alt: 'Sala de espera de Centro de Ojos Belén',
    },
    {
      src: '/media/consultorio.webp',
      alt: 'Consultorio oftalmológico de Centro de Ojos Belén',
    },
    {
      src: '/media/hero-centro.webp',
      alt: 'Fachada de Centro de Ojos Belén',
    },
  ],
} as const

export interface TeamMember {
  name: string
  role: string
  license?: string
  photo?: string
  bio: string
}

export const team: TeamMember[] = [
  {
    name: 'Dr. Gonzalo Castro Barrientos',
    role: 'Médico especialista en Oftalmología · Oftalmología clínica y quirúrgica',
    license: 'MP 2820 / ME 1483',
    photo: '/media/staff-gonzalo.webp',
    bio:
      'Formación médica y residencia en Oftalmología en el Hospital Nacional de Clínicas. Especial interés en cirugía de cataratas, glaucoma y seguimiento de patologías oftalmológicas. Miembro activo del Consejo Argentino de Oftalmología y parte de la Sociedad Catamarqueña de Oftalmología.',
  },
  {
    name: 'Dra. Carla Ferreyra',
    role: 'Médica oftalmóloga · Atención integral de bebés, niños y adultos',
    license: 'MP 3229 / ME 1718',
    photo: '/staff/carla.jpeg',
    bio:
      'Médica formada en la Universidad Nacional de Córdoba. Residencia en Oftalmología realizada en el Instituto Mostaza Sánchez, Córdoba.',
  },
]

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
    phones: ['3804-100707'],
    hours: [],
    // Se consulta por nombre + dirección para que el pin caiga sobre la ficha
    // del centro y no sobre el número de la calle.
    mapEmbedUrl:
      'https://www.google.com/maps?q=Centro+de+Ojos+Bel%C3%A9n%2C+Rivadavia+490%2C+Bel%C3%A9n%2C+Catamarca&output=embed',
    mapDirectionsUrl:
      'https://www.google.com/maps/dir/?api=1&destination=Centro+de+Ojos+Bel%C3%A9n%2C+Rivadavia+490%2C+Bel%C3%A9n%2C+Catamarca',
  },
]

export const locationsSection = {
  eyebrow: 'Dirección y atención',
  title: 'Estamos en Belén',
  subtitle: 'Rivadavia 490, Belén, Catamarca. Tocá “Cómo llegar” para abrir el mapa.',
  directionsLabel: 'Cómo llegar',
  hoursPending: 'Consultá los horarios de atención por WhatsApp.',
} as const

// ─── Preguntas frecuentes ─────────────────────────────────────────────────────

export interface FaqItem {
  question: string
  answer: string
}

export const faq: FaqItem[] = [
  {
    question: '¿Atienden bebés y niños?',
    answer:
      'Sí. Realizamos atención oftalmológica desde los primeros meses de vida y durante toda la infancia.',
  },
  {
    question: '¿Necesito una orden para realizarme un estudio?',
    answer:
      'Depende del estudio y de la cobertura médica. Nuestro equipo puede orientarte antes de solicitar el turno.',
  },
  {
    question: '¿Trabajan con obras sociales?',
    answer:
      'Sí. Trabajamos con diferentes obras sociales. La cobertura depende de cada plan y prestación.',
  },
  {
    question: '¿Realizan estudios oftalmológicos?',
    answer:
      'Sí. Contamos con OCT, topografía corneal, paquimetría, biometría óptica y otros estudios complementarios.',
  },
  {
    question: '¿Realizan cirugías?',
    answer:
      'Realizamos evaluación y seguimiento de pacientes con indicación quirúrgica y diferentes procedimientos oftalmológicos.',
  },
  {
    question: '¿Cómo solicito un turno?',
    answer:
      'Podés comunicarte directamente con nuestro equipo mediante WhatsApp.',
  },
  {
    question: '¿Dónde están ubicados?',
    answer: 'Estamos en Rivadavia 490, Belén, Catamarca.',
  },
]

export const faqSection = {
  eyebrow: 'Consultas',
  title: 'Preguntas frecuentes',
  subtitle:
    'Si tu duda no está acá, escribinos por WhatsApp y te respondemos sin compromiso.',
} as const

// ─── Pie de página ────────────────────────────────────────────────────────────

export type SocialNetwork = 'instagram' | 'facebook' | 'whatsapp'

export interface SocialLink {
  network: SocialNetwork
  label: string
  href: string
}

export const footer = {
  tagline:
    'Cuidamos tu visión en cada etapa de la vida.',
  links: nav.links,
  social: [] as SocialLink[],
  // El año NO se calcula acá: content/site.ts lo importan componentes de
  // cliente, así que new Date() terminaría corriendo en el navegador y podría
  // no coincidir con el HTML del servidor. Lo resuelve el Footer.
  copyrightSuffix: `${site.name}. Todos los derechos reservados.`,
} as const
