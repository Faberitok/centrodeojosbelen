'use client'

import ServiceDetailPanel, {
  type ServiceDetailItem,
} from '@/components/shared/ServiceDetailPanel'
import ServiceSummaryCard, {
  type ServiceStatusTone,
} from '@/components/shared/ServiceSummaryCard'
import { procedures, proceduresDisclosure } from '@/content/site'
import { appointmentHref } from '@/lib/whatsapp'
import { useMemo, useState } from 'react'

function statusTone(label: string): ServiceStatusTone {
  return label === 'Ambulatorio' ? 'available' : 'info'
}

function toDetail(procedure: (typeof procedures)[number]): ServiceDetailItem {
  return {
    id: procedure.id,
    title: procedure.title,
    dateLabel: procedure.dateLabel,
    statusLabel: procedure.statusLabel,
    statusTone: statusTone(procedure.statusLabel),
    image: {
      src: procedure.image,
      alt: procedure.imageAlt,
    },
    meta: [
      {
        label: proceduresDisclosure.indicatedByLabel,
        value: proceduresDisclosure.indicatedByValue,
      },
    ],
    sections: [
      { title: proceduresDisclosure.sections.overview, body: procedure.description },
      { title: proceduresDisclosure.sections.preparation, body: procedure.preparation },
      { title: proceduresDisclosure.sections.treatment, body: procedure.treatment },
    ],
    primaryAction: {
      label: proceduresDisclosure.consultAction,
      href: appointmentHref(
        `${proceduresDisclosure.consultMessagePrefix}${procedure.title}`,
      ),
      external: true,
    },
    secondaryAction:
      procedure.href && procedure.ctaLabel
        ? { label: procedure.ctaLabel, href: procedure.href }
        : undefined,
  }
}

export default function ProceduresCatalog() {
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const items = useMemo(() => procedures.map(toDetail), [])
  const selectedItem = items.find((item) => item.id === selectedId) ?? null

  return (
    <section className="bg-white py-12 md:py-16">
      <div className="mx-auto max-w-[1140px] px-6">
        <ul className="grid grid-cols-2 items-stretch gap-3 md:grid-cols-4 md:gap-5">
          {items.map((item) => (
            <li key={item.id} className="min-h-0">
              <ServiceSummaryCard
                title={item.title}
                dateLabel={item.dateLabel}
                statusLabel={item.statusLabel}
                statusTone={item.statusTone}
                actionLabel={proceduresDisclosure.action}
                onOpen={() => setSelectedId(item.id)}
              />
            </li>
          ))}
        </ul>
      </div>

      <ServiceDetailPanel
        item={selectedItem}
        onClose={() => setSelectedId(null)}
        closeLabel={proceduresDisclosure.close}
      />
    </section>
  )
}
