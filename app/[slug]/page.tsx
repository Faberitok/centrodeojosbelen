import { conditionPages, site } from '@/content/site'
import { appointmentHref } from '@/lib/whatsapp'
import Button from '@/components/shared/Button'
import type { Metadata } from 'next'
import Image from 'next/image'
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
          <div className="relative z-10 flex items-center px-6 py-20 md:px-12 lg:px-[max(3rem,calc((100vw-1140px)/2))]">
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
              <div className="mt-9 flex flex-wrap gap-3">
                <Button href={ctaHref} external variant="accent">
                  {condition.ctaLabel}
                </Button>
                <Button href="/" variant="onDark">
                  Ir al inicio
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

      <section className="bg-white py-20 md:py-28">
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

      <section className="bg-brand-50 py-20">
        <div className="mx-auto max-w-[1140px] px-6">
          <h2 className="text-2xl font-extrabold text-brand-800">También puede interesarte</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {related.map((item) => (
              <article
                key={item.slug}
                className="flex flex-col rounded-2xl border border-brand-200 bg-white p-6"
              >
                <h3 className="text-lg font-extrabold text-brand-800">{item.title}</h3>
                <p className="mt-2 flex-1 text-[15px] text-brand-700">{item.lead}</p>
                <Button href={`/${item.slug}`} className="mt-6 w-fit">
                  Ver {item.title.toLowerCase()}
                </Button>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
