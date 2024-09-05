'use client'

import React from 'react'
import CycloneWarning from './CycloneWarning/CycloneWarning'
import ShelterMap from './Shelter/Shelter'
import EmergencyAlerts from './EmergencyAlerts/EmergencyAlerts'
import EmergencyAIAssistant from './EmergencyAIAssistant/EmergencyAIAssistant'
import PreparationChecklist from './PreparationChecklist/PreparationChecklist'
import EmergencyActions from './EmergencyActions/EmergencyActions'
import AidTracker from './AidTracker/AidTracker'

export function Emergency() {
  return (
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6 px-4">
        <ShelterMap/>
        <EmergencyAlerts />
        <EmergencyAIAssistant />
        <PreparationChecklist />
        <EmergencyActions />
        <AidTracker />
      </div>
  )
}