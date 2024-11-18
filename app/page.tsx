import { DashboardComponent } from '@/components/dashboard'
import { ClientProvider } from '@/components/providers/client-provider'

export default function Home() {
  return (
    <ClientProvider>
      <DashboardComponent />
    </ClientProvider>
  )
}
