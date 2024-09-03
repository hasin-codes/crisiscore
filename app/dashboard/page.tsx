import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'

export default async function DashboardPage() {
  const { userId } = auth()

  if (!userId) {
    redirect('/sign-in')
  }

  // Your dashboard page content here
  return (
    <div>
      <h1>Dashboard</h1>
      {/* Other dashboard components */}
    </div>
  )
}