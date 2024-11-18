'use client'

import { DashboardComponent } from "@/components/dashboard"
import { Sidebar } from "@/components/sidebar"
import { useEffect, useState } from "react"

export default function Home() {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return null // or a loading spinner
  }

  return (
    <div className="flex">
      {/* Sidebar - only visible on laptop and larger screens */}
      <div className="hidden lg:block">
        <Sidebar />
      </div>
      
      {/* Main content area - takes full width on mobile, adjusts for sidebar on laptop */}
      <div className="flex-1 lg:ml-64">
        <DashboardComponent />
      </div>
    </div>
  )
}
