export const nav = {
  ctaLabel: 'Solicitar turno',
  links: [
    { label: 'Inicio', href: '/' },
    {
      label: 'Servicios',
      href: '/#servicios',
      children: [
        { label: 'Estudios', href: '/estudios' },
        { label: 'Cirugías', href: '/cirugias' },
      ],
    },
    { label: 'Staff médico', href: '/#staff' },
    { label: 'Obras sociales', href: '/#obras-sociales' },
    { label: 'Nosotros', href: '/nosotros' },
    { label: 'Contacto', href: '/#contacto' },
  ],
} as const
