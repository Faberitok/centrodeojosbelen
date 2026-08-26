import Footer from '@/components/layout/Footer'
import Navbar from '@/components/layout/Navbar'
import WhatsAppButton from '@/components/shared/WhatsAppButton'
import { hasMaintenanceAccess, isMaintenanceEnabled } from '@/lib/maintenance/auth'
import type { Metadata } from 'next'
import { Plus_Jakarta_Sans } from 'next/font/google'
import './globals.css'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim() || 'http://localhost:3000'
const maintenanceEnabled = isMaintenanceEnabled()

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-plus-jakarta-sans',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: 'Software a Medida y Automatizaciones para Emprendedores, Pymes y Empresas | FaberIT — Catamarca, Argentina',
  description:
    'Desarrollamos software a medida, automatizaciones e integraciones con IA para emprendedores, pymes y empresas. Agendá una reunión y recibí una propuesta técnica clara para tu negocio, sea chico, mediano o grande.',
  alternates: {
    canonical: '/',
  },
  robots: maintenanceEnabled
    ? {
        index: false,
        follow: false,
      }
    : {
        index: true,
        follow: true,
      },
  openGraph: {
    title: 'Software a Medida y Automatizaciones para Emprendedores, Pymes y Empresas | FaberIT — Catamarca, Argentina',
    description:
      'Impulsamos emprendedores, pymes y empresas con software a medida, automatizaciones e IA aplicada. Contanos tu desafío y te proponemos un plan accionable.',
    url: '/',
    type: 'website',
    locale: 'es_AR',
    siteName: 'FaberIT',
    images: [
      {
        url: '/images/faberit_og.webp',
        width: 1200,
        height: 630,
        alt: 'FaberIT - Desarrollo de software a medida para emprendedores, pymes y empresas',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Software a Medida y Automatizaciones para Emprendedores, Pymes y Empresas | FaberIT — Catamarca, Argentina',
    description:
      'Software a medida, automatizaciones e IA aplicada para resolver procesos reales en emprendimientos, pymes y empresas.',
    images: ['/images/faberit_og.webp'],
  },
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const hideChrome = isMaintenanceEnabled() && !(await hasMaintenanceAccess())

  return (
    <html lang="es" className={`${plusJakartaSans.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-sans">
        {hideChrome ? null : <Navbar />}
        <main className="flex-1">{children}</main>
        {hideChrome ? null : <Footer />}
        {hideChrome ? null : (
          /* Floating WhatsApp button — renders null when NEXT_PUBLIC_WHATSAPP_NUMBER is absent */
          <WhatsAppButton variant="floating" />
        )}
      </body>
    </html>
  )
}
