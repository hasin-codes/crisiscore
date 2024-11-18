'use client'

import React, { useState } from 'react'
import { CheckCircle2, Clock, Download, Plus, Share2, User } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { motion } from 'framer-motion'

export function PreparednessPlannerComponent() {
  const [selectedLocation, setSelectedLocation] = useState('')

  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5 } }
  }

  return (
    <div className="min-h-screen bg-zinc-900 text-white p-4 md:p-8">
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">CrisisCore</h1>
        <Avatar className="h-10 w-10">
          <AvatarImage src="/placeholder-avatar.jpg" alt="User" />
          <AvatarFallback><User className="h-6 w-6" /></AvatarFallback>
        </Avatar>
      </header>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        <motion.div 
          className="md:col-span-2 lg:col-span-3"
          initial="hidden"
          animate="visible"
          variants={fadeIn}
        >
          <Card className="bg-zinc-800 border-zinc-700">
            <CardHeader>
              <CardTitle className="text-xl text-white">Your Checklist Plans</CardTitle>
              <CardDescription className="text-zinc-400">AI-generated emergency preparedness plans</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="plan-type" className="text-white">Select Plan Type</Label>
                <Select onValueChange={(value) => console.log(value)}>
                  <SelectTrigger id="plan-type" className="bg-zinc-700 border-zinc-600 text-white">
                    <SelectValue placeholder="Choose a plan type" />
                  </SelectTrigger>
                  <SelectContent className="bg-zinc-700 border-zinc-600">
                    <SelectItem value="natural-disaster">Natural Disaster</SelectItem>
                    <SelectItem value="pandemic">Pandemic</SelectItem>
                    <SelectItem value="civil-unrest">Civil Unrest</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">Generate Plan</Button>
              <div className="space-y-2">
                <h3 className="font-semibold text-white">Generated Plan Checklist</h3>
                {['Gather essential supplies', 'Create communication plan', 'Identify evacuation routes'].map((item, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <Checkbox id={`item-${index}`} className="border-zinc-500 text-blue-500" />
                    <Label htmlFor={`item-${index}`} className="text-zinc-300">{item}</Label>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial="hidden" animate="visible" variants={fadeIn}>
          <Card className="bg-zinc-800 border-zinc-700">
            <CardHeader>
              <CardTitle className="text-xl text-white">Emergency Kit Checklist</CardTitle>
              <CardDescription className="text-zinc-400">Track your emergency supplies</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="essentials" className="w-full">
                <TabsList className="grid w-full grid-cols-3 bg-zinc-700">
                  <TabsTrigger value="essentials" className="text-zinc-300 data-[state=active]:bg-zinc-600">Essentials</TabsTrigger>
                  <TabsTrigger value="firstaid" className="text-zinc-300 data-[state=active]:bg-zinc-600">First Aid</TabsTrigger>
                  <TabsTrigger value="tools" className="text-zinc-300 data-[state=active]:bg-zinc-600">Tools</TabsTrigger>
                </TabsList>
                <TabsContent value="essentials" className="space-y-4 mt-4">
                  {['Water (1 gallon per person per day)', 'Non-perishable food (3-day supply)', 'Battery-powered radio', 'Flashlight and extra batteries'].map((item, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <Checkbox id={`essential-${index}`} className="border-zinc-500 text-blue-500" />
                      <Label htmlFor={`essential-${index}`} className="text-zinc-300">{item}</Label>
                    </div>
                  ))}
                </TabsContent>
                <TabsContent value="firstaid" className="space-y-4 mt-4">
                  {['First aid kit', 'Prescription medications', 'Hand sanitizer'].map((item, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <Checkbox id={`firstaid-${index}`} className="border-zinc-500 text-blue-500" />
                      <Label htmlFor={`firstaid-${index}`} className="text-zinc-300">{item}</Label>
                    </div>
                  ))}
                </TabsContent>
                <TabsContent value="tools" className="space-y-4 mt-4">
                  {['Multi-purpose tool', 'Whistle to signal for help', 'Duct tape'].map((item, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <Checkbox id={`tool-${index}`} className="border-zinc-500 text-blue-500" />
                      <Label htmlFor={`tool-${index}`} className="text-zinc-300">{item}</Label>
                    </div>
                  ))}
                </TabsContent>
              </Tabs>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full border-zinc-600 text-zinc-300 hover:bg-zinc-700">
                <Plus className="mr-2 h-4 w-4" />
                Add Custom Item
              </Button>
            </CardFooter>
          </Card>
        </motion.div>

        <motion.div initial="hidden" animate="visible" variants={fadeIn}>
          <Card className="bg-zinc-800 border-zinc-700">
            <CardHeader>
              <CardTitle className="text-xl text-white">Local Preparedness Information</CardTitle>
              <CardDescription className="text-zinc-400">Recommendations based on your location</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="location" className="text-white">Your Location</Label>
                <Select onValueChange={setSelectedLocation}>
                  <SelectTrigger id="location" className="bg-zinc-700 border-zinc-600 text-white">
                    <SelectValue placeholder="Select your location" />
                  </SelectTrigger>
                  <SelectContent className="bg-zinc-700 border-zinc-600">
                    <SelectItem value="newyork">New York, NY</SelectItem>
                    <SelectItem value="losangeles">Los Angeles, CA</SelectItem>
                    <SelectItem value="chicago">Chicago, IL</SelectItem>
                    <SelectItem value="houston">Houston, TX</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              {selectedLocation && (
                <div className="bg-zinc-700 p-4 rounded-md">
                  <h4 className="font-semibold mb-2 text-white">Local Hazards</h4>
                  <ul className="list-disc list-inside text-sm text-zinc-300">
                    <li>Hurricanes (June to November)</li>
                    <li>Flooding in low-lying areas</li>
                    <li>Extreme heat waves in summer</li>
                  </ul>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial="hidden" animate="visible" variants={fadeIn}>
          <Card className="bg-zinc-800 border-zinc-700">
            <CardHeader>
              <CardTitle className="text-xl text-white">Plan Status</CardTitle>
              <CardDescription className="text-zinc-400">Overview of your preparedness plan</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-zinc-300">Overall Completion</span>
                <Badge variant="outline" className="bg-zinc-700 text-zinc-300">75%</Badge>
              </div>
              <Progress value={75} className="w-full bg-zinc-700" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-zinc-700 p-4 rounded-md">
                  <h4 className="font-semibold mb-2 text-white">Due Items</h4>
                  <ul className="text-sm space-y-1 text-zinc-300">
                    <li className="flex items-center">
                      <Clock className="mr-2 h-4 w-4 text-yellow-500" />
                      Update emergency contacts
                    </li>
                    <li className="flex items-center">
                      <Clock className="mr-2 h-4 w-4 text-yellow-500" />
                      Check smoke alarm batteries
                    </li>
                  </ul>
                </div>
                <div className="bg-zinc-700 p-4 rounded-md">
                  <h4 className="font-semibold mb-2 text-white">Recent Updates</h4>
                  <ul className="text-sm space-y-1 text-zinc-300">
                    <li className="flex items-center">
                      <CheckCircle2 className="mr-2 h-4 w-4 text-green-500" />
                      Added emergency food supply
                    </li>
                    <li className="flex items-center">
                      <CheckCircle2 className="mr-2 h-4 w-4 text-green-500" />
                      Updated meeting place
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" className="border-zinc-600 text-zinc-300 hover:bg-zinc-700">
                <Download className="mr-2 h-4 w-4" />
                Export Plan
              </Button>
              <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                <Share2 className="mr-2 h-4 w-4" />
                Share Plan
              </Button>
            </CardFooter>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}