import SectionWrapper from '@/components/shared/SectionWrapper'
import { locations, locationsSection, type Location } from '@/content/site'

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
    <article className="overflow-hidden rounded-2xl border border-brand-200 bg-white">
      <div className="grid grid-cols-1 lg:grid-cols-2">
        <div className="p-6 md:p-8">
          {locations.length > 1 && (
            <h3 className="text-xl font-bold text-brand-900">{location.name}</h3>
          )}

          <ul className="mt-4 space-y-5">
            <li className="flex gap-3">
              <PinIcon />
              <div>
                <p className="text-sm font-bold uppercase tracking-wide text-brand-500">
                  Dirección
                </p>
                <p className="mt-1 leading-relaxed text-brand-800">
                  {location.street}
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

          <a
            href={location.mapDirectionsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-7 inline-flex items-center gap-2 rounded-lg bg-brand-900 px-6 py-3.5 font-semibold text-white transition-colors hover:bg-brand-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-900 focus-visible:ring-offset-2"
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
  return (
    <SectionWrapper id="ubicacion" className="bg-brand-50 py-20 md:py-28">
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
        {locations.map((location) => (
          <LocationCard key={location.id} location={location} />
        ))}
      </div>
    </SectionWrapper>
  )
}
