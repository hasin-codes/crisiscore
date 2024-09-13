import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Phone, AlertTriangle, Radio } from "lucide-react"

const EmergencyActions = () => {
  return (
    <Card className="border-[#343434] shadow-[0_0_10px_rgba(255,255,255,0.1)] bg-white bg-opacity-10 backdrop-blur-[7px]">
      <CardHeader>
        <CardTitle className="flex items-center text-white text-xl sm:text-2xl">
          <AlertTriangle className="w-6 h-6 sm:w-8 sm:h-8 mr-2 sm:mr-3" />
          Emergency Actions
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4 sm:p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          <Button  variant="outline" 
            className="w-full h-12 sm:h-14 text-base sm:text-lg font-semibold bg-red-600 text-red-100 border-red-500 hover:bg-red-700"
          >
            <Phone className="w-5 h-5 sm:w-6 sm:h-6 mr-2" />
            SOS Call
          </Button>
          <Button 
            variant="outline" 
            className="w-full h-12 sm:h-14 text-base sm:text-lg font-semibold bg-yellow-600 text-yellow-100 border-yellow-500 hover:bg-yellow-700"
          >
            <AlertTriangle className="w-5 h-5 sm:w-6 sm:h-6 mr-2" />
            Report Damage
          </Button>
          <Button 
            variant="outline" 
            className="w-full h-12 sm:h-14 text-base sm:text-lg font-semibold col-span-1 sm:col-span-2 bg-blue-600 text-white border-blue-500 hover:bg-blue-700"
          >
            <Radio className="w-5 h-5 sm:w-6 sm:h-6 mr-2" />
            Emergency Broadcast
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

export default EmergencyActions