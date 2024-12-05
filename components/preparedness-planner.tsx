'use client'

import React, { useState, useEffect } from 'react'
import { AlertCircle, Bell, CheckCircle2, ChevronRight, Clock, Download, Map, MessageCircle, Plus, Share2, User } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardFooter, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { Label } from '@/components/ui/label'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

// Add this interface near the top of the file
interface Task {
  id: number;
  text: string;
  completed: boolean;
}

interface KitItem {
  id: string;
  text: string;
  completed: boolean;
}

interface KitItems {
  essentials: KitItem[];
  firstaid: KitItem[];
  tools: KitItem[];
}

// AI-Powered Checklist Plans Component
const ChecklistPlans = () => {
  const [tasks, setTasks] = useState<Task[]>([])
  const [isGenerating, setIsGenerating] = useState(false)

  const generateTasks = () => {
    setIsGenerating(true)
    const newTasks = [
      { id: 1, text: 'Create an emergency kit', completed: false },
      { id: 2, text: 'Develop a communication plan', completed: false },
      { id: 3, text: 'Identify evacuation routes', completed: false },
      { id: 4, text: 'Store important documents safely', completed: false },
      { id: 5, text: 'Learn basic first aid', completed: false },
      { id: 6, text: 'Plan for pet safety', completed: false },
      { id: 7, text: 'Prepare for power outages', completed: false },
    ]
    setTasks(newTasks)
    setIsGenerating(false)
  }

  const toggleTask = (id: number) => {
    setTasks(prevTasks => {
      const updatedTasks = prevTasks.map(task => 
        task.id === id ? { ...task, completed: !task.completed } : task
      )
      return updatedTasks.sort((a, b) => {
        if (a.completed === b.completed) return 0
        return a.completed ? 1 : -1
      })
    })
  }

  useEffect(() => {
    generateTasks()
  }, [])

  return (
    <Card className="bg-zinc-900 border-zinc-800 h-full">
      <CardHeader>
        <CardTitle className="text-lg font-bold text-white">Your AI-Powered Checklist Plan</CardTitle>
        <CardDescription className="text-zinc-400">Personalized tasks to enhance your preparedness</CardDescription>
      </CardHeader>
      <CardContent className="flex-1">
        <ScrollArea className="h-[400px]">
          {tasks.map((task) => (
            <Card 
              key={task.id} 
              className={`mb-2 ${task.completed ? 'bg-zinc-800' : 'bg-zinc-900'} border-zinc-800 transition-colors duration-300 hover:bg-zinc-700`}
              onDoubleClick={() => toggleTask(task.id)}
            >
              <CardContent className="p-3 flex items-center">
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleTask(task.id)}
                  className="rounded border-gray-600 text-[#FF5722] focus:ring-[#FF5722] bg-[#2E2E2E] mr-3"
                />
                <Label htmlFor={`task-${task.id}`} className={`text-white ${task.completed ? 'line-through text-[#B0B0B0]' : ''}`}>
                  {task.text}
                </Label>
              </CardContent>
            </Card>
          ))}
        </ScrollArea>
      </CardContent>
      <CardFooter className="mt-auto">
        <Button 
          onClick={generateTasks} 
          disabled={isGenerating} 
          className="w-full bg-zinc-800 text-white hover:bg-zinc-700"
        >
          {isGenerating ? 'Generating...' : 'Regenerate Plan'}
        </Button>
      </CardFooter>
    </Card>
  )
}

