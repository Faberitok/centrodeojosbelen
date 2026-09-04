'use client'

import type { Equipment } from '@/content/site'
import Image from 'next/image'
import { useRef } from 'react'

const DRAG_THRESHOLD = 8

export default function EquipmentCarousel({ items }: { items: Equipment[] }) {
  const trackRef = useRef<HTMLUListElement>(null)
  const dragRef = useRef<{
    pointerId: number
    startX: number
    scrollLeft: number
    dragged: boolean
  } | null>(null)

  function move(direction: -1 | 1) {
    const track = trackRef.current
    if (!track) return
    track.scrollBy({
      left: direction * Math.min(track.clientWidth * 0.86, 720),
      behavior: 'smooth',
    })
  }

  const overlayBtn =
    'absolute top-1/2 z-10 inline-flex h-10 w-10 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-white/50 bg-white/40 text-brand-800/70 backdrop-blur-[2px] transition hover:bg-white/70 hover:text-brand-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-300'

  return (
    <div className="relative mt-10 px-11">
      {items.length > 1 && (
        <>
          <button
            type="button"
            onClick={() => move(-1)}
            aria-label="Ver equipo anterior"
            className={`${overlayBtn} left-0`}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="h-5 w-5" aria-hidden="true">
              <path d="m15 18-6-6 6-6" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <button
            type="button"
            onClick={() => move(1)}
            aria-label="Ver equipo siguiente"
            className={`${overlayBtn} right-0`}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="h-5 w-5" aria-hidden="true">
              <path d="m9 18 6-6-6-6" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </>
      )}

      <ul
        ref={trackRef}
        aria-label="Equipamiento del centro"
        className="flex cursor-grab snap-x snap-mandatory gap-5 overflow-x-auto pb-4 [scrollbar-color:#4EBBD1_transparent] [scrollbar-width:thin] active:cursor-grabbing [&_img]:pointer-events-none"
        onDragStart={(event) => event.preventDefault()}
        onPointerDown={(event) => {
          dragRef.current = {
            pointerId: event.pointerId,
            startX: event.clientX,
            scrollLeft: event.currentTarget.scrollLeft,
            dragged: false,
          }
        }}
        onPointerMove={(event) => {
          const drag = dragRef.current
          const track = trackRef.current
          if (!drag || !track || event.pointerId !== drag.pointerId) return
          const delta = event.clientX - drag.startX
          if (Math.abs(delta) <= DRAG_THRESHOLD) return
          drag.dragged = true
          if (!track.hasPointerCapture(event.pointerId)) {
            track.setPointerCapture(event.pointerId)
          }
          track.scrollLeft = drag.scrollLeft - delta
        }}
        onPointerUp={(event) => {
          dragRef.current = null
          if (event.currentTarget.hasPointerCapture(event.pointerId)) {
            event.currentTarget.releasePointerCapture(event.pointerId)
          }
        }}
        onPointerCancel={() => {
          dragRef.current = null
        }}
      >
        {items.map((item) => (
          <li
            key={item.id}
            className="group relative min-h-[29rem] w-[84vw] max-w-[25rem] shrink-0 snap-start overflow-hidden rounded-[2rem] bg-brand-800 sm:w-[23rem]"
          >
            <Image
              src={item.image}
              alt={item.imageAlt}
              fill
              sizes="(min-width: 640px) 368px, 84vw"
              className="object-cover transition duration-700 group-hover:scale-[1.035]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#202055] via-[#202055]/30 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-7">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-accent-300">
                {item.kicker}
              </p>
              <h3 className="mt-2 text-2xl font-extrabold text-white">{item.name}</h3>
              <p className="mt-3 text-[15px] leading-relaxed text-brand-100">
                {item.description}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
