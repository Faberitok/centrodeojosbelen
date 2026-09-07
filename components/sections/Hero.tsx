import Button from '@/components/shared/Button'
import { hero, locations, site } from '@/content/site'
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
      className="relative isolate flex min-h-[calc(100svh-4rem)] flex-col overflow-hidden bg-white md:min-h-[calc(92svh-5rem)] md:justify-center"
    >
      {/* Mobile: la foto abre el hero y se disuelve en blanco justo donde
          arranca el titular, sin bordes ni cortes: es una sola pieza. */}
      <div className="relative h-[clamp(6rem,calc(100svh_-_35rem),18rem)] shrink-0 md:hidden">
        {hero.image && (
          <Image
            src={hero.image}
            alt={hero.imageAlt}
            fill
            priority
            quality={100}
            sizes="100vw"
            className="object-cover object-[center_28%]"
          />
        )}
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-[58%] bg-gradient-to-b from-white/0 via-white/75 to-white"
          aria-hidden="true"
        />
      </div>

      {hero.image && (
        <Image
          src={hero.image}
          alt=""
          fill
          priority
          quality={100}
          sizes="100vw"
          className="hidden object-cover object-top md:block"
        />
      )}

      <div
        className="absolute inset-0 hidden bg-[radial-gradient(ellipse_80%_115%_at_8%_50%,#ffffff_0%,#ffffff_48%,rgba(255,255,255,0.92)_58%,rgba(255,255,255,0.45)_70%,rgba(255,255,255,0)_84%)] md:block"
        aria-hidden="true"
      />

      <div className="relative z-10 -mt-2 px-6 pb-8 md:mx-auto md:mt-0 md:w-full md:max-w-[1140px] md:px-6 md:pb-16 md:pt-20">
        <h1 className="max-w-[18ch] text-4xl font-extrabold leading-[1.12] tracking-[-0.035em] text-brand-800 md:max-w-[20ch] md:text-6xl md:leading-[1.08]">
          {hero.headline.split('\n').map((line, index) => (
            <span key={line}>
              {index > 0 && <br />}
              {line}
            </span>
          ))}
        </h1>
        <div
          className="mt-3 h-1.5 w-14 rounded-full bg-accent-500"
          aria-hidden="true"
        />

        <p className="mt-4 max-w-2xl text-base leading-[1.55] text-brand-800 md:mt-5 md:text-lg md:leading-relaxed">
          {hero.subtitle}
        </p>

        <div className="mt-6 flex w-3/4 flex-col gap-2.5 md:mt-7 md:w-auto md:flex-row md:flex-wrap">
          <Button
            href={primaryHref}
            external={primaryIsExternal}
            variant="accent"
            size="sm"
            className="box-border h-10 w-full !justify-between gap-1.5 whitespace-nowrap rounded-xl px-3.5 text-[0.8125rem] font-semibold text-white hover:bg-accent-600 md:w-auto md:gap-2 md:px-4 md:text-sm md:!justify-start"
          >
            <span className="inline-flex items-center gap-2">
              <CalendarIcon />
              {hero.ctaPrimary.label}
            </span>
            <ArrowIcon className="md:hidden" />
          </Button>
          <Button
            href={hero.ctaSecondary.href}
            variant="outline"
            size="sm"
            className="box-border h-10 w-full !justify-between whitespace-nowrap rounded-xl border-brand-800 bg-transparent px-3.5 text-left text-[0.8125rem] font-semibold text-brand-800 hover:bg-white md:w-auto md:px-4 md:text-sm"
          >
            <span className="inline-flex items-center gap-2">
              <BuildingIcon />
              {hero.ctaSecondary.label}
            </span>
            <ArrowIcon />
          </Button>
        </div>

        {mainLocation && (
          <p className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-brand-800 md:mt-8">
            <PinIcon />
            <span>
              {mainLocation.street}, {mainLocation.city}
            </span>
            <Link
              href="#ubicacion"
              className="font-semibold underline decoration-brand-300 underline-offset-4 hover:text-accent-700"
            >
              {hero.locationCta}
            </Link>
          </p>
        )}
        <svg
          className="pointer-events-none absolute left-1/2 top-full z-20 -mt-px h-[3.25rem] w-screen -translate-x-1/2 md:hidden"
          viewBox="0 0 100 32"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path fill="#ffffff" d="M0 0h100v8Q50 32 0 8Z" />
        </svg>
      </div>

      {/* Cierre: debajo del arco vuelve a aparecer la base de la foto. */}
      <div className="relative min-h-[5rem] flex-1 overflow-hidden md:hidden">
        {hero.image && (
          <Image
            src={hero.image}
            alt=""
            fill
            quality={100}
            sizes="100vw"
            className="object-cover object-bottom"
          />
        )}
      </div>

      <span className="sr-only">{site.description}</span>
    </section>
  )
}

function CalendarIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      className="h-4 w-4 shrink-0"
      aria-hidden="true"
    >
      <rect x="3.5" y="5" width="17" height="15" rx="2" strokeWidth="1.8" />
      <path d="M8 3v4M16 3v4M3.5 10h17" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  )
}

function BuildingIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      className="h-4 w-4 shrink-0"
      aria-hidden="true"
    >
      <path d="M5 20V6h14v14" strokeWidth="1.8" strokeLinejoin="round" />
      <path d="M9 20v-4h6v4" strokeWidth="1.8" strokeLinejoin="round" />
      <path d="M12 8.5v4M10 10.5h4" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  )
}

function ArrowIcon({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      className={`h-4 w-4 shrink-0 ${className}`}
      aria-hidden="true"
    >
      <path d="M5 12h14M13 6l6 6-6 6" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function PinIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4 shrink-0 text-brand-800"
      aria-hidden="true"
    >
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  )
}
