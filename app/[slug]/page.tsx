import { conditionPages, site } from '@/content/site'
import { appointmentHref } from '@/lib/whatsapp'
import Button from '@/components/shared/Button'
import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'

type PageProps = {
  params: Promise<{ slug: string }>
}

export const dynamicParams = false

function getCondition(slug: string) {
  return conditionPages.find((item) => item.slug === slug)
}

export function generateStaticParams() {
  return conditionPages.map((item) => ({ slug: item.slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const condition = getCondition(slug)
  if (!condition) return {}

  return {
    title: condition.title,
    description: condition.summary,
    alternates: { canonical: `/${condition.slug}` },
    openGraph: {
      title: `${condition.title} | ${site.name}`,
      description: condition.summary,
      url: `/${condition.slug}`,
      type: 'article',
    },
  }
}

export default async function ConditionPage({ params }: PageProps) {
  const { slug } = await params
  const condition = getCondition(slug)
  if (!condition) notFound()

  const ctaHref = appointmentHref(condition.whatsappMessage)
  const related = conditionPages.filter((item) => item.slug !== condition.slug)

  return (
    <>
      <section className="dark-brand-gradient relative overflow-hidden text-white">
        <div className="mx-auto grid min-h-[32rem] max-w-[1440px] lg:grid-cols-[1fr_0.9fr]">
          <div className="relative z-10 flex items-center px-6 py-14 md:px-12 lg:px-[max(3rem,calc((100vw-1140px)/2))]">
            <div className="max-w-2xl">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-accent-200">
                {condition.lead}
              </p>
              <h1 className="mt-4 text-4xl font-extrabold leading-[1.05] tracking-[-0.03em] md:text-6xl">
                {condition.title}
              </h1>
              <p className="mt-6 text-lg leading-relaxed text-white/90 md:text-xl">
                {condition.summary}
              </p>
              <div className="mt-9">
                <Button href={ctaHref} external variant="accent">
                  {condition.ctaLabel}
                </Button>
              </div>
            </div>
          </div>

          <div className="relative min-h-80 overflow-hidden lg:min-h-full">
            <Image
              src={condition.image}
              alt={condition.imageAlt}
              fill
              priority
              sizes="(min-width: 1024px) 45vw, 100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-brand-900/70 to-transparent" />
          </div>
        </div>
      </section>

      <section className="bg-white py-14 md:py-20">
        <div className="mx-auto max-w-[1140px] px-6">
          <ol className="grid gap-6 md:grid-cols-2">
            {condition.sections.map((section) => (
              <li key={section.title} className="rounded-[1.5rem] border border-brand-200 bg-brand-50 p-7">
                <h2 className="text-xl font-extrabold text-brand-800">{section.title}</h2>
                <p className="mt-3 leading-relaxed text-brand-700">{section.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="bg-brand-50 py-14">
        <div className="mx-auto max-w-[1140px] px-6">
          <h2 className="text-2xl font-extrabold text-brand-800">También puede interesarte</h2>
          <div className="mt-6 grid gap-3 md:grid-cols-3">
            {related.map((item) => (
              <Link
                key={item.slug}
                href={`/${item.slug}`}
                aria-label={`Ver detalle: ${item.title}`}
                className="group rounded-2xl border border-brand-200 bg-white text-left shadow-sm transition duration-300 hover:border-accent-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-700 md:flex md:h-full md:flex-col md:justify-between md:p-6 md:hover:-translate-y-0.5 md:hover:shadow-[0_18px_40px_-28px_rgba(16,16,48,0.35)]"
              >
                <div className="flex h-16 items-center gap-3 px-3 md:hidden">
                  <h3 className="min-w-0 flex-1 truncate text-sm font-bold text-brand-800">
                    {item.title}
                  </h3>
                  <span className="shrink-0 text-brand-500" aria-hidden="true">
                    <RelatedChevron />
                  </span>
                </div>
                <div className="hidden md:block">
                  <h3 className="text-lg font-bold leading-snug text-brand-800">{item.title}</h3>
                  <p className="mt-2 line-clamp-2 text-sm text-slate-600">{item.lead}</p>
                </div>
                <div className="mt-5 hidden items-center justify-between border-t border-brand-100 pt-4 md:flex">
                  <span className="text-sm font-semibold text-brand-800 transition-colors group-hover:text-accent-700">
                    Ver detalle →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

function RelatedChevron() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="h-5 w-5" aria-hidden="true">
      <path d="m9 6 6 6-6 6" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
