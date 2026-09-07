import SectionWrapper from '@/components/shared/SectionWrapper'
import { locations, locationsSection, type Location } from '@/content/site'
import { branchWhatsappHref } from '@/lib/whatsapp'
import Link from 'next/link'

function PinIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-5 w-5 shrink-0 text-accent-600"
      aria-hidden="true"
    >
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  )
}

function PhoneIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-5 w-5 shrink-0 text-accent-600"
      aria-hidden="true"
    >
      <path d="M6.6 3.5h-2A1.5 1.5 0 0 0 3.1 5.2c.4 6.9 6 12.5 12.9 12.9a1.5 1.5 0 0 0 1.6-1.5v-2a1.5 1.5 0 0 0-1.2-1.5l-2.2-.4a1.5 1.5 0 0 0-1.5.6l-.6.9a11.4 11.4 0 0 1-4.4-4.4l.9-.6a1.5 1.5 0 0 0 .6-1.5l-.4-2.2a1.5 1.5 0 0 0-1.5-1.2Z" />
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

function ClockIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-5 w-5 shrink-0 text-accent-600"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.5V12l3 1.8" />
    </svg>
  )
}

function LocationCard({ location }: { location: Location }) {
  return (
    <article className="overflow-hidden rounded-[2rem] border border-brand-200 bg-white shadow-[0_20px_55px_-44px_rgba(16,16,48,0.38)]">
      <div className="grid grid-cols-1 lg:grid-cols-2">
        <div className="p-6 md:p-8">
          <h3 className="text-xl font-bold text-brand-900">{location.name}</h3>

          <ul className="mt-4 space-y-5">
            <li className="flex gap-3">
              <PinIcon />
              <div>
                <p className="text-sm font-bold uppercase tracking-wide text-brand-500">
                  Dirección
                </p>
                <p className="mt-1 leading-relaxed text-brand-800">
                  {location.street}
                  {location.venue ? (
                    <>
                      <br />
                      {location.venue}
                    </>
                  ) : null}
                  <br />
                  {location.city}
                  {location.postalCode ? ` (${location.postalCode})` : ''},{' '}
                  {location.province}
                </p>
              </div>
            </li>

            <li className="flex gap-3">
              <PhoneIcon />
              <div>
                <p className="text-sm font-bold uppercase tracking-wide text-brand-500">
                  Teléfonos
                </p>
                <ul className="mt-1">
                  {location.phones.map((phone) => (
                    <li key={phone}>
                      <a
                        href={`tel:${phone.replace(/[^\d+]/g, '')}`}
                        className="inline-flex min-h-11 items-center rounded font-semibold text-accent-700 underline underline-offset-4 hover:text-accent-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-600"
                      >
                        {phone}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </li>

            <li className="flex gap-3">
              <ClockIcon />
              <div className="min-w-0">
                <p className="text-sm font-bold uppercase tracking-wide text-brand-500">
                  Horarios de atención
                </p>
                {location.hours.length > 0 ? (
                  <dl className="mt-1 space-y-1">
                    {location.hours.map((slot) => (
                      <div
                        key={slot.days}
                        className="flex flex-wrap items-baseline gap-x-2"
                      >
                        <dt className="font-semibold text-brand-900">{slot.days}</dt>
                        <dd className="text-brand-700">{slot.hours}</dd>
                      </div>
                    ))}
                  </dl>
                ) : (
                  <p className="mt-1 text-brand-700">{locationsSection.hoursPending}</p>
                )}
              </div>
            </li>
          </ul>

          <div className="mt-7 flex flex-wrap items-center gap-2">
            <a
              href={location.mapDirectionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-10 cursor-pointer items-center gap-2 rounded-xl bg-accent-500 px-4 text-sm font-semibold text-white transition-colors hover:bg-accent-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-700 focus-visible:ring-offset-2"
            >
              {locationsSection.directionsLabel}
              <svg
                viewBox="0 0 20 20"
                fill="currentColor"
                className="h-4 w-4"
                aria-hidden="true"
              >
                <path d="M11 3a1 1 0 1 0 0 2h2.59l-7.3 7.29a1 1 0 1 0 1.42 1.42L15 6.41V9a1 1 0 1 0 2 0V4a1 1 0 0 0-1-1h-5Z" />
                <path d="M5 5a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-3a1 1 0 1 0-2 0v3H5V7h3a1 1 0 0 0 0-2H5Z" />
              </svg>
            </a>
            {location.whatsapp && (
              <a
                href={branchWhatsappHref(location.whatsapp)}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Turnos por WhatsApp en ${location.name}`}
                className="inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-xl bg-[#25D366] text-white transition-colors hover:bg-[#1ebe5d] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-700 focus-visible:ring-offset-2"
              >
                <WhatsAppIcon />
              </a>
            )}
          </div>
        </div>

        {/* El iframe de Maps no requiere API key ni costo. lazy para no
            penalizar el LCP: es el elemento más pesado de la página. */}
        <div className="relative min-h-[280px] bg-brand-100 lg:min-h-full">
          <iframe
            src={location.mapEmbedUrl}
            title={`Mapa — ${location.name}`}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
            className="absolute inset-0 h-full w-full border-0"
          />
        </div>
      </div>
    </article>
  )
}

export default function Locations() {
  const featured = locations.filter((location) => location.featured)
  const alsoAt = locations.filter((location) => !location.featured)

  return (
    <SectionWrapper id="ubicacion" className="bg-white py-14 md:py-20">
      <div className="max-w-2xl">
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-accent-700">
          {locationsSection.eyebrow}
        </p>
        <h2 className="mt-3 text-3xl md:text-4xl font-extrabold tracking-tight text-brand-900">
          {locationsSection.title}
        </h2>
        <p className="mt-4 text-lg leading-relaxed text-brand-700">
          {locationsSection.subtitle}
        </p>
      </div>

      <div className="mt-12 space-y-6">
        {featured.map((location) => (
          <LocationCard key={location.id} location={location} />
        ))}
      </div>

      {alsoAt.length > 0 && (
        <div className="mt-10 rounded-[1.75rem] border border-brand-200 bg-brand-50 p-6 md:p-8">
          <p className="text-sm font-bold uppercase tracking-[0.14em] text-accent-700">
            {locationsSection.alsoAtLabel}
          </p>
          <ul className="mt-5 grid gap-4 sm:grid-cols-2">
            {alsoAt.map((location) => (
              <li key={location.id}>
                <div className="rounded-2xl border border-brand-100 bg-white p-5">
                  <p className="text-lg font-extrabold text-brand-800">{location.name}</p>
                  <p className="mt-1 text-sm leading-relaxed text-brand-700">
                    {location.street}
                    {location.venue ? ` · ${location.venue}` : ''}
                    {`, ${location.city}`}
                  </p>
                  <div className="mt-3 flex items-center gap-2">
                    <Link
                      href={locationsSection.branchesHref}
                      className="inline-flex items-center text-sm font-semibold text-accent-700 hover:text-accent-800"
                    >
                      {locationsSection.branchesLinkLabel} →
                    </Link>
                    {location.whatsapp && (
                      <a
                        href={branchWhatsappHref(location.whatsapp)}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Turnos por WhatsApp en ${location.name}`}
                        className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-[#25D366] hover:bg-brand-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-600"
                      >
                        <WhatsAppIcon />
                      </a>
                    )}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </SectionWrapper>
  )
}
