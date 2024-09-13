'use client'

import React, { useState } from 'react'
import CycloneWarning from './CycloneWarning/CycloneWarning'
import WeatherInsights from './WeatherInsights/WeatherInsights'
import EmergencyAlerts from './EmergencyAlerts/EmergencyAlerts'
import EmergencyAIAssistant from './EmergencyAIAssistant/EmergencyAIAssistant'
import PreparationChecklist from './PreparationChecklist/PreparationChecklist'
import EmergencyActions from './EmergencyActions/EmergencyActions'
import AidTracker from './AidTracker/AidTracker'

interface Task {
  id: number;
  description: string;
}

export function HomePage() {
  return (
    <div className="container mx-auto px-4">
      <h1 className="text-2xl font-bold mb-4">Welcome to CrisisCore</h1>
      
      <CycloneWarning />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6 px-4">
        <WeatherInsights />
        <EmergencyAlerts />
        <EmergencyAIAssistant />
        <PreparationChecklist aiPlanTasks={[]} />
        <EmergencyActions />
        <AidTracker />
      </div>
    </div>
  )
}

