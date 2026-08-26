import SectionWrapper from '@/components/shared/SectionWrapper'
import { showTestimonials, testimonials } from '@/content/landing'

export default function Testimonials() {
  if (!showTestimonials || testimonials.length === 0) {
    return null
  }

  return (
    <SectionWrapper className="py-24 bg-white">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold text-brand-900 mb-4">
          Lo que dicen nuestros clientes
        </h2>
      </div>

      <div
        className="flex overflow-x-auto gap-6 pb-4 snap-x snap-mandatory"
        style={{ scrollbarWidth: 'none' }}
        role="list"
        aria-label="Testimonios de clientes"
      >
        {testimonials.map((t) => (
          <blockquote
            key={t.name}
            className="flex-none w-80 snap-start bg-brand-50 rounded-xl p-6 border border-brand-100"
            role="listitem"
          >
            <p className="text-brand-800 text-base leading-relaxed mb-4">
              &ldquo;{t.quote}&rdquo;
            </p>
            <footer className="text-sm text-brand-600 font-semibold">
              {t.name} — {t.role}
            </footer>
          </blockquote>
        ))}
      </div>
    </SectionWrapper>
  )
}
