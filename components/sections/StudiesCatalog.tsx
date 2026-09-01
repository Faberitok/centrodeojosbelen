'use client'

import ServiceDetailPanel, {
  type ServiceDetailItem,
} from '@/components/shared/ServiceDetailPanel'
import ServiceSummaryCard from '@/components/shared/ServiceSummaryCard'
import { studies, studiesDisclosure } from '@/content/site'
import { appointmentHref } from '@/lib/whatsapp'
import { useMemo, useState } from 'react'

function toDetail(study: (typeof studies)[number]): ServiceDetailItem {
  return {
    id: study.id,
    title: study.title,
    dateLabel: `${studiesDisclosure.dateLabel} · ${study.duration}`,
    statusLabel: studiesDisclosure.statusLabel,
    statusTone: 'available',
    image: {
      src: study.image,
      alt: `Realización de ${study.title}`,
    },
    lead: study.description,
    meta: [
      { label: studiesDisclosure.durationLabel, value: study.duration },
      { label: studiesDisclosure.indicatedByLabel, value: studiesDisclosure.indicatedByValue },
    ],
    sections: [
      { title: studiesDisclosure.sections.purpose, body: study.purpose },
      { title: studiesDisclosure.sections.experience, body: study.experience },
      { title: studiesDisclosure.sections.preparation, body: study.preparation },
      { title: studiesDisclosure.sections.equipment, body: study.equipment },
    ],
    primaryAction: {
      label: studiesDisclosure.consultAction,
      href: appointmentHref(`${studiesDisclosure.consultMessagePrefix}${study.title}`),
      external: true,
    },
  }
}

export default function StudiesCatalog() {
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const items = useMemo(() => studies.map(toDetail), [])
  const selectedItem = items.find((item) => item.id === selectedId) ?? null

  return (
    <section className="bg-white py-12 md:py-16">
      <div className="mx-auto max-w-[1140px] px-6">
        <ul className="grid grid-cols-1 items-stretch gap-3 md:grid-cols-3 md:gap-5">
          {items.map((item) => (
            <li key={item.id} className="min-h-0">
              <ServiceSummaryCard
                title={item.title}
                dateLabel={item.dateLabel}
                statusLabel={item.statusLabel}
                statusTone={item.statusTone}
                actionLabel={studiesDisclosure.action}
                onOpen={() => setSelectedId(item.id)}
              />
            </li>
          ))}
        </ul>
      </div>

      <ServiceDetailPanel
        item={selectedItem}
        onClose={() => setSelectedId(null)}
        closeLabel={studiesDisclosure.close}
      />
    </section>
  )
}
