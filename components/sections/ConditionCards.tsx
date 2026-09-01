'use client'

import SectionWrapper from '@/components/shared/SectionWrapper'
import { conditionPages } from '@/content/site'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useRef } from 'react'

export default function ConditionCards() {
  const trackRef = useRef<HTMLUListElement>(null)
  const scrollTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  function normalizeLoop() {
    const track = trackRef.current
    if (!track) return

    const cards = track.children
    const slideCount = conditionPages.length
    const firstCard = cards[0] as HTMLElement | undefined
    const middleCard = cards[slideCount] as HTMLElement | undefined
    const finalCopyCard = cards[slideCount * 2] as HTMLElement | undefined
    if (!firstCard || !middleCard || !finalCopyCard) return

    const groupWidth = middleCard.offsetLeft - firstCard.offsetLeft
    const middleStart = middleCard.offsetLeft
    const finalCopyStart = finalCopyCard.offsetLeft

    if (track.scrollLeft < middleStart) {
      track.scrollLeft += groupWidth
    } else if (track.scrollLeft >= finalCopyStart) {
      track.scrollLeft -= groupWidth
    }
  }

  useEffect(() => {
    const track = trackRef.current
    if (!track) return

    const frame = requestAnimationFrame(() => {
      const middleCard = track.children[conditionPages.length] as HTMLElement | undefined
      if (middleCard) track.scrollLeft = middleCard.offsetLeft
    })

    return () => {
      cancelAnimationFrame(frame)
      if (scrollTimerRef.current) clearTimeout(scrollTimerRef.current)
    }
  }, [])

  function move(direction: -1 | 1) {
    const track = trackRef.current
    if (!track) return
    track.scrollBy({
      left: direction * Math.min(track.clientWidth * 0.9, 720),
      behavior: 'smooth',
    })
  }

  function handleScroll() {
    if (scrollTimerRef.current) clearTimeout(scrollTimerRef.current)
    scrollTimerRef.current = setTimeout(normalizeLoop, 120)
  }

  return (
    <SectionWrapper id="especialidades" className="bg-white py-14 md:py-20">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <div className="max-w-2xl">
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-accent-700">
            Evaluación y seguimiento
          </p>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-brand-800 md:text-5xl">
            Información para cuidar tu visión
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-brand-700">
            Conocé los signos de alerta, cómo realizamos el diagnóstico y las alternativas
            de seguimiento y tratamiento para cada condición.
          </p>
        </div>

        <div className="flex shrink-0 gap-2">
          <button
            type="button"
            onClick={() => move(-1)}
            aria-label="Ver condición anterior"
            className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-brand-200 bg-white text-brand-800 transition hover:border-accent-400 hover:bg-accent-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-600"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="h-5 w-5" aria-hidden="true">
              <path d="m15 18-6-6 6-6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <button
            type="button"
            onClick={() => move(1)}
            aria-label="Ver condición siguiente"
            className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-brand-200 bg-white text-brand-800 transition hover:border-accent-400 hover:bg-accent-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-600"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="h-5 w-5" aria-hidden="true">
              <path d="m9 18 6-6-6-6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>

      <ul
        ref={trackRef}
        onScroll={handleScroll}
        className="staff-track mt-12 flex snap-x snap-mandatory gap-5 overflow-x-auto"
        aria-label="Condiciones oftalmológicas"
      >
        {[0, 1, 2].flatMap((copy) =>
          conditionPages.map((condition) => (
            <li
              key={`${copy}-${condition.slug}`}
              className="w-[86vw] max-w-[32rem] shrink-0 snap-start sm:w-[30rem] lg:w-[32rem]"
              aria-hidden={copy !== 1}
            >
              <Link
                href={`/${condition.slug}`}
                tabIndex={copy === 1 ? undefined : -1}
                className="group relative flex min-h-[28rem] overflow-hidden rounded-[2rem] border border-brand-200 shadow-[0_24px_60px_-45px_rgba(16,16,48,0.5)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-500 focus-visible:ring-offset-4"
              >
                <article className="absolute inset-0">
                  <Image
                    src={condition.image}
                    alt={copy === 1 ? condition.imageAlt : ''}
                    fill
                    sizes="(min-width: 768px) 50vw, 100vw"
                    className="object-cover transition duration-700 group-hover:scale-[1.035]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-950 via-brand-900/60 to-transparent" />
                </article>

                <div className="relative z-10 mt-auto p-7 md:p-9">
                  <p className="text-xs font-bold uppercase tracking-[0.16em] text-accent-300">
                    {condition.lead}
                  </p>
                  <h3 className="mt-3 text-3xl font-extrabold text-white">
                    {condition.title}
                  </h3>
                  <p className="mt-4 line-clamp-3 max-w-xl leading-relaxed text-white/85">
                    {condition.summary}
                  </p>
                </div>
              </Link>
            </li>
          )),
        )}
      </ul>
    </SectionWrapper>
  )
}
