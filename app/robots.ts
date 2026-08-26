import type { MetadataRoute } from 'next'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim() || 'http://localhost:3000'

function maintenanceModeEnabled(): boolean {
  const raw = process.env.MAINTENANCE_MODE_ENABLED?.trim().toLowerCase()
  return raw === '1' || raw === 'true' || raw === 'yes' || raw === 'on'
}

export default function robots(): MetadataRoute.Robots {
  const blockedByMaintenance = maintenanceModeEnabled()

  return {
    rules: blockedByMaintenance
      ? {
          userAgent: '*',
          disallow: '/',
        }
      : {
          userAgent: '*',
          allow: '/',
        },
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  }
}
