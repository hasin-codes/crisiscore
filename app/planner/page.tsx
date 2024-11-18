import { PreparednessPlannerComponent } from '@/components/preparedness-planner'
import { ClientProvider } from '@/components/providers/client-provider'

export default function PlannerPage() {
  return (
    <ClientProvider>
      <PreparednessPlannerComponent />
    </ClientProvider>
  )
} 