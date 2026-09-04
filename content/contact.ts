export const contact = {
  eyebrow: 'Contacto',
  heading: 'Estamos para ayudarte',
  subtext: 'Solicitá un turno por WhatsApp o dejanos tu consulta en el formulario.',
  phones: ['3804-100707'],
  email: null as string | null,
  whatsappLabel: 'Solicitar turno por WhatsApp',
  emergency: {
    label: 'Guardia 24 hs',
    badge: '24 hs',
    ariaLabel: 'Llamar a la guardia oftalmológica las 24 horas',
    contactNote: 'Urgencias oftalmológicas, las 24 horas.',
  },
  form: {
    nameLabel: 'Nombre y apellido',
    namePlaceholder: 'Tu nombre completo',
    emailLabel: 'Correo electrónico',
    emailPlaceholder: 'tunombre@correo.com',
    phoneLabel: 'Teléfono',
    phonePlaceholder: '3804 100707',
    messageLabel: 'Tu consulta',
    messagePlaceholder: '¿En qué podemos ayudarte?',
    submitLabel: 'Enviar consulta',
    submittingLabel: 'Enviando…',
    successTitle: '¡Consulta enviada!',
    successMessage: 'Te respondemos a la brevedad por correo o teléfono.',
    successAgainLabel: 'Enviar otra consulta',
    healthNotice:
      'No incluyas información médica ni resultados de estudios en este formulario. Para consultas sobre tu tratamiento, comunicate por teléfono o WhatsApp.',
    privacyNotice:
      'Tus datos se usan únicamente para responder esta consulta y no se almacenan en el sitio.',
  },
} as const
