'use client'

import { PreparednessPlannerComponent } from "@/components/preparedness-planner"
import { Sidebar } from "@/components/sidebar"

export default function PlannerPage() {
  return (
    <div className="flex">
      <div className="hidden lg:block">
        <Sidebar />
      </div>
      <div className="flex-1 lg:ml-64">
        <PreparednessPlannerComponent />
      </div>
    </div>
  )
} 