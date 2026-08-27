import About from '@/components/sections/About'
import Contact from '@/components/sections/Contact'
import Faq from '@/components/sections/Faq'
import HealthPlans from '@/components/sections/HealthPlans'
import Hero from '@/components/sections/Hero'
import Locations from '@/components/sections/Locations'
import MaintenanceGate from '@/components/sections/MaintenanceGate'
import Services from '@/components/sections/Services'
import { hasMaintenanceAccess, isMaintenanceEnabled } from '@/lib/maintenance/auth'

export default async function Page() {
  if (isMaintenanceEnabled() && !(await hasMaintenanceAccess())) {
    return <MaintenanceGate />
  }

  return (
    <>
      <Hero />
      <Services />
      <About />
      <HealthPlans />
      <Locations />
      <Faq />
      <Contact />
    </>
  )
}
