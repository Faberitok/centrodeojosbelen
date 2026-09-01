import SectionWrapper from '@/components/shared/SectionWrapper'
import { branchesSection, locations, locationsSection } from '@/content/site'
import Image from 'next/image'

export default function Branches() {
  return (
    <SectionWrapper id="sucursales" className="bg-brand-50 py-14 md:py-20">
      <div className="max-w-2xl">
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-accent-700">
          {branchesSection.eyebrow}
        </p>
        <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-brand-900 md:text-4xl">
          {branchesSection.title}
        </h2>
        <p className="mt-4 text-lg leading-relaxed text-brand-700">
          {branchesSection.subtitle}
        </p>
      </div>

      <ul className="mt-12 grid gap-6 md:grid-cols-3">
        {locations.map((location) => (
          <li key={location.id}>
            <article className="flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-brand-200 bg-white shadow-[0_20px_55px_-44px_rgba(16,16,48,0.38)]">
              <div className="relative aspect-[4/3] bg-brand-100">
                <Image
                  src={location.image}
                  alt={location.imageAlt}
                  fill
                  sizes="(min-width: 768px) 33vw, 100vw"
                  className="object-cover"
                />
              </div>
              <div className="flex flex-1 flex-col p-6">
                <h3 className="text-2xl font-extrabold text-brand-800">{location.name}</h3>
                <p className="mt-2 leading-relaxed text-brand-700">
                  {location.street}
                  <br />
                  {location.city}, {location.province}
                </p>
                <a
                  href={location.mapDirectionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-auto inline-flex w-fit cursor-pointer pt-5 text-sm font-semibold text-accent-700 hover:text-accent-800"
                >
                  {locationsSection.directionsLabel} →
                </a>
              </div>
            </article>
          </li>
        ))}
      </ul>
    </SectionWrapper>
  )
}
