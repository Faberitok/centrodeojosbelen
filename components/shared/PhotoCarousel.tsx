'use client'

import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'

interface GalleryImage {
  src: string
  alt: string
}

const SWIPE_THRESHOLD = 24

export default function PhotoCarousel({
  images,
  overlay,
}: {
  images: readonly GalleryImage[]
  overlay?: React.ReactNode
}) {
  const [index, setIndex] = useState(0)
  const pointerStartX = useRef<number | null>(null)
  const pointerStartY = useRef<number | null>(null)
  const interactingRef = useRef(false)

  useEffect(() => {
    if (images.length < 2) return
    const timer = window.setInterval(() => {
      if (interactingRef.current) return
      setIndex((current) => (current + 1) % images.length)
    }, 5200)
    return () => window.clearInterval(timer)
  }, [images.length])

  function go(next: number) {
    setIndex((next + images.length) % images.length)
  }

  function onPointerDown(event: React.PointerEvent<HTMLDivElement>) {
    if (images.length < 2) return
    interactingRef.current = true
    pointerStartX.current = event.clientX
    pointerStartY.current = event.clientY
    event.currentTarget.setPointerCapture(event.pointerId)
  }

  function onPointerUp(event: React.PointerEvent<HTMLDivElement>) {
    interactingRef.current = false
    if (pointerStartX.current == null || pointerStartY.current == null) return
    const deltaX = event.clientX - pointerStartX.current
    const deltaY = event.clientY - pointerStartY.current
    pointerStartX.current = null
    pointerStartY.current = null
    if (Math.abs(deltaX) < SWIPE_THRESHOLD) return
    if (Math.abs(deltaX) <= Math.abs(deltaY)) return
    go(index + (deltaX < 0 ? 1 : -1))
  }

  const current = images[index]
  const arrowClass =
    'absolute top-1/2 z-20 inline-flex h-10 w-10 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-white/50 bg-white/40 text-brand-800/70 backdrop-blur-[2px] transition hover:bg-white/70 hover:text-brand-800'

  return (
    <div
      className="relative min-h-[28rem] touch-pan-y overflow-hidden rounded-[2rem] bg-brand-100 md:min-h-[36rem]"
      onPointerDown={onPointerDown}
      onPointerUp={onPointerUp}
      onPointerCancel={() => {
        interactingRef.current = false
        pointerStartX.current = null
        pointerStartY.current = null
      }}
    >
      {images.map((image, imageIndex) => (
        <Image
          key={image.src}
          src={image.src}
          alt={imageIndex === index ? image.alt : ''}
          fill
          draggable={false}
          sizes="(min-width: 1024px) 55vw, 100vw"
          className={`pointer-events-none select-none object-cover transition-opacity duration-700 ${
            imageIndex === index ? 'opacity-100' : 'opacity-0'
          }`}
          priority={imageIndex === 0}
        />
      ))}
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#202055]/45 via-transparent to-transparent"
        aria-hidden="true"
      />
      {overlay ? (
        <div className="pointer-events-none absolute inset-0 z-10">{overlay}</div>
      ) : null}
      {images.length > 1 && (
        <>
          <button
            type="button"
            onClick={() => go(index - 1)}
            onPointerDown={(event) => event.stopPropagation()}
            aria-label="Foto anterior"
            className={`${arrowClass} left-1`}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="h-5 w-5" aria-hidden="true">
              <path d="m15 18-6-6 6-6" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <button
            type="button"
            onClick={() => go(index + 1)}
            onPointerDown={(event) => event.stopPropagation()}
            aria-label="Foto siguiente"
            className={`${arrowClass} right-1`}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="h-5 w-5" aria-hidden="true">
              <path d="m9 18 6-6-6-6" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </>
      )}
      <span className="sr-only">{current?.alt}</span>
    </div>
  )
}
