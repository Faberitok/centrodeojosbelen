import { brand, hero, locations, site } from '@/content/site'
import { appointmentHref } from '@/lib/whatsapp'
import Image from 'next/image'
import Link from 'next/link'

export default function Hero() {
  const primaryHref =
    hero.ctaPrimary.href === 'whatsapp' ? appointmentHref() : hero.ctaPrimary.href
  const primaryIsExternal = primaryHref.startsWith('http')
  const mainLocation = locations[0]

  return (
    <section
      id="inicio"
      className="relative flex min-h-[calc(100svh-4rem)] md:min-h-[calc(88svh-5rem)] items-center overflow-hidden bg-brand-900"
    >
      {/* Foto del centro cuando esté disponible; hasta entonces, composición de marca */}
      {hero.image ? (
        <>
          <Image
            src={hero.image}
            alt={hero.imageAlt}
            fill
            className="object-cover object-center"
            priority
            sizes="100vw"
          />
          <div
            className="absolute inset-0 bg-gradient-to-r from-brand-900 via-brand-900/90 to-brand-900/60"
            aria-hidden="true"
          />
        </>
      ) : (
        <div className="absolute inset-0" aria-hidden="true">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_25%,#2C3260_0%,transparent_45%),radial-gradient(circle_at_85%_15%,rgba(33,159,192,0.35)_0%,transparent_45%),linear-gradient(160deg,#202055_0%,#14143A_100%)]" />
          {/* Isotipo como marca de agua, recortado por el borde derecho */}
          <Image
            src={brand.isotypeDark}
            alt=""
            width={824}
            height={602}
            sizes="(min-width: 768px) 62vw, 0px"
            className="absolute -right-[12%] top-1/2 hidden w-[62%] -translate-y-1/2 opacity-[0.07] md:block"
            priority
          />
        </div>
      )}

      <div className="relative z-10 mx-auto w-full max-w-[1140px] px-6 py-20 md:py-24 text-white">
        <div className="max-w-2xl">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-accent-300">
            {hero.eyebrow}
          </p>

          <h1 className="mt-6 text-4xl font-extrabold leading-[1.1] tracking-tight md:text-5xl lg:text-[3.4rem]">
            {hero.headline.split('\n').map((line, index) => (
              <span key={line}>
                {index > 0 && <br />}
                {line}
              </span>
            ))}
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-relaxed text-brand-200">
            {hero.subtitle}
          </p>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <a
              href={primaryHref}
              {...(primaryIsExternal
                ? { target: '_blank', rel: 'noopener noreferrer' }
                : {})}
              className="inline-flex items-center justify-center rounded-lg bg-accent-500 px-7 py-4 text-base font-bold text-brand-950 transition-colors hover:bg-accent-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-brand-900"
            >
              {hero.ctaPrimary.label}
            </a>
            <Link
              href={hero.ctaSecondary.href}
              className="inline-flex items-center justify-center rounded-lg border border-white/50 px-7 py-4 text-base font-semibold text-white transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-brand-900"
            >
              {hero.ctaSecondary.label}
            </Link>
          </div>

          {mainLocation && (
            <p className="mt-10 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-brand-300">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4 shrink-0 text-accent-400"
                aria-hidden="true"
              >
                <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              {mainLocation.street}, {mainLocation.city}
              <span className="text-brand-500" aria-hidden="true">
                ·
              </span>
              <Link
                href="#sedes"
                className="inline-flex min-h-11 items-center font-semibold text-accent-300 underline underline-offset-4 hover:text-accent-200"
              >
                Ver horarios de atención
              </Link>
            </p>
          )}
        </div>
      </div>

      <span className="sr-only">{site.description}</span>
    </section>
  )
}
