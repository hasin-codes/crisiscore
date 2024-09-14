'use client'

import React, { useState, useEffect } from 'react'
import CycloneWarning from './CycloneWarning/CycloneWarning'
import ShelterMap from './Shelter/Shelter'
import EmergencyAlerts from './EmergencyAlerts/EmergencyAlerts'
import EmergencyAIAssistant from './EmergencyAIAssistant/EmergencyAIAssistant'
import PreparationChecklist from './PreparationChecklist/PreparationChecklist'
import EmergencyActions from './EmergencyActions/EmergencyActions'
import AidTracker from './AidTracker/AidTracker'

export function Emergency() {
  const [aiPlanTasks, setAiPlanTasks] = useState([]);

  useEffect(() => {
    // Fetch or compute aiPlanTasks here
    // For now, we'll use an empty array as a placeholder
    setAiPlanTasks([]);
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6 px-4">
      <ShelterMap/>
      <EmergencyAlerts />
      <EmergencyAIAssistant />
      <PreparationChecklist aiPlanTasks={aiPlanTasks} />
      <EmergencyActions />
      <AidTracker />
    </div>
  )
}

