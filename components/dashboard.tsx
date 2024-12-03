'use client'
/* eslint-disable @typescript-eslint/no-unused-vars */

import React from 'react'
import { motion } from 'framer-motion'
import { MapPin, AlertTriangle, Hospital, Zap, Wifi, Home, Tent, Droplet, Pizza, Battery, Fuel, Box, Users, HelpCircle, Megaphone, Bus, School, CheckSquare, Users2, PhoneCall, Wind, Thermometer, Droplets, User } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useEffect, useState } from 'react'
import { DynamicWindyMap } from '@/components/ui/dynamic-windy-map'

interface AlertCardProps {
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  title: string;
  status: string;
  severity: 'default' | 'secondary' | 'destructive' | 'outline';
}

interface MetricCardProps {
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  title: string;
  value: number;
  max: number;
}

interface StatCardProps {
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  title: string;
  value: number;
  unit: string;
}

interface CriticalUpdate {
  id: string
  title: string
  status: string
  severity: 'default' | 'secondary' | 'destructive' | 'outline'
  icon: string
  lastUpdated: string
}

const CRITICAL_UPDATES_DATA: CriticalUpdate[] = [
  {
    id: 'emergency-alerts',
    title: 'Emergency Alerts',
    status: '2 Active',
    severity: 'destructive',
    icon: 'alert-triangle',
    lastUpdated: '5 mins ago'
  },
  {
    id: 'hospital-capacity',
    title: 'Hospital Capacity',
    status: '75% Full',
    severity: 'secondary',
    icon: 'hospital',
    lastUpdated: '5 mins ago'
  },
  {
    id: 'power-grid',
    title: 'Power Grid',
    status: 'Stable',
    severity: 'default',
    icon: 'zap',
    lastUpdated: '5 mins ago'
  },
  {
    id: 'network-status',
    title: 'Network Status',
    status: 'Online',
    severity: 'outline',
    icon: 'wifi',
    lastUpdated: '5 mins ago'
  }
]

const MapComponent = () => (
  <div className="relative w-full h-[400px]">
    <DynamicWindyMap />
  </div>
)

const AlertCard = ({ Icon, title, status, severity, lastUpdated }: AlertCardProps & { lastUpdated: string }) => (
  <Card className="bg-zinc-900 border-zinc-800">
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium text-white">
        <Icon className="mr-2 h-4 w-4 inline text-zinc-400" />
        {title}
      </CardTitle>
      <Badge variant={severity}>{status}</Badge>
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold text-white">{status}</div>
      <p className="text-xs text-zinc-400">Last updated: {lastUpdated}</p>
    </CardContent>
  </Card>
)

const MetricCard = ({ Icon, title, value, max }: MetricCardProps) => (
  <div className="flex items-center space-x-4">
    <Icon className="h-8 w-8 text-zinc-400" />
    <div className="space-y-1 flex-1">
      <p className="text-sm font-medium leading-none text-white">{title}</p>
      <Progress value={(value / max) * 100} className="bg-zinc-800" color="primary" />
    </div>
    <div className="text-sm font-medium text-white">{value}/{max}</div>
  </div>
)

const StatCard = ({ Icon, title, value, unit }: StatCardProps) => (
  <Card className="bg-zinc-900 border-zinc-800">
    <CardContent className="flex items-center justify-between p-2 sm:p-4">
      <div className="flex items-center space-x-2 sm:space-x-4">
        <Icon className="h-6 w-6 sm:h-8 sm:w-8 text-zinc-400" />
        <div>
          <p className="text-xs sm:text-sm font-medium text-white">{title}</p>
          <p className="text-lg sm:text-2xl font-bold text-white">{value}{unit}</p>
        </div>
      </div>
    </CardContent>
  </Card>
)

const WeatherSection = () => {
  const weatherData = {
    temperature: { value: 28, unit: '°C' },
    precipitation: { value: 30, unit: '%' },
    windSpeed: { value: 15, unit: 'km/h' }
  }

  return (
    <section className="grid grid-cols-3 gap-2 sm:gap-4 mb-8">
      <StatCard 
        Icon={Thermometer} 
        title="Temperature" 
        value={weatherData.temperature.value} 
        unit={weatherData.temperature.unit} 
      />
      <StatCard 
        Icon={Droplets} 
        title="Precipitation" 
        value={weatherData.precipitation.value} 
        unit={weatherData.precipitation.unit} 
      />
      <StatCard 
        Icon={Wind} 
        title="Wind Speed" 
        value={weatherData.windSpeed.value} 
        unit={weatherData.windSpeed.unit} 
      />
    </section>
  )
}

const MapSection = () => (
  <Card className="bg-zinc-900 border-zinc-800 mb-8">
    <CardHeader>
      <CardTitle className="text-white">Live Situation Map</CardTitle>
      <CardDescription className="text-zinc-400">Real-time emergency and resource locations</CardDescription>
    </CardHeader>
    <CardContent>
      <MapComponent />
    </CardContent>
  </Card>
)

