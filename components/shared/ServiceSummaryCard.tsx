import Button from '@/components/shared/Button'

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
  available: 'bg-accent-50 text-accent-800',
  info: 'bg-brand-100 text-brand-800',
}

export default function ServiceSummaryCard({
  title,
  dateLabel,
  statusLabel,
  statusTone = 'available',
  actionLabel,
  onOpen,
}: ServiceSummaryCardProps) {
  return (
    <article className="flex h-60 flex-col rounded-[1.75rem] border border-brand-200 bg-white p-5 shadow-[0_18px_50px_-42px_rgba(16,16,48,0.5)] md:p-6">
      <h3 className="line-clamp-2 text-xl font-extrabold leading-tight text-brand-800">
        {title}
      </h3>
      <p className="mt-3 flex items-center gap-2 text-[15px] font-medium text-brand-700">
        <CalendarIcon />
        <span>{dateLabel}</span>
      </p>
      <span
        className={`mt-3 inline-flex w-fit rounded-full px-3 py-1 text-xs font-bold tracking-wide ${statusClasses[statusTone]}`}
      >
        {statusLabel}
      </span>
      <div
        className="mt-auto"
        onPointerDown={(event) => event.stopPropagation()}
        onPointerUp={(event) => event.stopPropagation()}
      >
        <Button type="button" onClick={onOpen} className="w-full">
          {actionLabel}
        </Button>
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
      className="h-4 w-4 shrink-0 text-accent-700"
      aria-hidden="true"
    >
      <rect x="3" y="5" width="18" height="16" rx="2" strokeWidth="2" />
      <path d="M8 3v4M16 3v4M3 10h18" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}
