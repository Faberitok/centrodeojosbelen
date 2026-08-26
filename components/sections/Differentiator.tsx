import SectionWrapper from '@/components/shared/SectionWrapper'
import { differentiator } from '@/content/landing'

export default function Differentiator() {
  return (
    <SectionWrapper id="diferencial" className="py-24 bg-brand-50">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-brand-900 mb-6">
          {differentiator.title}
        </h2>
        <p className="text-lg text-brand-600 mb-12 leading-relaxed">{differentiator.intro}</p>

        <ul className="text-left space-y-5">
          {differentiator.benefits.map((benefit) => (
            <li key={benefit} className="flex items-start gap-3">
              <span
                className="mt-0.5 flex-shrink-0 w-5 h-5 rounded-full bg-brand-700 flex items-center justify-center"
                aria-hidden="true"
              >
                <svg
                  viewBox="0 0 12 12"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-3 h-3 text-white"
                >
                  <polyline points="2,6 5,9 10,3" />
                </svg>
              </span>
              <span className="text-base text-brand-800 leading-relaxed">{benefit}</span>
            </li>
          ))}
        </ul>
      </div>
    </SectionWrapper>
  )
}
