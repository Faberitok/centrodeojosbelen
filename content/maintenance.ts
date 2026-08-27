// content/maintenance.ts
// Textos de la página en construcción.
//
// Separado de content/site.ts por la misma razón que content/brand.ts: este
// archivo lo importa un componente de cliente, y todo lo que esté en el mismo
// módulo viaja al navegador. Mientras el sitio está cerrado, el contenido
// institucional no tiene por qué llegar ahí.

export const maintenance = {
  badge: 'Sitio en preparación',
  title: 'Estamos trabajando en nuestro sitio',
  message:
    'Muy pronto vas a poder conocer acá nuestros servicios, obras sociales y horarios de atención. Mientras tanto, podés comunicarte con nosotros por WhatsApp.',
  whatsappLabel: 'Escribinos por WhatsApp',
  whatsappMessage: 'Hola, quisiera hacer una consulta.',
  teamAccessLabel: 'Acceso para el equipo',
  userLabel: 'Usuario',
  userPlaceholder: 'Ingresá tu usuario',
  passwordLabel: 'Contraseña',
  passwordPlaceholder: 'Ingresá la contraseña',
  submitLabel: 'Ingresar',
  submittingLabel: 'Validando…',
} as const
