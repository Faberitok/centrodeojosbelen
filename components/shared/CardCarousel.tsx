'use client'

import { Children, useEffect, useLayoutEffect, useRef, useState, useSyncExternalStore } from 'react'

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

function desktopMediaQuery(gridClass: string) {
  if (gridClass.includes('lg:grid') || gridClass.includes('lg:flex-col')) {
    return '(min-width: 1024px)'
  }
  if (gridClass.includes('md:grid') || gridClass.includes('md:flex-col')) {
    return '(min-width: 768px)'
  }
  if (gridClass.includes('sm:grid')) return '(min-width: 640px)'
  return ''
}

function useDesktopGrid(gridClass: string) {
  const query = desktopMediaQuery(gridClass)
  return useSyncExternalStore(
    (onChange) => {
      if (!query) return () => {}
      const media = window.matchMedia(query)
      media.addEventListener('change', onChange)
      return () => media.removeEventListener('change', onChange)
    },
    () => (query ? window.matchMedia(query).matches : false),
    () => false,
  )
}

const TRANSITION_MS = 500

export default function CardCarousel({
  children,
  ariaLabel,
  prevLabel,
  nextLabel,
  infinite = true,
  autoplay = false,
  itemClassName = 'w-[82vw] max-w-[32rem] shrink-0',
  listClassName = '',
  desktopGridClassName = '',
  controlsClassName = '',
  header,
  headerLayout = 'beside',
}: CardCarouselProps) {
  const viewportRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLUListElement>(null)
  const pointerStartX = useRef<number | null>(null)
  const hoveringRef = useRef(false)
  const playingRef = useRef(false)
  const unlockTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const slides = Children.toArray(children)
  const slideCount = slides.length
  const gridMode = useDesktopGrid(desktopGridClassName)
  const looping = infinite && !gridMode && slideCount > 1
  const copies = looping ? 3 : 1
  const loopSlides = looping
    ? Array.from({ length: copies }, () => slides).flat()
    : slides

  const [index, setIndex] = useState(looping ? slideCount : 0)
  const [step, setStep] = useState(0)
  const [disableAnimation, setDisableAnimation] = useState(false)
  const [wasLooping, setWasLooping] = useState(looping)

  if (wasLooping !== looping) {
    setWasLooping(looping)
    setIndex(looping ? slideCount : 0)
  }

  function measureStep() {
    const track = trackRef.current
    const first = track?.children[0] as HTMLElement | undefined
    if (!track || !first) return 0
    const gap =
      Number.parseFloat(getComputedStyle(track).columnGap || getComputedStyle(track).gap) || 20
    return first.offsetWidth + gap
  }

  function unlock() {
    playingRef.current = false
    if (unlockTimerRef.current) {
      clearTimeout(unlockTimerRef.current)
      unlockTimerRef.current = null
    }
  }

  function go(direction: -1 | 1) {
    if (gridMode || slideCount < 2 || playingRef.current) return
    playingRef.current = true
    setIndex((current) => {
      if (!looping) {
        return Math.min(slideCount - 1, Math.max(0, current + direction))
      }
      return current + direction
    })
    unlockTimerRef.current = setTimeout(unlock, TRANSITION_MS + 40)
  }

  useLayoutEffect(() => {
    const track = trackRef.current
    const viewport = viewportRef.current
    if (!track) return

    const update = () => setStep(measureStep())
    update()

    const observer = new ResizeObserver(update)
    observer.observe(track)
    if (track.children[0]) observer.observe(track.children[0])
    if (viewport) observer.observe(viewport)
    return () => observer.disconnect()
  }, [slideCount, gridMode, itemClassName, looping])

  useLayoutEffect(() => {
    if (!disableAnimation) return
    const frame = requestAnimationFrame(() => {
      requestAnimationFrame(() => setDisableAnimation(false))
    })
    return () => cancelAnimationFrame(frame)
  }, [disableAnimation, index])

  useEffect(() => {
    if (!looping) return
    if (index >= slideCount * 2) {
      const timer = setTimeout(() => {
        setDisableAnimation(true)
        setIndex((current) => current - slideCount)
        unlock()
      }, TRANSITION_MS)
      return () => clearTimeout(timer)
    }
    if (index < slideCount) {
      const timer = setTimeout(() => {
        setDisableAnimation(true)
        setIndex((current) => current + slideCount)
        unlock()
      }, TRANSITION_MS)
      return () => clearTimeout(timer)
    }
  }, [index, looping, slideCount])

  useEffect(() => {
    if (!autoplay || !looping) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const timer = window.setInterval(() => {
      if (hoveringRef.current || playingRef.current) return
      playingRef.current = true
      setIndex((current) => current + 1)
      unlockTimerRef.current = setTimeout(unlock, TRANSITION_MS + 40)
    }, 3800)

    return () => window.clearInterval(timer)
  }, [autoplay, looping, slideCount])

  const controls = (
    <CarouselControls
      onPrev={() => go(-1)}
      onNext={() => go(1)}
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
    <div className={`mb-8 flex justify-end ${controlsClassName}`}>{controls}</div>
  )

  const carouselActive = !gridMode && slideCount > 1

  return (
    <>
      {headerBlock}
      <div
        ref={viewportRef}
        role="region"
        tabIndex={0}
        aria-roledescription="carrusel"
        className={carouselActive ? 'overflow-hidden outline-none' : 'outline-none'}
        onMouseEnter={() => {
          hoveringRef.current = true
        }}
        onMouseLeave={() => {
          hoveringRef.current = false
        }}
        onKeyDown={(event) => {
          if (event.key === 'ArrowRight') {
            event.preventDefault()
            go(1)
          }
          if (event.key === 'ArrowLeft') {
            event.preventDefault()
            go(-1)
          }
        }}
        onPointerDown={(event) => {
          if (!carouselActive) return
          pointerStartX.current = event.clientX
        }}
        onPointerUp={(event) => {
          if (pointerStartX.current == null) return
          const delta = event.clientX - pointerStartX.current
          pointerStartX.current = null
          if (Math.abs(delta) > 40) go(delta < 0 ? 1 : -1)
        }}
        onPointerCancel={() => {
          pointerStartX.current = null
        }}
      >
        <ul
          ref={trackRef}
          aria-label={ariaLabel}
          className={`flex gap-5 ${gridMode ? `${desktopGridClassName} translate-x-0` : ''} ${
            looping && step === 0 ? 'invisible' : ''
          } ${listClassName}`}
          style={
            carouselActive
              ? {
                  transform: `translate3d(${-(index * step)}px, 0, 0)`,
                  transition: disableAnimation ? 'none' : `transform ${TRANSITION_MS}ms ease`,
                }
              : undefined
          }
        >
          {loopSlides.map((slide, slideIndex) => {
            const copy = looping ? Math.floor(slideIndex / slideCount) : 0
            const item = looping ? slideIndex % slideCount : slideIndex
            return (
              <li key={`${copy}-${item}`} className={`${itemClassName} h-full`}>
                {slide}
              </li>
            )
          })}
        </ul>
      </div>
    </>
  )
}
