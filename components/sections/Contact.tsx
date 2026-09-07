import ContactForm from '@/components/shared/ContactForm'
import SectionWrapper from '@/components/shared/SectionWrapper'
import WhatsAppButton from '@/components/shared/WhatsAppButton'
import { contact, locations, locationsSection } from '@/content/site'
import { branchWhatsappHref } from '@/lib/whatsapp'
import Link from 'next/link'

function GoIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5" aria-hidden="true">
      <path d="M11 3a1 1 0 1 0 0 2h2.59l-7.3 7.29a1 1 0 1 0 1.42 1.42L15 6.41V9a1 1 0 1 0 2 0V4a1 1 0 0 0-1-1h-5Z" />
      <path d="M5 5a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-3a1 1 0 1 0-2 0v3H5V7h3a1 1 0 0 0 0-2H5Z" />
    </svg>
  )
}

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  )
}

export default function Contact() {
  return (
    <SectionWrapper id="contacto" className="bg-white py-14 md:py-20">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_1.15fr] lg:gap-16">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-accent-700">
            {contact.eyebrow}
          </p>
          <h2 className="mt-3 text-3xl md:text-4xl font-extrabold tracking-tight text-brand-900">
            {contact.heading}
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-brand-700">{contact.subtext}</p>

          <div className="mt-8">
            <WhatsAppButton variant="inline" label={contact.whatsappLabel} />
          </div>

          <dl className="mt-10 space-y-6 border-t border-brand-200 pt-8">
            <div>
              <dt className="text-sm font-bold uppercase tracking-wide text-brand-500">
                {contact.emergency.label}
              </dt>
              <dd className="mt-1">
                {contact.phones.map((phone) => (
                  <a
                    key={phone}
                    href={`tel:${phone.replace(/[^\d+]/g, '')}`}
                    className="inline-flex min-h-11 items-center text-lg font-semibold text-accent-700 underline underline-offset-4 hover:text-accent-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-600 rounded"
                  >
                    {phone}
                  </a>
                ))}
                <p className="mt-1 text-sm text-brand-600">{contact.emergency.contactNote}</p>
              </dd>
            </div>

            {contact.email && (
              <div>
                <dt className="text-sm font-bold uppercase tracking-wide text-brand-500">
                  Correo
                </dt>
                <dd className="mt-2">
                  <a
                    href={`mailto:${contact.email}`}
                    className="inline-flex min-h-11 items-center break-all rounded text-lg font-semibold text-accent-700 underline underline-offset-4 hover:text-accent-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-600"
                  >
                    {contact.email}
                  </a>
                </dd>
              </div>
            )}

            {locations.length > 0 && (
              <div>
                <dt className="text-sm font-bold uppercase tracking-wide text-brand-500">
                  {locations.length > 1 ? 'Sedes' : 'Dirección'}
                </dt>
                <dd className="mt-2 space-y-3">
                  {locations.map((location) => (
                    <div
                      key={location.id}
                      className="flex items-start justify-between gap-3"
                    >
                      <p className="text-brand-800">
                        {locations.length > 1 && (
                          <span className="font-semibold">{location.name}: </span>
                        )}
                        {location.street}
                        {location.venue ? `, ${location.venue}` : ''}, {location.city}
                      </p>
                      {!location.featured && (
                        <span className="flex shrink-0 items-center gap-1">
                          {location.whatsapp && (
                            <a
                              href={branchWhatsappHref(location.whatsapp)}
                              target="_blank"
                              rel="noopener noreferrer"
                              aria-label={`Turnos por WhatsApp en ${location.name}`}
                              className="inline-flex h-11 w-11 items-center justify-center rounded-lg text-accent-700 hover:bg-brand-50 hover:text-accent-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-600"
                            >
                              <WhatsAppIcon />
                            </a>
                          )}
                          <Link
                            href={locationsSection.branchesHref}
                            aria-label={`Ver ${location.name} en sucursales`}
                            className="inline-flex h-11 w-11 items-center justify-center rounded-lg text-accent-700 hover:bg-brand-50 hover:text-accent-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-600"
                          >
                            <GoIcon />
                          </Link>
                        </span>
                      )}
                    </div>
                  ))}
                </dd>
              </div>
            )}
          </dl>
        </div>

        <div className="rounded-[2rem] border border-brand-200 bg-white p-6 shadow-[0_24px_70px_-48px_rgba(7,7,18,0.55)] md:p-8">
          <ContactForm />
        </div>
      </div>
    </SectionWrapper>
  )
}
