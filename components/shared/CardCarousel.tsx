'use client'

import { Children, useEffect, useRef } from 'react'

interface CardCarouselProps {
  children: React.ReactNode
  ariaLabel: string
  prevLabel: string
  nextLabel: string
  infinite?: boolean
  autoplay?: boolean
  itemClassName?: string
  listClassName?: string
  desktopGridClassName?: string
  controlsClassName?: string
  header?: React.ReactNode
  headerLayout?: 'beside' | 'below'
}

function CarouselControls({
  onPrev,
  onNext,
  prevLabel,
  nextLabel,
  className = '',
}: {
  onPrev: () => void
  onNext: () => void
  prevLabel: string
  nextLabel: string
  className?: string
}) {
  return (
    <div className={`flex shrink-0 gap-2 ${className}`}>
      <button
        type="button"
        onClick={onPrev}
        aria-label={prevLabel}
        className="inline-flex h-12 w-12 cursor-pointer items-center justify-center rounded-full border border-brand-200 bg-white text-brand-800 transition hover:border-accent-400 hover:bg-accent-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-600"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="h-5 w-5" aria-hidden="true">
          <path d="m15 18-6-6 6-6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      <button
        type="button"
        onClick={onNext}
        aria-label={nextLabel}
        className="inline-flex h-12 w-12 cursor-pointer items-center justify-center rounded-full border border-brand-200 bg-white text-brand-800 transition hover:border-accent-400 hover:bg-accent-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-600"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="h-5 w-5" aria-hidden="true">
          <path d="m9 18 6-6-6-6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
    </div>
  )
}

export default function CardCarousel({
  children,
  ariaLabel,
  prevLabel,
  nextLabel,
  infinite = false,
  autoplay = false,
  itemClassName = 'w-[82vw] max-w-[32rem] shrink-0 snap-start',
  listClassName = '',
  desktopGridClassName = '',
  controlsClassName = '',
  header,
  headerLayout = 'beside',
}: CardCarouselProps) {
  const trackRef = useRef<HTMLUListElement>(null)
  const scrollTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const resumeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const pausedRef = useRef(false)
  const slides = Children.toArray(children)
  const slideCount = slides.length
  const shouldLoop = infinite || autoplay
  const copies = shouldLoop ? [0, 1, 2] : [0]

  function normalizeLoop() {
    const track = trackRef.current
    if (!track || !shouldLoop) return

    const cards = track.children
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

  function pauseAutoplay(resumeAfterMs?: number) {
    pausedRef.current = true
    if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current)
    if (resumeAfterMs) {
      resumeTimerRef.current = setTimeout(() => {
        pausedRef.current = false
      }, resumeAfterMs)
    }
  }

  function resumeAutoplay() {
    if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current)
    pausedRef.current = false
  }

  useEffect(() => {
    const track = trackRef.current
    if (!track || !shouldLoop) return

    const frame = requestAnimationFrame(() => {
      const middleCard = track.children[slideCount] as HTMLElement | undefined
      if (middleCard) track.scrollLeft = middleCard.offsetLeft
    })

    return () => {
      cancelAnimationFrame(frame)
      if (scrollTimerRef.current) clearTimeout(scrollTimerRef.current)
      if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current)
    }
  }, [shouldLoop, slideCount])

  useEffect(() => {
    if (!autoplay) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let frame = 0
    let last = performance.now()
    const pixelsPerSecond = 36

    function tick(now: number) {
      const track = trackRef.current
      if (track && !pausedRef.current) {
        track.scrollLeft += (pixelsPerSecond * (now - last)) / 1000
        normalizeLoop()
      }
      last = now
      frame = requestAnimationFrame(tick)
    }

    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [autoplay, slideCount, shouldLoop])

  function move(direction: -1 | 1) {
    const track = trackRef.current
    if (!track) return
    pauseAutoplay(2800)
    const firstCard = track.children[0] as HTMLElement | undefined
    const step = firstCard
      ? firstCard.getBoundingClientRect().width + 20
      : Math.min(track.clientWidth * 0.9, 640)
    track.scrollBy({ left: direction * step, behavior: 'smooth' })
  }

  function handleScroll() {
    if (!shouldLoop || autoplay) return
    if (scrollTimerRef.current) clearTimeout(scrollTimerRef.current)
    scrollTimerRef.current = setTimeout(normalizeLoop, 120)
  }

  const controls = (
    <CarouselControls
      onPrev={() => move(-1)}
      onNext={() => move(1)}
      prevLabel={prevLabel}
      nextLabel={nextLabel}
      className={controlsClassName}
    />
  )

  const headerBlock = header ? (
    headerLayout === 'below' ? (
      <div>
        {header}
        <div className={`mt-6 flex justify-end ${controlsClassName}`}>{controls}</div>
      </div>
    ) : (
      <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        {header}
        {controls}
      </div>
    )
  ) : (
    <div className="mb-8 flex justify-end">{controls}</div>
  )

  return (
    <>
      {headerBlock}
      <ul
        ref={trackRef}
        onScroll={handleScroll}
        onMouseEnter={() => pauseAutoplay()}
        onMouseLeave={() => resumeAutoplay()}
        onPointerDown={() => pauseAutoplay(2800)}
        aria-label={ariaLabel}
        className={`staff-track flex gap-5 overflow-x-auto ${autoplay ? '' : 'snap-x snap-mandatory'} ${desktopGridClassName} ${listClassName}`}
      >
        {copies.flatMap((copy) =>
          slides.map((slide, index) => (
            <li
              key={`${copy}-${index}`}
              className={itemClassName}
              aria-hidden={shouldLoop && copy !== 1}
              {...(shouldLoop && !autoplay && copy !== 1 ? { inert: true } : {})}
            >
              {slide}
            </li>
          )),
        )}
      </ul>
    </>
  )
}
