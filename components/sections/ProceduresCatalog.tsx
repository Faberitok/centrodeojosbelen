'use client'

import CardCarousel from '@/components/shared/CardCarousel'
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
    imageActionLabel: proceduresDisclosure.imageAction,
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
        <CardCarousel
          ariaLabel="Cirugías y procedimientos"
          prevLabel="Ver procedimiento anterior"
          nextLabel="Ver procedimiento siguiente"
          infinite
          controlsClassName="md:hidden"
          itemClassName="w-[min(86vw,22rem)] shrink-0 md:w-auto md:max-w-none"
          desktopGridClassName="md:grid md:grid-cols-2 md:overflow-visible"
          listClassName="items-stretch"
        >
          {items.map((item) => (
            <ServiceSummaryCard
              key={item.id}
              title={item.title}
              dateLabel={item.dateLabel}
              statusLabel={item.statusLabel}
              statusTone={item.statusTone}
              actionLabel={proceduresDisclosure.action}
              onOpen={() => setSelectedId(item.id)}
            />
          ))}
        </CardCarousel>
      </div>

      <ServiceDetailPanel
        item={selectedItem}
        onClose={() => setSelectedId(null)}
        closeLabel={proceduresDisclosure.close}
      />
    </section>
  )
}
