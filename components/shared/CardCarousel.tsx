'use client'

import { Children, useEffect, useLayoutEffect, useRef, useState } from 'react'

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

const TRANSITION_MS = 500
const SWIPE_THRESHOLD = 24

export default function CardCarousel({
  children,
  ariaLabel,
  prevLabel: _prevLabel,
  nextLabel: _nextLabel,
  infinite = true,
  autoplay = false,
  itemClassName = 'w-[85%] max-w-[32rem] shrink-0',
  listClassName = '',
  desktopGridClassName: _desktopGridClassName,
  controlsClassName: _controlsClassName,
  header,
  headerLayout = 'beside',
}: CardCarouselProps) {
  const viewportRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLUListElement>(null)
  const pointerStartX = useRef<number | null>(null)
  const pointerStartY = useRef<number | null>(null)
  const hoveringRef = useRef(false)
  const playingRef = useRef(false)
  const draggedRef = useRef(false)
  const unlockTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const slides = Children.toArray(children)
  const slideCount = slides.length
  const looping = infinite && slideCount > 1
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

  const activeIndex = looping
    ? ((index % slideCount) + slideCount) % slideCount
    : index

  const carouselActive = slideCount > 1

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
    if (slideCount < 2 || playingRef.current) return
    playingRef.current = true
    setIndex((current) => {
      if (!looping) {
        return Math.min(slideCount - 1, Math.max(0, current + direction))
      }
      return current + direction
    })
    unlockTimerRef.current = setTimeout(unlock, TRANSITION_MS + 40)
  }

  function goTo(target: number) {
    if (slideCount < 2 || target === activeIndex) return
    playingRef.current = true
    setIndex(looping ? slideCount + target : target)
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
  }, [slideCount, itemClassName, looping])

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

  const headerBlock = header ? (
    headerLayout === 'below' ? (
      header
    ) : (
      <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        {header}
      </div>
    )
  ) : null

  return (
    <>
      {headerBlock}
      <div
        ref={viewportRef}
        role="region"
        tabIndex={0}
        aria-roledescription="carrusel"
        aria-label={ariaLabel}
        className={
          carouselActive
            ? 'cursor-grab touch-pan-y overflow-hidden outline-none select-none active:cursor-grabbing'
            : 'outline-none'
        }
        onMouseEnter={() => {
          hoveringRef.current = true
        }}
        onMouseLeave={() => {
          hoveringRef.current = false
        }}
        onDragStart={(event) => event.preventDefault()}
        onClickCapture={(event) => {
          if (!draggedRef.current) return
          event.preventDefault()
          event.stopPropagation()
          draggedRef.current = false
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
          draggedRef.current = false
          pointerStartX.current = event.clientX
          pointerStartY.current = event.clientY
        }}
        onPointerMove={(event) => {
          if (pointerStartX.current == null) return
          if (Math.abs(event.clientX - pointerStartX.current) <= SWIPE_THRESHOLD) return
          draggedRef.current = true
          if (!event.currentTarget.hasPointerCapture(event.pointerId)) {
            event.currentTarget.setPointerCapture(event.pointerId)
          }
        }}
        onPointerUp={(event) => {
          if (pointerStartX.current == null || pointerStartY.current == null) return
          const deltaX = event.clientX - pointerStartX.current
          const deltaY = event.clientY - pointerStartY.current
          pointerStartX.current = null
          pointerStartY.current = null
          if (Math.abs(deltaX) < SWIPE_THRESHOLD) return
          if (Math.abs(deltaX) <= Math.abs(deltaY)) return
          draggedRef.current = true
          go(deltaX < 0 ? 1 : -1)
        }}
        onPointerCancel={() => {
          pointerStartX.current = null
          pointerStartY.current = null
        }}
      >
        <ul
          ref={trackRef}
          className={`flex items-stretch gap-5 [&_img]:pointer-events-none ${
            carouselActive ? 'w-full' : ''
          } ${looping && step === 0 ? 'invisible' : ''} ${listClassName}`}
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
              <li key={`${copy}-${item}`} className={`${itemClassName} flex self-stretch [&>*]:h-full [&>*]:w-full`}>
                {slide}
              </li>
            )
          })}
        </ul>
      </div>

      {carouselActive && (
        <div className="mt-5 flex justify-center gap-2" role="tablist" aria-label={ariaLabel}>
          {slides.map((_, slideIndex) => {
            const current = slideIndex === activeIndex
            return (
              <button
                key={slideIndex}
                type="button"
                role="tab"
                aria-selected={current}
                aria-label={`${slideIndex + 1} de ${slideCount}`}
                className={`h-2 rounded-full transition-all ${
                  current ? 'w-6 bg-accent-600' : 'w-2 bg-brand-200 hover:bg-brand-300'
                }`}
                onClick={() => goTo(slideIndex)}
              />
            )
          })}
        </div>
      )}
    </>
  )
}
