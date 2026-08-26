import { hero } from '@/content/landing'
import Image from 'next/image'
import Link from 'next/link'

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-brand-900 overflow-hidden">
      {/* Background photo */}
      <Image
        src="/images/hero-desktop.webp"
        alt=""
        fill
        className="object-cover object-center"
        priority
        sizes="100vw"
      />

      {/* Blue gradient overlay with transparency — sits on top of the photo */}
      <div
        className="absolute inset-0 bg-gradient-to-br from-brand-900 via-brand-800 to-brand-700 opacity-80"
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-[1140px] mx-auto px-6 py-24 text-white">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-5xl lg:text-[52px] font-extrabold leading-tight mb-6 tracking-tight">
            {hero.headline.split('\n').map((line, i) => (
              <span key={i}>
                {i > 0 && <br />}
                {line}
              </span>
            ))}
          </h1>

          <p className="text-lg md:text-xl font-medium text-brand-100 mb-10 max-w-2xl leading-relaxed">
            {hero.subtitle}
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap gap-4 mb-12">
            <Link
              href={hero.ctaPrimary.href}
              className="inline-flex items-center px-7 py-3.5 bg-white text-brand-900 font-semibold rounded-md hover:bg-brand-50 active:bg-brand-100 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-brand-900 text-base"
            >
              {hero.ctaPrimary.label}
            </Link>
            <Link
              href={hero.ctaSecondary.href}
              className="inline-flex items-center px-7 py-3.5 border border-white/70 text-white font-semibold rounded-md hover:bg-white/10 active:bg-white/20 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-brand-900 text-base"
            >
              {hero.ctaSecondary.label}
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
