import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertTriangle } from "lucide-react"

const EmergencyAlerts = () => {
  return (
    <Card className="border-red-700 shadow-[0_0_10px_rgba(255,255,255,0.1)] bg-white bg-opacity-10 backdrop-blur-[7px] h-[300px] ">
      <CardHeader>
        <CardTitle className="flex items-center text-white">
          <AlertTriangle className="w-6 h-6 mr-2" />
          Emergency Alerts
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2 text-white">
          <li className="flex items-center">
            <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
            Water levels critical in Zone A
          </li>
          <li className="flex items-center">
            <span className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></span>
            Evacuation order for Sector 7
          </li>
          <li className="flex items-center">
            <span className="w-2 h-2 bg-orange-500 rounded-full mr-2"></span>
            High wind warning for coastal areas
          </li>
          <li className="flex items-center">
            <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
            Flash flood watch in effect
          </li>
        </ul>
      </CardContent>
    </Card>
  )
}

export default EmergencyAlerts