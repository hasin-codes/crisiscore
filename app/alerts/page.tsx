import { AlertsPageComponent } from '@/components/alerts-page'
import { ClientProvider } from '@/components/providers/client-provider'

export default function AlertsPage() {
  return (
    <ClientProvider>
      <AlertsPageComponent />
    </ClientProvider>
  )
} 