import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const alertTypes = ['Active Alerts', 'Recent Alerts', 'Alert History']

export default function AlertCards() {
  return (
    <div className="grid grid-cols-3 gap-4 mb-6">
      {alertTypes.map((title, index) => (
        <Card key={index} className="border-[#343434] shadow-[0_0_10px_rgba(255,255,255,0.1)] bg-white bg-opacity-10 backdrop-blur-[7px]">
          <CardHeader>
            <CardTitle className="text-white">{title}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm">Content for {title}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}