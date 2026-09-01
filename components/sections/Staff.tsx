'use client'

import { brand, team } from '@/content/site'
import Image from 'next/image'
import { useRef } from 'react'

export default function Staff() {
  const trackRef = useRef<HTMLUListElement>(null)

  function move(direction: -1 | 1) {
    const track = trackRef.current
    if (!track) return
    track.scrollBy({
      left: direction * Math.min(track.clientWidth * 0.9, 640),
      behavior: 'smooth',
    })
  }

  return (
    <section id="staff" className="bg-brand-50 py-20 md:py-28">
      <div className="mx-auto max-w-[1140px] px-6">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-xl">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-accent-700">
              Nuestro staff
            </p>
            <h2 className="mt-3 text-3xl font-extrabold leading-tight tracking-tight text-brand-800 md:text-4xl">
              Profesionales que acompañan
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-brand-700">
              Experiencia, formación continua y una atención cercana para bebés, niños y
              adultos.
            </p>
          </div>
          <div className="flex gap-2 md:hidden">
            <button
              type="button"
              onClick={() => move(-1)}
              aria-label="Ver profesional anterior"
              className="inline-flex h-12 w-12 cursor-pointer items-center justify-center rounded-full border border-brand-200 bg-white text-brand-800 transition hover:border-accent-400 hover:bg-accent-50"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="h-5 w-5" aria-hidden="true">
                <path d="m15 18-6-6 6-6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <button
              type="button"
              onClick={() => move(1)}
              aria-label="Ver profesional siguiente"
              className="inline-flex h-12 w-12 cursor-pointer items-center justify-center rounded-full border border-brand-200 bg-white text-brand-800 transition hover:border-accent-400 hover:bg-accent-50"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="h-5 w-5" aria-hidden="true">
                <path d="m9 18 6-6-6-6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </div>

        <ul
          ref={trackRef}
          aria-label="Staff médico"
          className="staff-track mt-10 flex snap-x snap-mandatory gap-5 overflow-x-auto md:grid md:grid-cols-2 md:overflow-visible"
        >
          {team.map((member) => (
            <li
              key={member.name}
              className="w-[88vw] max-w-[34rem] shrink-0 snap-start overflow-hidden rounded-[2rem] border border-brand-200 bg-white shadow-[0_24px_70px_-48px_rgba(32,32,85,0.45)] md:w-auto md:max-w-none"
            >
              <article className="grid h-full sm:grid-cols-[minmax(11rem,42%)_1fr]">
                <div className="relative min-h-80 overflow-hidden bg-[#E8E8EA] sm:min-h-full">
                  {member.photo ? (
                    <Image
                      src={member.photo}
                      alt={member.name}
                      fill
                      sizes="(min-width: 768px) 230px, 88vw"
                      className="object-cover object-top"
                    />
                  ) : (
                    <div className="flex h-full min-h-80 items-center justify-center bg-brand-50">
                      <Image
                        src={brand.isotypeLight}
                        alt=""
                        width={918}
                        height={667}
                        className="w-24 opacity-25"
                      />
                    </div>
                  )}
                </div>
                <div className="flex flex-col justify-center p-6 md:p-8">
                  <h3 className="text-2xl font-extrabold text-brand-800">{member.name}</h3>
                  <p className="mt-2 font-semibold leading-relaxed text-accent-800">
                    {member.role}
                  </p>
                  {member.license && (
                    <p className="mt-3 inline-flex w-fit rounded-full bg-accent-50 px-3 py-1 text-xs font-bold tracking-wide text-accent-800">
                      {member.license}
                    </p>
                  )}
                  <p className="mt-4 text-[15px] leading-relaxed text-brand-700">{member.bio}</p>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
