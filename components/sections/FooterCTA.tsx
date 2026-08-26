import WhatsAppButton from '@/components/shared/WhatsAppButton'
import { footerCta } from '@/content/landing'
import Link from 'next/link'

export default function FooterCTA() {
  return (
    <section className="bg-brand-900 py-24">
      <div className="max-w-[1140px] mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white mb-6 leading-tight tracking-tight">
          {footerCta.heading}
        </h2>
        <p className="text-brand-200 text-lg mb-10 max-w-2xl mx-auto leading-relaxed">
          {footerCta.subtext}
        </p>
        <div className="flex flex-wrap gap-4 justify-center items-center">
          <Link
            href="#contacto"
            className="inline-flex items-center px-8 py-4 bg-white text-brand-900 font-semibold rounded-md hover:bg-brand-50 active:bg-brand-100 transition-colors text-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-brand-900"
          >
            {footerCta.ctaLabel}
          </Link>
          <WhatsAppButton variant="inline" label={footerCta.whatsappLabel} />
        </div>
      </div>
    </section>
  )
}
