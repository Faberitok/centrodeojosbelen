import Footer from '@/components/layout/Footer'
import Navbar from '@/components/layout/Navbar'
import WhatsAppButton from '@/components/shared/WhatsAppButton'
import { site } from '@/content/site'
import { hasMaintenanceAccess, isMaintenanceEnabled } from '@/lib/maintenance/auth'
import { buildClinicJsonLd, buildFaqJsonLd } from '@/lib/seo/jsonld'
import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Figtree } from 'next/font/google'
import './globals.css'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim() || 'http://localhost:3000'
const maintenanceEnabled = isMaintenanceEnabled()

// El brandboard define Museo Sans 900, que es comercial y no está en Google
// Fonts. Figtree es el sustituto libre más cercano en estructura y peso.
// Si el centro provee la licencia web de Museo Sans, reemplazar por
// next/font/local sin tocar el resto del sistema (la variable no cambia).
//
// Sin `weight`: Figtree es variable, así que un solo archivo cubre 300–900.
// Enumerar pesos descargaría un archivo por cada uno.
const figtree = Figtree({
  subsets: ['latin'],
  variable: '--font-figtree',
  display: 'swap',
})

// "Oftalmología en Belén" a secas se lee raro junto a un centro que se llama
// Belén, así que el título lleva ciudad y provincia.
const location = `${site.city}, ${site.province}`
const title = `${site.name} — Oftalmología en ${location}`
const description = `Centro oftalmológico en ${location}: consultas, estudios diagnósticos, cirugía de cataratas, glaucoma, retina y oftalmología pediátrica. Sacá tu turno por WhatsApp.`

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: title,
    template: `%s | ${site.name}`,
  },
  description,
  applicationName: site.name,
  icons: {
    icon: '/favicon.svg',
  },
  keywords: [
    'oftalmología',
    'oftalmólogo',
    site.city,
    site.province,
    'cirugía de cataratas',
    'glaucoma',
    'retina',
    'control de la vista',
    'turnos oftalmología',
  ],
  alternates: {
    canonical: '/',
  },
  robots: maintenanceEnabled
    ? { index: false, follow: false }
    : { index: true, follow: true },
  // La imagen de OG y de Twitter sale de app/opengraph-image.jpg por convención
  // de archivo: Next la sirve con su tamaño y tipo, y Twitter cae en la de OG.
  openGraph: {
    title,
    description,
    url: '/',
    type: 'website',
    locale: 'es_AR',
    siteName: site.name,
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#101030',
  colorScheme: 'light',
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const hideChrome = isMaintenanceEnabled() && !(await hasMaintenanceAccess())

  return (
    <html lang="es-AR" className={`${figtree.variable} h-full antialiased`}>
      <body
        className={`min-h-full flex flex-col font-sans ${
          hideChrome ? 'maintenance-page' : 'bg-white text-brand-900'
        }`}
      >
        {hideChrome ? null : (
          <>
            <a
              href="#contenido"
              className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:top-3 focus:left-3 focus:rounded-md focus:bg-brand-900 focus:px-4 focus:py-2 focus:text-white"
            >
              Saltar al contenido
            </a>
            <Navbar />
          </>
        )}

        <main
          id="contenido"
          className={hideChrome ? 'flex-1' : 'flex-1 pt-16 md:pt-20'}
        >
          {children}
        </main>

        {hideChrome ? null : <Footer />}

        {/* Visible en todo el recorrido: es la puerta al chatbot del centro */}
        <WhatsAppButton variant="floating" />

        {!hideChrome && (
          /* JSON-LD va como <script> nativo y no con next/script: no es un
             script que se ejecute, es metadata que el crawler lee del HTML. */
          <script
            id="clinic-jsonld"
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify([buildClinicJsonLd(), buildFaqJsonLd()].flat()),
            }}
          />
        )}

        <Analytics />
      </body>
    </html>
  )
}
