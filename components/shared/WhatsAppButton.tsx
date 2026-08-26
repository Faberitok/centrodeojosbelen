'use client'

import { useEffect, useRef, useState } from 'react'

const WA_ICON = (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
)

interface WhatsAppButtonProps {
  variant?: 'floating' | 'inline'
  label?: string
}

export default function WhatsAppButton({
  variant = 'floating',
  label = 'WhatsApp',
}: WhatsAppButtonProps) {
  const [open, setOpen] = useState(false)
  const popupRef = useRef<HTMLDivElement>(null)

  const number = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER
  const message = process.env.NEXT_PUBLIC_WHATSAPP_MESSAGE ?? '¡Hola! Me gustaría obtener más información.'

  useEffect(() => {
    if (!open) return
    function handleClickOutside(e: MouseEvent) {
      if (popupRef.current && !popupRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [open])

  if (!number || number.trim() === '') return null

  const href = `https://wa.me/${number.trim()}?text=${encodeURIComponent(message)}`

  if (variant === 'inline') {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Contactar por WhatsApp: ${label}`}
        className="inline-flex items-center gap-2 px-7 py-3.5 font-semibold rounded-md transition-colors text-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 text-white"
        style={{ backgroundColor: '#25D366' }}
      >
        <span className="w-5 h-5 shrink-0">{WA_ICON}</span>
        {label}
      </a>
    )
  }

  return (
    <div
      ref={popupRef}
      className="fixed right-3 bottom-3 sm:right-6 sm:bottom-6 z-50 flex flex-col items-end gap-3 max-w-[calc(100vw-1.5rem)]"
    >
      {/* Chat popup */}
      <div
        role="dialog"
        aria-label="Chat de WhatsApp"
        aria-hidden={!open}
        className={[
          'w-[min(18rem,calc(100vw-1.5rem))] rounded-2xl overflow-hidden shadow-2xl',
          'transition-all duration-300 origin-bottom-right',
          open
            ? 'opacity-100 scale-100 pointer-events-auto'
            : 'opacity-0 scale-95 pointer-events-none',
        ].join(' ')}
        style={{ background: '#f0f0f0' }}
      >
        {/* Header */}
        <div className="flex items-center gap-3 px-4 py-3" style={{ backgroundColor: '#075E54' }}>
          <span className="flex items-center justify-center w-9 h-9 rounded-full bg-white/20 shrink-0">
            <span className="w-5 h-5 text-white">{WA_ICON}</span>
          </span>
          <div className="flex-1 min-w-0">
            <p className="text-white font-semibold text-sm leading-tight truncate">WhatsApp</p>
            <p className="text-green-200 text-xs">Responde normalmente en minutos</p>
          </div>
          <button
            onClick={() => setOpen(false)}
            aria-label="Cerrar chat"
            className="text-white/70 hover:text-white transition-colors p-1 rounded-full hover:bg-white/10"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} className="w-4 h-4" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Body */}
        <div className="px-4 py-4" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3C/svg%3E")', backgroundColor: '#e5ddd5' }}>
          {/* Chat bubble */}
          <div className="relative bg-white rounded-2xl rounded-tl-none px-4 py-3 shadow-sm max-w-[90%]">
            <div
              className="absolute -left-2 top-0 w-3 h-3 overflow-hidden"
              aria-hidden="true"
              style={{
                background: 'transparent',
                boxShadow: '4px 0 0 0 white',
                borderRadius: '0 0 0 8px',
              }}
            />
            <p className="text-gray-800 text-sm leading-relaxed">
              ¡Hola! 👋 ¿En qué podemos ayudarte hoy? Escribinos y te respondemos a la brevedad.
            </p>
            <span className="block text-right text-gray-400 text-[10px] mt-1">ahora</span>
          </div>
        </div>

        {/* CTA */}
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 w-full py-3 text-white text-sm font-semibold transition-opacity hover:opacity-90 focus-visible:outline-none"
          style={{ backgroundColor: '#25D366' }}
          onClick={() => setOpen(false)}
        >
          <span className="w-4 h-4 shrink-0">{WA_ICON}</span>
          Iniciar conversación
        </a>
      </div>

      {/* Trigger button */}
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? 'Cerrar chat de WhatsApp' : 'Abrir chat de WhatsApp'}
        aria-expanded={open}
        className="flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-full shadow-lg transition-transform hover:scale-105 active:scale-95 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-green-500"
        style={{ backgroundColor: '#25D366', color: 'white' }}
      >
        <span
          className={[
            'w-6 h-6 sm:w-7 sm:h-7 transition-all duration-300',
            open ? 'scale-0 opacity-0 absolute' : 'scale-100 opacity-100',
          ].join(' ')}
          aria-hidden="true"
        >
          {WA_ICON}
        </span>
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2.5}
          className={[
            'w-5 h-5 sm:w-6 sm:h-6 transition-all duration-300',
            open ? 'scale-100 opacity-100' : 'scale-0 opacity-0 absolute',
          ].join(' ')}
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  )
}
