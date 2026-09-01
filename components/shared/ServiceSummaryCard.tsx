import ServiceIcon from '@/components/shared/ServiceIcon'

export type ServiceStatusTone = 'available' | 'info'
export type ServiceCardKind = 'study' | 'procedure'

interface ServiceSummaryCardProps {
  title: string
  dateLabel: string
  statusLabel: string
  statusTone?: ServiceStatusTone
  actionLabel: string
  kind: ServiceCardKind
  onOpen: () => void
}

const statusClasses: Record<ServiceStatusTone, string> = {
  available: 'bg-accent-50/80 text-accent-800',
  info: 'bg-brand-50 text-brand-700/80',
}

function supportingMeta(dateLabel: string, statusLabel: string) {
  const duplicate = new RegExp(
    statusLabel.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '[,·\\s]*',
    'i',
  )
  const cleaned = dateLabel.replace(duplicate, '').replace(/^[,·\s]+|[,·\s]+$/g, '')
  if (!cleaned) return dateLabel
  return cleaned.charAt(0).toUpperCase() + cleaned.slice(1)
}

export default function ServiceSummaryCard({
  title,
  dateLabel,
  statusLabel,
  statusTone = 'available',
  actionLabel,
  kind,
  onOpen,
}: ServiceSummaryCardProps) {
  const meta = supportingMeta(dateLabel, statusLabel)
  const icon = kind === 'study' ? 'scan' : 'scalpel'

  function onKeyDown(event: React.KeyboardEvent<HTMLElement>) {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      onOpen()
    }
  }

  return (
    <article
      role="button"
      tabIndex={0}
      aria-label={`${actionLabel}: ${title}`}
      onClick={onOpen}
      onKeyDown={onKeyDown}
      className="group cursor-pointer rounded-2xl border border-brand-200 bg-white text-left shadow-sm transition duration-300 hover:border-accent-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-700 md:flex md:h-full md:flex-col md:justify-between md:p-6 md:hover:-translate-y-0.5 md:hover:scale-[1.015] md:hover:shadow-[0_18px_40px_-28px_rgba(16,16,48,0.35)]"
    >
      <div className="flex h-16 items-center gap-3 px-3 md:hidden">
        <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-accent-50 text-accent-700">
          <ServiceIcon name={icon} className="h-4 w-4" />
        </span>
        <h3 className="min-w-0 flex-1 truncate text-sm font-bold text-brand-800">{title}</h3>
        <span
          className={`max-w-[7.5rem] shrink-0 truncate rounded-full px-2 py-0.5 text-[10px] font-semibold ${statusClasses[statusTone]}`}
        >
          {statusLabel}
        </span>
        <span className="shrink-0 text-brand-500" aria-hidden="true">
          <ChevronRightIcon />
        </span>
      </div>

      <div className="hidden md:block">
        <span
          className={`inline-flex rounded-full px-2.5 py-0.5 text-[11px] font-semibold tracking-wide ${statusClasses[statusTone]}`}
        >
          {statusLabel}
        </span>
        <h3 className="mt-3 line-clamp-2 min-h-[2.75rem] text-lg font-bold leading-snug text-brand-800">
          {title}
        </h3>
        <p className="mt-2 flex items-center gap-2 text-sm text-slate-600">
          <CalendarIcon />
          <span className="line-clamp-1">{meta}</span>
        </p>
      </div>

      <div className="mt-5 hidden items-center justify-between border-t border-brand-100 pt-4 md:flex">
        <span className="text-sm font-semibold text-brand-800 transition-colors group-hover:text-accent-700">
          {actionLabel} →
        </span>
      </div>
    </article>
  )
}

function CalendarIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      className="h-4 w-4 shrink-0 text-slate-500"
      aria-hidden="true"
    >
      <rect x="3" y="5" width="18" height="16" rx="2" strokeWidth="1.75" />
      <path d="M8 3v4M16 3v4M3 10h18" strokeWidth="1.75" strokeLinecap="round" />
    </svg>
  )
}

function ChevronRightIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="h-5 w-5" aria-hidden="true">
      <path d="m9 6 6 6-6 6" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
