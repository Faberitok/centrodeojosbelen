import SectionWrapper from '@/components/shared/SectionWrapper'
import { about, brand, showTeam, team } from '@/content/site'
import Image from 'next/image'

export default function About() {
  return (
    <SectionWrapper id="nosotros" className="py-20 md:py-28 bg-brand-50">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16 lg:items-start">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-accent-600">
            {about.eyebrow}
          </p>
          <h2 className="mt-3 text-3xl md:text-4xl font-extrabold tracking-tight text-brand-900">
            {about.title}
          </h2>
          {about.paragraphs.map((paragraph) => (
            <p key={paragraph} className="mt-5 text-lg leading-relaxed text-brand-700">
              {paragraph}
            </p>
          ))}
        </div>

        <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {about.highlights.map((highlight) => (
            <li
              key={highlight.title}
              className="rounded-2xl border border-brand-200 bg-white p-6"
            >
              <h3 className="font-bold text-brand-900">{highlight.title}</h3>
              <p className="mt-1.5 text-[15px] leading-relaxed text-brand-700">
                {highlight.description}
              </p>
            </li>
          ))}
        </ul>
      </div>

      {showTeam && team.length > 0 && (
        <div className="mt-20">
          <h3 className="text-2xl font-bold text-brand-900">Equipo profesional</h3>
          <p className="mt-2 text-brand-700">
            Los profesionales que te acompañan en cada etapa del tratamiento.
          </p>

          <ul className="mt-8 grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
            {team.map((member) => (
              <li
                key={member.name}
                className="overflow-hidden rounded-2xl border border-brand-200 bg-white"
              >
                <div className="relative aspect-[4/5] bg-brand-100">
                  {member.photo ? (
                    <Image
                      src={member.photo}
                      alt={member.name}
                      fill
                      sizes="(min-width: 1024px) 260px, (min-width: 640px) 33vw, 50vw"
                      className="object-cover"
                    />
                  ) : (
                    /* Sin foto: se muestra el isotipo, no un avatar genérico */
                    <div className="flex h-full items-center justify-center bg-brand-100">
                      <Image
                        src={brand.isotypeLight}
                        alt=""
                        width={918}
                        height={667}
                        sizes="130px"
                        className="w-1/2 opacity-25"
                      />
                    </div>
                  )}
                </div>

                <div className="p-4">
                  <p className="font-bold leading-tight text-brand-900">{member.name}</p>
                  <p className="mt-1 text-sm leading-snug text-brand-700">{member.role}</p>
                  {member.license && (
                    <p className="mt-1.5 text-xs font-semibold text-brand-500">
                      {member.license}
                    </p>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </SectionWrapper>
  )
}
