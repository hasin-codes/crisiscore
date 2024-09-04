'use client'

import React, { useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { AlertTriangle, Bell, Shield, Siren, CloudLightning, Wind, Droplets } from "lucide-react"
import Navbar from '@/components/Navbar'
import GridBackground from '@/app/components/GridBackground'

export default function AlertsPage() {
  useEffect(() => {
    // This effect will run when the component mounts
    document.title = "Alerts - CrisisCore"
  }, [])

  return (
    <div className="min-h-screen text-white font-sans">
      <GridBackground />
      <Navbar />
      
      <div className="p-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {['Active Alerts', 'Recent Alerts', 'Alert History'].map((title, index) => (
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

        <Card className="border-[#343434] shadow-[0_0_10px_rgba(255,255,255,0.1)] bg-white bg-opacity-10 backdrop-blur-[7px] mb-6">
          <CardHeader>
            <CardTitle className="text-white">Alert Details</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm">This is where detailed information about selected alerts will appear. It can include severity, affected areas, recommended actions, and other relevant data.</p>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
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

          <Card className="border-[#343434] shadow-[0_0_10px_rgba(255,255,255,0.1)] bg-white bg-opacity-10 backdrop-blur-[7px]">
            <CardHeader>
              <CardTitle className="flex items-center text-white">
                <Bell className="w-6 h-6 mr-2" />
                Alert Notifications
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-white">
                <li className="flex items-center">
                  <input type="checkbox" className="mr-2 form-checkbox text-white" />
                  <span>Enable push notifications</span>
                </li>
                <li className="flex items-center">
                  <input type="checkbox" className="mr-2 form-checkbox text-[#010B13]" />
                  <span>Enable email alerts</span>
                </li>
                <li className="flex items-center">
                  <input type="checkbox" className="mr-2 form-checkbox text-[#010B13]" />
                  <span>Enable SMS alerts</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border-red-700 shadow-[0_0_10px_rgba(255,255,255,0.1)] bg-white bg-opacity-10 backdrop-blur-[7px]">
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
                  Tornado warning for County A
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></span>
                  Flash flood watch for City B
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border-[#343434] shadow-[0_0_10px_rgba(255,255,255,0.1)] bg-white bg-opacity-10 backdrop-blur-[7px]">
            <CardHeader>
              <CardTitle className="flex items-center text-white">
                <Shield className="w-6 h-6 mr-2" />
                Alert Management
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Button className="w-full bg-yellow-600 hover:bg-yellow-500 text-white">
                  Create New Alert
                </Button>
                <Button className="w-full bg-blue-600 hover:bg-blue-500 text-white">
                  Update Existing Alert
                </Button>
                <Button className="w-full bg-red-600 hover:bg-red-500 text-white">
                  Cancel Active Alert
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}