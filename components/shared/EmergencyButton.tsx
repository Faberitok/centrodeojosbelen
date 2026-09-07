import { contact } from '@/content/site'
import { whatsappHref } from '@/lib/whatsapp'

const CROSS_ICON = (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M9 2h6v7h7v6h-7v7H9v-7H2V9h7V2z" />
  </svg>
)

export default function EmergencyButton() {
  const href = whatsappHref(contact.emergency.whatsappMessage)
  if (!href) return null

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={contact.emergency.ariaLabel}
      className="pointer-events-auto flex h-14 w-14 cursor-pointer flex-col items-center justify-center gap-0.5 rounded-full text-white shadow-lg transition-transform hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#C45C6C] active:scale-95"
      style={{ backgroundColor: '#C45C6C' }}
    >
      <span className="w-5 h-5 shrink-0">{CROSS_ICON}</span>
      <span className="text-[9px] font-bold uppercase leading-none tracking-wide">
        {contact.emergency.badge}
      </span>
    </a>
  )
}
