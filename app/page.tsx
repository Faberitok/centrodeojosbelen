import About from '@/components/sections/About'
import CareStages from '@/components/sections/CareStages'
import Contact from '@/components/sections/Contact'
import Faq from '@/components/sections/Faq'
import HealthPlans from '@/components/sections/HealthPlans'
import Hero from '@/components/sections/Hero'
import Locations from '@/components/sections/Locations'
import MaintenanceGate from '@/components/sections/MaintenanceGate'
import Procedures from '@/components/sections/Procedures'
import Services from '@/components/sections/Services'
import Staff from '@/components/sections/Staff'
import Studies from '@/components/sections/Studies'
import Technology from '@/components/sections/Technology'
import { hasMaintenanceAccess, isMaintenanceEnabled } from '@/lib/maintenance/auth'

export default async function Page() {
  if (isMaintenanceEnabled() && !(await hasMaintenanceAccess())) {
    return <MaintenanceGate />
  }

  return (
    <>
      <Hero />
      <CareStages />
      <Technology />
      <Staff />
      <Services />
      <Studies />
      <Procedures />
      <About />
      <HealthPlans />
      <Locations />
      <Faq />
      <Contact />
    </>
  )
}
