import { contact, faq, locations, site } from '@/content/site'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim() || 'http://localhost:3000'

/**
 * Schema.org MedicalClinic para cada sede.
 *
 * Es la pieza de SEO local con más peso para un consultorio: alimenta el panel
 * de conocimiento de Google, el horario en los resultados de búsqueda y las
 * consultas del tipo "oftalmólogo cerca mío".
 *
 * Se arma desde content/site.ts para que el sitio, el schema y el chatbot
 * hablen de la misma fuente (kick-off §5).
 */
export function buildClinicJsonLd() {
  const nodes = locations.map((location) => ({
    '@context': 'https://schema.org',
    '@type': 'MedicalClinic',
    '@id': `${siteUrl}/#${location.id}`,
    name: locations.length > 1 ? `${site.name} — ${location.name}` : site.name,
    description: site.description,
    url: siteUrl,
    image: `${siteUrl}/opengraph-image`,
    medicalSpecialty: 'Ophthalmologic',
    ...(contact.email ? { email: contact.email } : {}),
    telephone: location.phones,
    address: {
      '@type': 'PostalAddress',
      streetAddress: location.street,
      addressLocality: location.city,
      addressRegion: location.province,
      postalCode: location.postalCode,
      addressCountry: site.country,
    },
    ...(location.geo
      ? {
          geo: {
            '@type': 'GeoCoordinates',
            latitude: location.geo.lat,
            longitude: location.geo.lng,
          },
        }
      : {}),
    ...(location.hours.length > 0
      ? {
          openingHoursSpecification: location.hours.map((slot) => ({
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: slot.schemaDays,
            opens: slot.schemaOpens,
            closes: slot.schemaCloses,
          })),
        }
      : {}),
  }))

  return nodes.length === 1 ? nodes[0] : nodes
}

/**
 * Schema.org FAQPage.
 *
 * Google puede mostrar estas preguntas desplegables directamente en los
 * resultados de búsqueda, lo que ocupa más espacio y responde la duda antes
 * de que el paciente entre al sitio.
 */
export function buildFaqJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    '@id': `${siteUrl}/#faq`,
    mainEntity: faq.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  }
}
