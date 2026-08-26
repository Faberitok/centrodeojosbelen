import ClientLogos from '@/components/sections/ClientLogos'
import Differentiator from '@/components/sections/Differentiator'
import Hero from '@/components/sections/Hero'
import MaintenanceGate from '@/components/sections/MaintenanceGate'
import Process from '@/components/sections/Process'
import Services from '@/components/sections/Services'
import Solutions from '@/components/sections/Solutions'
import Testimonials from '@/components/sections/Testimonials'
import ContactForm from '@/components/shared/ContactForm'
import SectionWrapper from '@/components/shared/SectionWrapper'
import { contact } from '@/content/landing'
import { hasMaintenanceAccess, isMaintenanceEnabled } from '@/lib/maintenance/auth'

export default async function Page() {
  if (isMaintenanceEnabled() && !(await hasMaintenanceAccess())) {
    return <MaintenanceGate />
  }

  return (
    <>
      <Hero />
      <Services />
      <Process />
      <Solutions />
      <Differentiator />
      <Testimonials />
      <ClientLogos />

      {/* Contact section */}
      <SectionWrapper id="contacto" className="py-24 bg-white">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-brand-900 mb-4">
              {contact.heading}
            </h2>
            <p className="text-lg text-brand-600">{contact.subtext}</p>
          </div>
          <ContactForm />
        </div>
      </SectionWrapper>
    </>
  )
}
