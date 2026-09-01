'use client'

import Button from '@/components/shared/Button'
import type { ServiceStatusTone } from '@/components/shared/ServiceSummaryCard'
import Image from 'next/image'
import { useEffect, useId, useRef, useState } from 'react'
import { createPortal } from 'react-dom'

export interface ServiceDetailSection {
  title: string
  body: string
}

export interface ServiceDetailMeta {
  label: string
  value: string
}

export interface ServiceDetailItem {
  id: string
  title: string
  dateLabel: string
  statusLabel: string
  statusTone?: ServiceStatusTone
  image?: { src: string; alt: string }
  lead?: string
  sections: ServiceDetailSection[]
  meta?: ServiceDetailMeta[]
  documentHref?: string
  documentLabel?: string
  primaryAction?: { label: string; href: string; external?: boolean }
  secondaryAction?: { label: string; href: string }
}

interface ServiceDetailPanelProps {
  item: ServiceDetailItem | null
  onClose: () => void
  closeLabel: string
}

const statusClasses: Record<ServiceStatusTone, string> = {
  available: 'bg-accent-50 text-accent-800',
  info: 'bg-brand-100 text-brand-800',
}

const CLOSE_DRAG_PX = 100

export default function ServiceDetailPanel({
  item,
  onClose,
  closeLabel,
}: ServiceDetailPanelProps) {
  const titleId = useId()
  const closeRef = useRef<HTMLButtonElement>(null)
  const dragStartY = useRef<number | null>(null)
  const dragOffsetRef = useRef(0)
  const [mounted, setMounted] = useState(false)
  const [dragOffset, setDragOffset] = useState(0)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!item) return

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()
    dragOffsetRef.current = 0
    setDragOffset(0)

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') onClose()
    }

    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.body.style.overflow = previousOverflow
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [item, onClose])

  if (!mounted || !item) return null

  const tone = item.statusTone ?? 'available'

  function isMobileSheet() {
    return !window.matchMedia('(min-width: 768px)').matches
  }

  function onHandlePointerDown(event: React.PointerEvent<HTMLElement>) {
    if (!isMobileSheet()) return
    if ((event.target as HTMLElement).closest('[data-sheet-close]')) return
    dragStartY.current = event.clientY
    dragOffsetRef.current = 0
    event.currentTarget.setPointerCapture(event.pointerId)
  }

  function onHandlePointerMove(event: React.PointerEvent<HTMLElement>) {
    if (dragStartY.current == null) return
    const next = Math.max(0, event.clientY - dragStartY.current)
    dragOffsetRef.current = next
    setDragOffset(next)
  }

  function onHandlePointerUp() {
    if (dragStartY.current == null) return
    const offset = dragOffsetRef.current
    dragStartY.current = null
    dragOffsetRef.current = 0
    if (offset > CLOSE_DRAG_PX) {
      onClose()
      return
    }
    setDragOffset(0)
  }

  return createPortal(
    <div className="fixed inset-0 z-[70] flex items-end justify-center md:items-center md:p-6">
      <button
        type="button"
        aria-label={closeLabel}
        className="absolute inset-0 bg-brand-900/55"
        onClick={onClose}
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="relative flex max-h-[90vh] w-full max-w-3xl flex-col overflow-hidden rounded-t-[1.75rem] bg-white shadow-[0_24px_80px_-24px_rgba(16,16,48,0.45)] md:rounded-[1.75rem]"
        style={dragOffset ? { transform: `translateY(${dragOffset}px)` } : undefined}
      >
        <div
          className="shrink-0 touch-none md:cursor-auto"
          onPointerDown={onHandlePointerDown}
          onPointerMove={onHandlePointerMove}
          onPointerUp={onHandlePointerUp}
          onPointerCancel={onHandlePointerUp}
        >
          <div className="flex cursor-grab justify-center pt-3 active:cursor-grabbing md:hidden">
            <span className="h-1.5 w-12 rounded-full bg-brand-200" aria-hidden="true" />
          </div>

          <div className="flex items-start justify-between gap-4 px-5 pb-3 pt-2 md:px-8 md:pt-6">
            <div className="min-w-0">
              <p className="flex items-center gap-2 text-sm font-medium text-brand-700">
                <CalendarIcon />
                {item.dateLabel}
              </p>
              <h2
                id={titleId}
                className="mt-2 text-2xl font-extrabold leading-tight text-brand-800 md:text-3xl"
              >
                {item.title}
              </h2>
              <span
                className={`mt-3 inline-flex rounded-full px-3 py-1 text-xs font-bold tracking-wide ${statusClasses[tone]}`}
              >
                {item.statusLabel}
              </span>
            </div>
            <button
              ref={closeRef}
              type="button"
              data-sheet-close
              onClick={onClose}
              onPointerDown={(event) => event.stopPropagation()}
              aria-label={closeLabel}
              className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-brand-200 text-brand-800 transition hover:bg-brand-50"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="h-5 w-5" aria-hidden="true">
                <path d="M6 6l12 12M18 6 6 18" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>
          </div>
        </div>

        <div className="overflow-y-auto px-5 pb-8 md:px-8">
          {item.image && (
            <div className="relative mt-2 aspect-[16/9] overflow-hidden rounded-2xl border border-brand-200">
              <Image
                src={item.image.src}
                alt={item.image.alt}
                fill
                sizes="(min-width: 768px) 48rem, 100vw"
                className="object-cover"
              />
            </div>
          )}

          {item.lead && (
            <p className="mt-5 text-[15px] leading-relaxed text-brand-700">{item.lead}</p>
          )}

          {item.meta && item.meta.length > 0 && (
            <dl className="mt-5 grid gap-3 sm:grid-cols-2">
              {item.meta.map((entry) => (
                <div key={entry.label} className="rounded-2xl bg-brand-50 px-4 py-3">
                  <dt className="text-xs font-bold uppercase tracking-[0.14em] text-accent-700">
                    {entry.label}
                  </dt>
                  <dd className="mt-1 font-semibold text-brand-800">{entry.value}</dd>
                </div>
              ))}
            </dl>
          )}

          <div className="mt-6 space-y-6 border-t border-brand-200 pt-6">
            {item.sections.map((section) => (
              <section key={section.title}>
                <h3 className="font-extrabold text-brand-800">{section.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-brand-700">{section.body}</p>
              </section>
            ))}
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            {item.documentHref && item.documentLabel && (
              <Button href={item.documentHref} external variant="outline">
                {item.documentLabel}
              </Button>
            )}
            {item.primaryAction && (
              <Button href={item.primaryAction.href} external={item.primaryAction.external}>
                {item.primaryAction.label}
              </Button>
            )}
            {item.secondaryAction && (
              <Button href={item.secondaryAction.href} variant="outline">
                {item.secondaryAction.label}
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>,
    document.body,
  )
}

function CalendarIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      className="h-4 w-4 shrink-0 text-accent-700"
      aria-hidden="true"
    >
      <rect x="3" y="5" width="18" height="16" rx="2" strokeWidth="2" />
      <path d="M8 3v4M16 3v4M3 10h18" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}
