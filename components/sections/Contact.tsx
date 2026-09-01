import ContactForm from '@/components/shared/ContactForm'
import SectionWrapper from '@/components/shared/SectionWrapper'
import WhatsAppButton from '@/components/shared/WhatsAppButton'
import { contact, locations } from '@/content/site'

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
                Teléfonos
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
                <dd className="mt-2 space-y-2">
                  {locations.map((location) => (
                    <p key={location.id} className="text-brand-800">
                      {locations.length > 1 && (
                        <span className="font-semibold">{location.name}: </span>
                      )}
                      {location.street}, {location.city}
                    </p>
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
