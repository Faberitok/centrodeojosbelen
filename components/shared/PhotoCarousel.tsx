'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'

interface GalleryImage {
  src: string
  alt: string
}

export default function PhotoCarousel({
  images,
  overlay,
}: {
  images: readonly GalleryImage[]
  overlay?: React.ReactNode
}) {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    if (images.length < 2) return
    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % images.length)
    }, 5200)
    return () => window.clearInterval(timer)
  }, [images.length])

  function go(next: number) {
    setIndex((next + images.length) % images.length)
  }

  const current = images[index]

  return (
    <div className="relative min-h-[28rem] overflow-hidden rounded-[2rem] bg-brand-100 md:min-h-[36rem]">
      {images.map((image, imageIndex) => (
        <Image
          key={image.src}
          src={image.src}
          alt={imageIndex === index ? image.alt : ''}
          fill
          sizes="(min-width: 1024px) 55vw, 100vw"
          className={`object-cover transition-opacity duration-700 ${
            imageIndex === index ? 'opacity-100' : 'opacity-0'
          }`}
          priority={imageIndex === 0}
        />
      ))}
      <div
        className="absolute inset-0 bg-gradient-to-t from-[#202055]/45 via-transparent to-transparent"
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
            aria-label="Foto anterior"
            className="absolute left-3 top-1/2 z-20 inline-flex h-10 w-10 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-white/50 bg-white/30 text-brand-800/70 backdrop-blur-[2px] transition hover:bg-white/55 hover:text-brand-800"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="h-5 w-5" aria-hidden="true">
              <path d="m15 18-6-6 6-6" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <button
            type="button"
            onClick={() => go(index + 1)}
            aria-label="Foto siguiente"
            className="absolute right-3 top-1/2 z-20 inline-flex h-10 w-10 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-white/50 bg-white/30 text-brand-800/70 backdrop-blur-[2px] transition hover:bg-white/55 hover:text-brand-800"
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
