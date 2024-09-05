'use client'

import React from 'react'
import EmergencyAlerts from './EmergencyAlerts/EmergencyAlerts'
import EmergencyAIAssistant from './EmergencyAIAssistant/EmergencyAIAssistant'
import PreparationChecklist from './PreparationChecklist/PreparationChecklist'
import EmergencyActions from './EmergencyActions/EmergencyActions'
import AidTracker from './AidTracker/AidTracker'
import PlannerComponent from './planner/Planner'

export default function Planner() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6 px-4">
      <PlannerComponent />
      <EmergencyAlerts />
      <EmergencyAIAssistant />
      <PreparationChecklist />
      <EmergencyActions />
      <AidTracker />
    </div>
  )
}