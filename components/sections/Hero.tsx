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
      className="relative isolate flex min-h-[calc(100svh-4rem)] flex-col justify-end overflow-hidden bg-white md:min-h-[calc(92svh-5rem)] md:justify-center"
    >
      {hero.image && (
        <Image
          src={hero.image}
          alt={hero.imageAlt}
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
      )}

      <div
        className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0)_0%,rgba(255,255,255,0.28)_38%,rgba(255,255,255,0.82)_72%,#ffffff_100%)] md:bg-[linear-gradient(90deg,#ffffff_0%,rgba(255,255,255,0.94)_32%,rgba(255,255,255,0.55)_58%,rgba(255,255,255,0)_86%)]"
        aria-hidden="true"
      />

      <div className="relative z-10 w-full">
        <div className="mx-auto w-full max-w-[1140px] px-6 pb-8 pt-24 md:pb-16 md:pt-20">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand-800">
            {hero.eyebrow}
          </p>

          <h1 className="mt-4 max-w-[18ch] text-4xl font-extrabold leading-[1.08] tracking-[-0.035em] text-brand-800 md:max-w-none md:text-6xl">
            {hero.headline.split('\n').map((line, index) => (
              <span key={line}>
                {index > 0 && <br />}
                {line}
              </span>
            ))}
          </h1>

          <p className="mt-5 max-w-2xl text-base leading-relaxed text-brand-800 md:text-lg">
            {hero.subtitle}
          </p>

          <div className="mt-7 flex flex-col gap-3 md:flex-row md:flex-wrap">
            <Button
              href={primaryHref}
              external={primaryIsExternal}
              variant="accent"
              className="w-full rounded-xl px-6 py-3.5 text-white hover:bg-accent-600 md:w-auto"
            >
              {hero.ctaPrimary.label}
            </Button>
            <Button
              href={hero.ctaSecondary.href}
              variant="outline"
              className="w-full rounded-xl border-brand-800 bg-white/70 px-6 py-3.5 text-brand-800 hover:bg-white md:w-auto"
            >
              {hero.ctaSecondary.label}
            </Button>
          </div>

          {mainLocation && (
            <p className="mt-8 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-brand-800">
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
        </div>
      </div>

      <span className="sr-only">{site.description}</span>
    </section>
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
