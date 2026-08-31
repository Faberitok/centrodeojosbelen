import { conditionPages, site } from '@/content/site'
import { appointmentHref } from '@/lib/whatsapp'
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
    title: condition.eyebrow,
    description: condition.summary,
    alternates: { canonical: `/${condition.slug}` },
    openGraph: {
      title: `${condition.eyebrow} | ${site.name}`,
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
      <section className="relative overflow-hidden bg-brand-900 text-white">
        <div className="mx-auto grid min-h-[36rem] max-w-[1440px] lg:grid-cols-[1fr_0.9fr]">
          <div className="relative z-10 flex items-center px-6 py-20 md:px-12 lg:px-[max(3rem,calc((100vw-1140px)/2))]">
            <div className="max-w-2xl">
              <Link
                href="/#servicios"
                className="inline-flex min-h-11 items-center gap-2 text-sm font-bold text-accent-300 underline underline-offset-4 hover:text-accent-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-300"
              >
                <span aria-hidden="true">←</span>
                Volver al inicio
              </Link>
              <p className="mt-10 text-xs font-bold uppercase tracking-[0.18em] text-accent-300">
                {condition.eyebrow}
              </p>
              <h1 className="mt-4 text-4xl font-extrabold leading-[1.05] tracking-[-0.03em] md:text-6xl">
                {condition.title}
              </h1>
              <p className="mt-6 text-lg leading-relaxed text-brand-100 md:text-xl">
                {condition.summary}
              </p>
              <a
                href={ctaHref}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-9 inline-flex min-h-13 items-center justify-center rounded-full bg-accent-500 px-7 py-4 font-bold text-brand-900 transition hover:bg-accent-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-brand-900"
              >
                {condition.ctaLabel}
              </a>
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
            <div className="absolute inset-0 bg-gradient-to-r from-brand-900/55 to-transparent lg:from-brand-900/30" />
          </div>
        </div>
      </section>

      <section className="bg-white py-20 md:py-28">
        <div className="mx-auto max-w-[1140px] px-6">
          <div className="grid gap-12 lg:grid-cols-[0.7fr_1.3fr]">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-accent-700">
                Evaluación personalizada
              </p>
              <h2 className="mt-3 text-3xl font-extrabold leading-tight text-brand-900">
                Cada ojo necesita una indicación propia
              </h2>
            </div>
            <ol className="divide-y divide-brand-200 border-y border-brand-200">
              {condition.sections.map((section, index) => (
                <li key={section.title} className="grid gap-3 py-7 sm:grid-cols-[3rem_1fr]">
                  <span className="font-mono text-sm font-bold text-accent-700">
                    0{index + 1}
                  </span>
                  <div>
                    <h3 className="text-xl font-extrabold text-brand-900">{section.title}</h3>
                    <p className="mt-3 leading-relaxed text-brand-700">{section.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className="bg-brand-50 py-20">
        <div className="mx-auto max-w-[1140px] px-6">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-accent-700">
            También puede interesarte
          </p>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {related.map((item) => (
              <Link
                key={item.slug}
                href={`/${item.slug}`}
                className="group rounded-2xl border border-brand-200 bg-white p-6 transition hover:-translate-y-1 hover:border-accent-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-700"
              >
                <span className="text-lg font-extrabold text-brand-900 group-hover:text-accent-800">
                  {item.eyebrow}
                </span>
                <span className="mt-5 block font-bold text-accent-800">Conocer más →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
