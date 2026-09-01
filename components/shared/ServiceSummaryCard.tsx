export type ServiceStatusTone = 'available' | 'info'

interface ServiceSummaryCardProps {
  title: string
  dateLabel: string
  statusLabel: string
  statusTone?: ServiceStatusTone
  actionLabel: string
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
  onOpen,
}: ServiceSummaryCardProps) {
  const meta = supportingMeta(dateLabel, statusLabel)

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
      className="group flex h-full cursor-pointer flex-col justify-between rounded-2xl border border-brand-200 bg-white p-6 text-left shadow-sm transition duration-300 hover:-translate-y-0.5 hover:scale-[1.015] hover:border-accent-300 hover:shadow-[0_18px_40px_-28px_rgba(16,16,48,0.35)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-700"
    >
      <div>
        <span
          className={`inline-flex rounded-full px-2.5 py-0.5 text-[11px] font-semibold tracking-wide ${statusClasses[statusTone]}`}
        >
          {statusLabel}
        </span>
        <h3 className="mt-3 line-clamp-2 min-h-[2.75rem] text-base font-bold leading-snug text-brand-800 md:text-lg">
          {title}
        </h3>
        <p className="mt-2 flex items-center gap-2 text-sm text-slate-600">
          <CalendarIcon />
          <span className="line-clamp-1">{meta}</span>
        </p>
      </div>

      <div className="mt-5 flex items-center justify-between border-t border-brand-100 pt-4">
        <span className="text-sm font-semibold text-brand-800 transition-colors group-hover:text-accent-700">
          {actionLabel}
          <span className="hidden md:inline"> →</span>
        </span>
        <span
          className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-brand-200/80 text-brand-600 transition-colors group-hover:border-accent-300 group-hover:text-accent-700 md:hidden"
          aria-hidden="true"
        >
          <ChevronUpIcon />
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

function ChevronUpIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="h-4 w-4" aria-hidden="true">
      <path d="m6 14 6-6 6 6" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
