'use client'

import { AlertsPageComponent } from "@/components/alerts-page"
import { Sidebar } from "@/components/sidebar"

export default function AlertsPage() {
  return (
    <div className="flex">
      <div className="hidden lg:block">
        <Sidebar />
      </div>
      <div className="flex-1 lg:ml-64">
        <AlertsPageComponent />
      </div>
    </div>
  )
} 