'use client'

import { EmergencyPageComponent } from "@/components/emergency-page"
import { Sidebar } from "@/components/sidebar"

export default function EmergencyPage() {
  return (
    <div className="flex">
      <div className="hidden lg:block">
        <Sidebar />
      </div>
      <div className="flex-1 lg:ml-64">
        <EmergencyPageComponent />
      </div>
    </div>
  )
} 