const CriticalUpdatesSection = () => (
  <Card className="bg-zinc-900 border-zinc-800 mb-8">
    <CardHeader>
      <CardTitle className="text-white">Critical Updates</CardTitle>
      <CardDescription className="text-zinc-400">Latest emergency alerts and statuses</CardDescription>
    </CardHeader>
    <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {CRITICAL_UPDATES_DATA.map((update) => (
        <AlertCard 
          key={update.id}
          Icon={getIconComponent(update.icon)}
          title={update.title}
          status={update.status}
          severity={update.severity}
          lastUpdated={update.lastUpdated}
        />
      ))}
    </CardContent>
  </Card>
)

const PersonalSafetySection = () => (
  <Card className="bg-zinc-900 border-zinc-800 mb-8">
    <CardHeader>
      <CardTitle className="text-white">Personal Safety Dashboard</CardTitle>
      <CardDescription className="text-zinc-400">Your personalized emergency preparedness status</CardDescription>
    </CardHeader>
    <CardContent>
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="bg-zinc-800 border-zinc-700">
          <CardHeader>
            <CardTitle className="text-sm font-medium text-white">Safety Checklist</CardTitle>
          </CardHeader>
          <CardContent>
            <Progress value={75} className="w-full bg-zinc-700" color="primary" />
            <p className="text-xs text-zinc-400 mt-2">15 of 20 items completed</p>
          </CardContent>
        </Card>
        <Card className="bg-zinc-800 border-zinc-700">
          <CardHeader>
            <CardTitle className="text-sm font-medium text-white">Family Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {['John', 'Jane', 'Kids'].map((member) => (
                <div key={member} className="flex items-center">
                  <CheckSquare className="h-4 w-4 text-green-500 mr-2" />
                  <span className="text-white">{member} - Safe</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        <Card className="bg-zinc-800 border-zinc-700">
          <CardHeader>
            <CardTitle className="text-sm font-medium text-white">Emergency Contacts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Button variant="outline" className="w-full bg-zinc-700 text-white hover:bg-zinc-600">
                <Users2 className="mr-2 h-4 w-4" />
                View Contacts
              </Button>
              <Button variant="outline" className="w-full bg-zinc-700 text-white hover:bg-zinc-600">
                <PhoneCall className="mr-2 h-4 w-4" />
                Call Emergency Services
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </CardContent>
  </Card>
)

const CommunityResponseSection = () => (
  <Card className="bg-zinc-900 border-zinc-800">
    <CardHeader>
      <CardTitle className="text-white">Community Response</CardTitle>
      <CardDescription className="text-zinc-400">Local updates and volunteer activities</CardDescription>
    </CardHeader>
    <CardContent>
      <Tabs defaultValue="updates" className="w-full">
        <TabsList className="grid w-full grid-cols-2 bg-zinc-800">
          <TabsTrigger value="updates" className="text-white data-[state=active]:bg-zinc-700">Updates</TabsTrigger>
          <TabsTrigger value="volunteers" className="text-white data-[state=active]:bg-zinc-700">Volunteers</TabsTrigger>
        </TabsList>
        <TabsContent value="updates" className="space-y-4">
          <ScrollArea className="h-[200px]">
            {[
              { icon: Megaphone, text: "Evacuation order for Zone A" },
              { icon: Bus, text: "Public transport running on limited schedule" },
              { icon: School, text: "All schools closed until further notice" },
              { icon: Users, text: "Community meeting at Central Park at 3 PM" },
              { icon: HelpCircle, text: "Volunteers needed at South Shelter" }
            ].map((item, index) => (
              <div key={index} className="flex items-center space-x-2 mb-2">
                <item.icon className="h-4 w-4 text-zinc-400" />
                <p className="text-sm text-white">{item.text}</p>
              </div>
            ))}
          </ScrollArea>
        </TabsContent>
        <TabsContent value="volunteers" className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-white">Active Volunteers</span>
            <Badge variant="secondary">127</Badge>
          </div>
          <Button className="w-full bg-blue-500 text-white hover:bg-blue-600">Register as Volunteer</Button>
        </TabsContent>
      </Tabs>
    </CardContent>
  </Card>
)

// Helper function to get icon component
const getIconComponent = (iconName: string) => {
  const icons = {
    'alert-triangle': AlertTriangle,
    'hospital': Hospital,
    'zap': Zap,
    'wifi': Wifi
  }
  return icons[iconName as keyof typeof icons]
}

export function DashboardComponent() {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  return (
    <div className="min-h-screen bg-zinc-950 text-white p-4 md:p-8 lg:pl-4">
      {isClient ? (
        <>
          <header className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold">CrisisCore Dashboard</h1>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" className="text-zinc-400 hover:text-white hover:bg-zinc-800">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="/placeholder-avatar.jpg" alt="User" />
                      <AvatarFallback><User className="h-5 w-5" /></AvatarFallback>
                    </Avatar>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>User Profile</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </header>

          <main className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <WeatherSection />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <MapSection />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <CriticalUpdatesSection />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <PersonalSafetySection />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <CommunityResponseSection />
            </motion.div>
          </main>
        </>
      ) : null}
    </div>
  )
}