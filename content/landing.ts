// content/landing.ts
// Single source of truth for all page copy and feature flags.
// No copy should be hardcoded in component JSX.

export const nav = {
  brandName: 'FaberIT',
  logoSrc: '/images/logo.png',   // coloca el archivo en public/images/ y actualiza esta ruta
  ctaLabel: 'Hablá con nosotros',
  links: [
    { label: 'Servicios', href: '#servicios' },
    { label: 'Cómo trabajamos', href: '#proceso' },
    { label: 'Productos', href: '#productos' },
    { label: 'Contacto', href: '#contacto' },
  ],
} as const

export const hero = {
  headline: 'Contanos tu problema.\nNosotros construimos la solución.',
  subtitle:
    'En FaberIT desarrollamos herramientas digitales para procesos reales.',
  ctaPrimary: { label: 'Agendar reunión', href: '#contacto' },
  ctaSecondary: { label: 'Cómo trabajamos', href: '#proceso' },
} as const

export const services = [
  {
    id: 'desarrollo-medida',
    title: 'Desarrollo a Medida',
    description:
      'Aplicaciones web, sistemas internos y plataformas digitales construidas específicamente para tu negocio.',
    features: [
      'Portales web y plataformas digitales',
      'Sistemas internos y paneles de gestión',
      'APIs REST e integraciones con terceros',
      'Arquitectura escalable desde el inicio',
    ],
  },
  {
    id: 'apps-moviles',
    title: 'Apps Móviles',
    description:
      'Aplicaciones nativas e híbridas para iOS y Android, pensadas para la experiencia real de tus usuarios.',
    features: [
      'Desarrollo nativo (Swift, Kotlin) e híbrido',
      'React Native y Expo para multiplaforma',
      'Push notifications e integraciones de dispositivo',
      'Publicación en App Store y Google Play',
    ],
  },
  {
    id: 'e-commerce',
    title: 'E-commerce',
    description:
      'Tiendas online diseñadas para vender, gestionar y escalar. Desde el catálogo hasta el cobro, todo en un solo lugar.',
    features: [
      'Tiendas custom, Tiendanube o Shopify',
      'Pasarelas de pago locales e internacionales',
      'Panel de gestión de productos y pedidos',
      'Integraciones logísticas y de inventario',
    ],
  },
  {
    id: 'automatizaciones',
    title: 'Automatizaciones',
    description:
      'Eliminamos tareas repetitivas integrando tus herramientas y construyendo flujos automáticos que ahorran tiempo y errores.',
    features: [
      'Integraciones entre herramientas existentes',
      'Bots y workflows automáticos',
      'Procesamiento y transformación de datos',
      'Reporting y alertas automatizadas',
    ],
  },
  {
    id: 'soluciones-ia',
    title: 'Soluciones con IA',
    description:
      'Modelos de lenguaje, procesamiento de datos y agentes inteligentes integrados directamente en tus procesos.',
    features: [
      'Chatbots y asistentes con LLM (GPT, Claude)',
      'Análisis predictivo sobre tus datos',
      'Procesamiento automático de documentos',
      'Agentes autónomos para flujos complejos',
    ],
  },
  {
    id: 'consultoria',
    title: 'Consultoría Tecnológica',
    description:
      'Diagnóstico, arquitectura y hoja de ruta para equipos que necesitan dirección técnica clara.',
    features: [
      'Auditoría de sistemas y deuda técnica',
      'Diseño de arquitectura de soluciones',
      'Elección y evaluación de stack tecnológico',
      'Roadmap técnico y priorización de producto',
    ],
  },
] as const

export const differentiator = {
  title: 'No trabajamos como una consultora tradicional.',
  intro:
    'Somos un equipo directo y comprometido. Cada proyecto es una sociedad, no un contrato.',
  benefits: [
    'Trato directo durante todo el proceso — sin intermediarios ni capas de gestión.',
    'Comunicación transparente en cada etapa del proyecto.',
    'Enfoque y diseño al rededor del problema real.',
    'Entregamos resultados medibles, no presentaciones.',
    'Trabajamos remoto o presencial según lo que necesite tu proyecto — nos adaptamos a vos.',
  ],
} as const

export const processSteps = [
  {
    number: 1,
    title: 'Primera reunión gratuita',
    description:
      'Escuchamos tu problema y te guiamos sobre las opciones disponibles según lo que necesites.',
    isFree: true,
  },
  {
    number: 2,
    title: 'Propuesta técnica',
    description:
      'Elaboramos un presupuesto tentativo y una idea inicial del proyecto.',
    isFree: false,
  },
  {
    number: 3,
    title: 'Desarrollo iterativo',
    description:
      'Construimos en ciclos cortos. Vos participás, validás y priorizás.',
    isFree: false,
  },
  {
    number: 4,
    title: 'Entrega y soporte',
    description:
      'Lanzamos el proyecto y te brindamos soporte para asegurar su correcto funcionamiento y continuidad.',
    isFree: false,
  },
] as const

export interface SolutionChip {
  label: string
  description: string
  prefillMessage: string
}

