import { EmergencyPageComponent } from '@/components/emergency-page'
import { ClientProvider } from '@/components/providers/client-provider'

export default function EmergencyPage() {
  return (
    <ClientProvider>
      <EmergencyPageComponent />
    </ClientProvider>
  )
} 