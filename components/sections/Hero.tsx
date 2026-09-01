import Button from '@/components/shared/Button'
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
      className="relative flex min-h-[calc(100svh-4rem)] items-center overflow-hidden bg-[#202055] md:min-h-[calc(92svh-5rem)]"
    >
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
            className="absolute inset-0 bg-[linear-gradient(90deg,rgba(32,32,85,0.92)_0%,rgba(32,32,85,0.78)_46%,rgba(32,32,85,0.32)_74%,rgba(32,32,85,0.08)_100%)]"
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

      <div className="relative z-10 mx-auto w-full max-w-[1140px] px-6 py-20 text-white md:py-28">
        <div className="max-w-[44rem]">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-accent-300">
            {hero.eyebrow}
          </p>

          <h1 className="mt-6 text-4xl font-extrabold leading-[1.05] tracking-[-0.035em] md:text-6xl lg:text-[4.5rem]">
            {hero.headline.split('\n').map((line, index) => (
              <span key={line}>
                {index > 0 && <br />}
                {line}
              </span>
            ))}
          </h1>

          <p className="mt-7 max-w-2xl text-lg leading-relaxed text-brand-100 md:text-xl">
            {hero.subtitle}
          </p>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Button
              href={primaryHref}
              external={primaryIsExternal}
              variant="accent"
              className="rounded-full px-7 py-4 text-base"
            >
              {hero.ctaPrimary.label}
            </Button>
            <Button
              href={hero.ctaSecondary.href}
              variant="onDark"
              className="rounded-full px-7 py-4 text-base"
            >
              {hero.ctaSecondary.label}
            </Button>
          </div>

          {mainLocation && (
            <p className="mt-10 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-brand-100">
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
                href="#ubicacion"
                className="inline-flex min-h-11 items-center font-semibold text-accent-300 underline underline-offset-4 hover:text-accent-200"
              >
                Ver ubicación
              </Link>
            </p>
          )}
        </div>
      </div>

      <div
        className="absolute -bottom-24 -right-24 h-72 w-72 rounded-full border-[46px] border-accent-500/25 md:h-96 md:w-96"
        aria-hidden="true"
      />
      <span className="sr-only">{site.description}</span>
    </section>
  )
}