// Emergency Kit Checklist Component
const EmergencyKitChecklist = () => {
  const [activeTab, setActiveTab] = useState('essentials')
  const [items, setItems] = useState({
    essentials: [
      { id: 'water', text: 'Water (1 gallon per person per day)', completed: false },
      { id: 'food', text: 'Non-perishable food (3-day supply)', completed: false },
      { id: 'radio', text: 'Battery-powered or hand-crank radio', completed: false },
      { id: 'flashlight', text: 'Flashlight and extra batteries', completed: false },
      { id: 'firstaid', text: 'First aid kit', completed: false },
      { id: 'whistle', text: 'Whistle to signal for help', completed: false },
      { id: 'dustmask', text: 'Dust mask, plastic sheeting, and duct tape', completed: false },
    ],
    firstaid: [
      { id: 'bandages', text: 'Adhesive bandages', completed: false },
      { id: 'gauze', text: 'Sterile gauze pads', completed: false },
      { id: 'antibiotic', text: 'Antibiotic ointment', completed: false },
      { id: 'scissors', text: 'Scissors and tweezers', completed: false },
      { id: 'painkillers', text: 'Over-the-counter pain relievers', completed: false },
      { id: 'prescriptions', text: 'Prescription medications', completed: false },
      { id: 'manual', text: 'First aid manual', completed: false },
    ],
    tools: [
      { id: 'multitool', text: 'Multi-purpose tool', completed: false },
      { id: 'canopener', text: 'Manual can opener', completed: false },
      { id: 'matches', text: 'Matches in a waterproof container', completed: false },
      { id: 'firestarter', text: 'Fire starter', completed: false },
      { id: 'paper', text: 'Paper and pencil', completed: false },
      { id: 'plates', text: 'Paper plates, cups, and plastic utensils', completed: false },
      { id: 'map', text: 'Local maps', completed: false },
    ],
  })

  const toggleItem = (category: keyof KitItems, id: string) => {
    setItems(prevItems => {
      const updatedItems = {
        ...prevItems,
        [category]: prevItems[category].map(item => 
          item.id === id ? { ...item, completed: !item.completed } : item
        ).sort((a, b) => {
          if (a.completed === b.completed) return 0
          return a.completed ? 1 : -1
        })
      }
      return updatedItems
    })
  }

  const calculateProgress = () => {}

  return (
    <Card className="bg-zinc-900 border-zinc-800">
      <CardHeader>
        <CardTitle className="text-lg font-bold text-white">Emergency Kit Checklist</CardTitle>
        <CardDescription className="text-zinc-400">Track your emergency supplies</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3 bg-zinc-800">
            <TabsTrigger value="essentials" className="text-white data-[state=active]:bg-zinc-700">
              Essentials
            </TabsTrigger>
            <TabsTrigger value="firstaid" className="text-white data-[state=active]:bg-zinc-700">
              First Aid
            </TabsTrigger>
            <TabsTrigger value="tools" className="text-white data-[state=active]:bg-zinc-700">
              Tools
            </TabsTrigger>
          </TabsList>
          {Object.keys(items).map((category) => (
            <TabsContent key={category} value={category}>
              <ScrollArea className="h-[400px] w-full pr-4">
                {items[category as keyof KitItems].map((item) => (
                  <Card 
                    key={item.id} 
                    className={`mb-2 ${item.completed ? 'bg-zinc-800' : 'bg-zinc-900'} border-zinc-800 transition-colors duration-300 hover:bg-zinc-700`}
                    onDoubleClick={() => toggleItem(category as keyof KitItems, item.id)}
                  >
                    <CardContent className="p-3 flex items-center">
                      <input
                        type="checkbox"
                        checked={item.completed}
                        onChange={() => toggleItem(category as keyof KitItems, item.id)}
                        className="rounded border-gray-600 text-[#FF5722] focus:ring-[#FF5722] bg-[#2E2E2E] mr-3"
                      />
                      <Label htmlFor={item.id} className={`text-white ${item.completed ? 'line-through text-[#B0B0B0]' : ''}`}>
                        {item.text}
                      </Label>
                    </CardContent>
                  </Card>
                ))}
              </ScrollArea>
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full bg-zinc-800 text-white hover:bg-zinc-700">
          <Plus className="mr-2 h-4 w-4" />
          Add Custom Item
        </Button>
      </CardFooter>
    </Card>
  )
}

// Local Preparedness Information Component
const LocalPreparednessInfo = () => {
  const [location, setLocation] = useState('New York, NY')
  const [hasNewAlert, setHasNewAlert] = useState(false)

  useEffect(() => {
    // Simulating a new alert after 5 seconds
    const timer = setTimeout(() => setHasNewAlert(true), 5000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <Card className="bg-zinc-900 border-zinc-800 h-full">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg font-bold text-white">Local Preparedness Information</CardTitle>
          {hasNewAlert && (
            <Badge variant="destructive" className="animate-pulse bg-[#FF5722] text-white">
              New Alert
            </Badge>
          )}
        </div>
        <CardDescription className="text-zinc-400">Stay informed about your area: {location}</CardDescription>
      </CardHeader>
      <CardContent className="flex-1">
        <div className="space-y-4 h-[300px]">
          <div className="bg-zinc-800 p-4 rounded-md">
            <h4 className="font-semibold mb-2 text-white">Local Hazards</h4>
            <ul className="list-disc list-inside text-sm text-zinc-400">
              <li>Hurricanes (June to November)</li>
              <li>Flooding in low-lying areas</li>
              <li>Extreme heat waves in summer</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-2 text-white">Emergency Resources</h4>
            <div className="grid grid-cols-2 gap-2">
              <Button variant="outline" className="text-left justify-start bg-zinc-800 text-white hover:bg-zinc-700">
                <Map className="mr-2 h-4 w-4" />
                Emergency Shelters
              </Button>
              <Button variant="outline" className="text-left justify-start bg-zinc-800 text-white hover:bg-zinc-700">
                <Map className="mr-2 h-4 w-4" />
                Hospitals
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="mt-auto">
        <Button className="w-full bg-zinc-800 text-white hover:bg-zinc-700">View Full Map</Button>
      </CardFooter>
    </Card>
  )
}

// Plan Status Overview Component
const PlanStatusOverview = () => {
  const [progress, setProgress] = useState(75)

  return (
    <Card className="bg-zinc-900 border-zinc-800 h-full">
      <CardHeader>
        <CardTitle className="text-lg font-bold text-white">Plan Status Overview</CardTitle>
        <CardDescription className="text-zinc-400">Track your overall preparedness progress</CardDescription>
      </CardHeader>
      <CardContent className="flex-1">
        <div className="h-[300px] flex flex-col justify-between">
          <div className="flex-1 flex flex-col justify-center">
            <div className="flex justify-center items-center mb-4">
              <div className="relative">
                <svg className="w-32 h-32">
                  <circle
                    className="text-zinc-800"
                    strokeWidth="8"
                    stroke="currentColor"
                    fill="transparent"
                    r="58"
                    cx="64"
                    cy="64"
                  />
                  <circle
                    className="text-zinc-800"
                    strokeWidth="8"
                    strokeDasharray={58 * 2 * Math.PI}
                    strokeDashoffset={58 * 2 * Math.PI * (1 - progress / 100)}
                    strokeLinecap="round"
                    stroke="currentColor"
                    fill="transparent"
                    r="58"
                    cx="64"
                    cy="64"
                  />
                </svg>
                <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-2xl font-bold text-white">
                  {progress}%
                </span>
              </div>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-zinc-400">
              <span>Emergency Kit</span>
              <span>80%</span>
            </div>
            <Progress value={80} className="bg-zinc-800" />
            <div className="flex justify-between text-sm text-zinc-400">
              <span>Communication Plan</span>
              <span>60%</span>
            </div>
            <Progress value={60} className="bg-zinc-800" />
            <div className="flex justify-between text-sm text-zinc-400">
              <span>Local Information</span>
              <span>90%</span>
            </div>
            <Progress value={90} className="bg-zinc-800" />
          </div>
        </div>
      </CardContent>
      <CardFooter className="mt-auto flex justify-between">
        <Button variant="outline" className="bg-zinc-800 text-white hover:bg-zinc-700">
          <Download className="mr-2 h-4 w-4" />
          Export Plan
        </Button>
        <Button className="bg-zinc-800 text-white hover:bg-zinc-700">
          <Share2 className="mr-2 h-4 w-4" />
          Share Plan
        </Button>
      </CardFooter>
    </Card>
  )
}

// Main Component
export function PreparednessPlannerComponent() {
  return (
    <div className="flex min-h-screen bg-zinc-950 text-white">
      <div className="flex-grow overflow-y-auto p-4 md:p-6 lg:p-8">
        <div className="space-y-6 max-w-4xl mx-auto">
          {/* Grid layout for the main content */}
          <div className="grid gap-6 md:grid-cols-2">
            {/* Checklist Plans */}
            <div className="flex flex-col">
              <ChecklistPlans />
            </div>

            {/* Emergency Kit Checklist */}
            <div className="flex flex-col">
              <EmergencyKitChecklist />
            </div>
          </div>

          {/* Second row */}
          <div className="grid gap-6 md:grid-cols-2">
            {/* Local Preparedness Info */}
            <div className="flex flex-col">
              <LocalPreparednessInfo />
            </div>

            {/* Plan Status Overview */}
            <div className="flex flex-col">
              <PlanStatusOverview />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}