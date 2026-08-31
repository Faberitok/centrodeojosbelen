import type { MetadataRoute } from 'next'
import { conditionPages } from '@/content/site'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim() || 'http://localhost:3000'

export default function sitemap(): MetadataRoute.Sitemap {
  const detailPages: MetadataRoute.Sitemap = conditionPages.map((page) => ({
    url: `${siteUrl}/${page.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.8,
  }))

  return [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    ...detailPages,
  ]
}
