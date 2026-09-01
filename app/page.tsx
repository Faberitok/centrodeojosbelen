import ConditionCards from '@/components/sections/ConditionCards'
import Contact from '@/components/sections/Contact'
import Faq from '@/components/sections/Faq'
import HealthPlans from '@/components/sections/HealthPlans'
import Hero from '@/components/sections/Hero'
import Locations from '@/components/sections/Locations'
import MaintenanceGate from '@/components/sections/MaintenanceGate'
import ServiceOverview from '@/components/sections/ServiceOverview'
import Services from '@/components/sections/Services'
import Staff from '@/components/sections/Staff'
import { hasMaintenanceAccess, isMaintenanceEnabled } from '@/lib/maintenance/auth'

export default async function Page() {
  if (isMaintenanceEnabled() && !(await hasMaintenanceAccess())) {
    return <MaintenanceGate />
  }

  return (
    <div className="landing-stack">
      <Hero />
      <ServiceOverview />
      <Services />
      <Staff />
      <ConditionCards />
      <HealthPlans />
      <Locations />
      <Faq />
      <Contact />
    </div>
  )
}
