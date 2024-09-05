import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Phone, AlertTriangle } from "lucide-react"

const EmergencyActions = () => {
  return (
    <Card className="border-[#343434] shadow-[0_0_10px_rgba(255,255,255,0.1)] bg-white bg-opacity-10 backdrop-blur-[7px]">
      <CardHeader>
        <CardTitle className="flex items-center text-white">
          <svg className="w-6 h-6 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10 2L3 9L10 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M14 2L21 9L14 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <line x1="3" y1="22" x2="21" y2="22" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
          Emergency Actions
        </CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-2 gap-2">
        <Button variant="destructive" className="w-full text-white">
          <Phone className="w-4 h-4 mr-2" />
          SOS Call
        </Button>
        <Button variant="outline" className="w-full bg-yellow-900 text-yellow-100 border-yellow-700 hover:bg-yellow-800">
          <AlertTriangle className="w-4 h-4 mr-2" />
          Report Damage
        </Button>
        <Button variant="outline" className="w-full col-span-2 bg-[#010B13] text-white border-[#010B13] hover:bg-[#010B13]">
          <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
            <path d="M12 6V12L16 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
          Emergency Broadcast
        </Button>
      </CardContent>
    </Card>
  )
}

export default EmergencyActions