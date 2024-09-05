import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function AlertDetails() {
  return (
    <Card className="border-[#343434] shadow-[0_0_10px_rgba(255,255,255,0.1)] bg-white bg-opacity-10 backdrop-blur-[7px] mb-6">
      <CardHeader>
        <CardTitle className="text-white">Alert Details</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm">This is where detailed information about selected alerts will appear. It can include severity, affected areas, recommended actions, and other relevant data.</p>
      </CardContent>
    </Card>
  )
}