import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Siren } from "lucide-react"

const CurrentAlerts = () => {
  return (
    <Card className="border-[#343434] shadow-[0_0_10px_rgba(255,255,255,0.1)] bg-white bg-opacity-10 backdrop-blur-[7px]">
      <CardHeader>
        <CardTitle className="flex items-center text-white">
          <Siren className="w-6 h-6 mr-2" />
          Current Alerts
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Card className="mb-2 bg-[#010B13] text-white">
          <CardHeader>
            <CardTitle className="text-sm">Flood Warning</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs">Flood warning for riverside areas</p>
          </CardContent>
        </Card>
        <Card className="bg-[#010B13] text-white">
          <CardHeader>
            <CardTitle className="text-sm">Severe Thunderstorm</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs">Severe thunderstorm expected in the evening</p>
          </CardContent>
        </Card>
      </CardContent>
    </Card>
  )
}

export default CurrentAlerts