export const solutionChips: SolutionChip[] = [
  {
    label: 'Plataformas web',
    description: 'Portales y sistemas web modernos.',
    prefillMessage: 'Hola, me interesan las plataformas web.',
  },
  {
    label: 'Sistemas internos',
    description: 'Herramientas para centralizar y mejorar operaciones.',
    prefillMessage: 'Hola, me interesan los sistemas internos.',
  },
  {
    label: 'Automatizaciones',
    description: 'Flujos automáticos de tareas manuales.',
    prefillMessage: 'Hola, me interesan las automatizaciones.',
  },
  {
    label: 'Integraciones',
    description: 'Conectamos tus plataformas para que la información fluya.',
    prefillMessage: 'Hola, me interesan las integraciones.',
  },
  {
    label: 'Control de stock',
    description: 'Visibilidad en tiempo real del inventario y alertas.',
    prefillMessage: 'Hola, me interesa el control de stock.',
  },
  {
    label: 'Gestión de procesos',
    description: 'Digitalización de procesos clave con seguimiento y trazabilidad.',
    prefillMessage: 'Hola, me interesa la gestión de procesos.',
  },
  {
    label: 'Dashboards operativos',
    description: 'Tableros claros con indicadores clave para controlar el negocio en minutos.',
    prefillMessage: 'Hola, me interesan los dashboards operativos.',
  },
  {
    label: 'E-commerce',
    description: 'Tiendas online enfocadas en conversión, gestión simple y escalabilidad.',
    prefillMessage: 'Hola, me interesa implementar un e-commerce.',
  },
  {
    label: 'Turneros',
    description: 'Sistemas de turnos online para ordenar agenda, demanda y atención.',
    prefillMessage: 'Hola, me interesan los turneros.',
  },
  {
    label: 'Apps móviles',
    description: 'Aplicaciones para iOS y Android diseñadas para una experiencia real de uso.',
    prefillMessage: 'Hola, me interesan las apps móviles.',
  },
  {
    label: 'Chatbots',
    description: 'Asistentes conversacionales para atención, ventas y soporte 24/7.',
    prefillMessage: 'Hola, me interesa implementar un chatbot.',
  },
  {
    label: 'Soluciones con IA',
    description: 'Modelos y agentes de IA aplicados a problemas concretos del negocio.',
    prefillMessage: 'Hola, me interesan las soluciones con IA.',
  },
  {
    label: 'Portales internos',
    description: 'Espacios internos para equipos, documentación y flujos de trabajo colaborativos.',
    prefillMessage: 'Hola, me interesan los portales internos.',
  },
  {
    label: 'Herramientas administrativas',
    description: 'Sistemas para administrar operaciones, clientes, cobros y procesos diarios.',
    prefillMessage: 'Hola, me interesan las herramientas administrativas.',
  },
  {
    label: 'Sitios institucionales',
    description: 'Sitios corporativos claros y profesionales que comunican confianza.',
    prefillMessage: 'Hola, me interesan los sitios institucionales.',
  },
  {
    label: 'Soluciones a medida',
    description: 'Desarrollo personalizado según tus objetivos, contexto y ritmo de crecimiento.',
    prefillMessage: 'Hola, me interesan las soluciones a medida.',
  },
  {
    label: 'Asesoramiento',
    description: 'Acompañamiento técnico para definir prioridades, arquitectura y hoja de ruta.',
    prefillMessage: 'Hola, me interesa recibir asesoramiento.',
  },
]

export interface Testimonial {
  quote: string
  name: string
  role: string
}

export const testimonials: Testimonial[] = []
export const showTestimonials = false

export interface ClientLogo {
  name: string
  src: string
  alt: string
}

export const clientLogos: ClientLogo[] = []
export const showClientLogos = false

export const footerCta = {
  heading: '¿Tenés algo que querés resolver?',
  subtext:
    'No necesitás tener la solución pensada. Contanos el problema y te ayudamos a encontrar el camino.',
  ctaLabel: 'Escribinos ahora',
  whatsappLabel: 'WhatsApp directo',
} as const

export const contact = {
  heading: 'Hablemos',
  subtext: 'Completá el formulario y te respondemos en menos de 24 horas.',
} as const

export const footer = {
  brandName: 'FaberIT',
  tagline: 'Desarrollamos herramientas digitales para procesos reales.',
  location: 'Catamarca, Argentina.',
  email: 'contacto@faberit.com.ar',
  phones: [
    '+54 9 351 808-2572',
    '+54 9 351 381-2862',
  ],
  links: [
    { label: 'Servicios', href: '#servicios' },
    { label: 'Cómo trabajamos', href: '#proceso' },
    { label: 'Productos', href: '#productos' },
    { label: 'Contacto', href: '#contacto' },
  ],
  social: [
    { label: 'LinkedIn', href: 'https://linkedin.com/company/faberit' },
    { label: 'Instagram', href: 'https://instagram.com/faberit_' },
  ],
  motto: 'Faber est suae quisque fortunae.',
  copyright: `© ${new Date().getFullYear()} FaberIT. Todos los derechos reservados.`,
} as const
