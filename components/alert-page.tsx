'use client'

import React, { useEffect } from 'react'
import GridBackground from '@/app/components/GridBackground'
import AlertCards from '@/components/AlertCards/AlertCards'
import AlertDetails from '@/components/AlertDetails/AlertDetails'
import CurrentAlerts from '@/components/CurrentAlerts/CurrentAlerts'
import EmergencyAlerts from '@/components/EmergencyAlerts/EmergencyAlerts'
import EmergencyActions from './EmergencyActions/EmergencyActions'
import EmergencyAIAssistant from './EmergencyAIAssistant/EmergencyAIAssistant'
import AidTracker from './AidTracker/AidTracker'

export default function AlertsPage() {
  useEffect(() => {
    // This effect will run when the component mounts
    document.title = "Alerts - CrisisCore"
  }, [])

  return (
    <div className="min-h-screen text-white font-sans">
      <GridBackground />
      
      <div className="p-4">
        <AlertCards />
        <AlertDetails />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
          <CurrentAlerts />
          <EmergencyActions />
          <EmergencyAIAssistant />
          <AidTracker />
        </div>
      </div>
    </div>
  )
}