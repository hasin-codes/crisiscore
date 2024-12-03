'use client'

import { DashboardComponent } from "@/components/dashboard"
import { useEffect, useState } from "react"

export default function Home() {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return null
  }

  return <DashboardComponent />
}
