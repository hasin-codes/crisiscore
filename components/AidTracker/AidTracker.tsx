import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Send } from "lucide-react"

const AidTracker = () => {
  return (
    <Card className="col-span-1 md:col-span-2 border-[#343434] shadow-[0_0_10px_rgba(255,255,255,0.1)] bg-white bg-opacity-10 backdrop-blur-[7px]">
      <CardHeader>
        <CardTitle className="flex items-center text-white">
          <Send className="w-6 h-6 mr-2" />
          Aid Tracker
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium text-white">Aid Request #1274</span>
              <span className="text-sm font-medium text-white">70%</span>
            </div>
            <Progress value={70} className="w-full" />
          </div>
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium text-white">Aid Dispatch #892</span>
              <span className="text-sm font-medium text-white">40%</span>
            </div>
            <Progress value={40} className="w-full" />
          </div>
          <Button className="w-full bg-green-700 hover:bg-green-600 text-white">
            Request/Send Aid
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

export default AidTracker