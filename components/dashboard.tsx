'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { MapPin, AlertTriangle, Hospital, Zap, Wifi, Home, Tent, Droplet, Pizza, Battery, Fuel, Box, Users, HelpCircle, Megaphone, Bus, School, CheckSquare, Users2, PhoneCall, Wind, Thermometer, Droplets, User } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface StatusCardProps {
  icon: React.ElementType;
  title: string;
  status: string;
  severity: 'default' | 'destructive' | 'warning' | 'success';
}

interface ResourceIndicatorProps {
  icon: React.ElementType;
  title: string;
  value: number;
  max: number;
}

interface WeatherWidgetProps {
  icon: React.ElementType;
  title: string;
  value: number;
  unit: string;
}

const MapComponent = () => (
  <div className="relative w-full h-[250px] sm:h-[300px] md:h-[400px] bg-zinc-800 rounded-lg overflow-hidden">
    <div className="w-full h-full flex items-center justify-center text-zinc-400">
      Interactive Map Placeholder
    </div>
  </div>
)

const getSeverityVariant = (severity: StatusCardProps['severity']): 'default' | 'destructive' | 'secondary' | 'outline' => {
  switch (severity) {
    case 'warning':
      return 'secondary';
    case 'success':
      return 'outline';
    case 'destructive':
      return 'destructive';
    default:
      return 'default';
  }
};

const StatusCard = ({ icon: Icon, title, status, severity }: StatusCardProps) => (
  <Card className="bg-zinc-900 border-zinc-800">
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium text-white">
        <Icon className="mr-2 h-4 w-4 inline text-zinc-400" />
        {title}
      </CardTitle>
      <Badge variant={getSeverityVariant(severity)}>{status}</Badge>
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold text-white">{status}</div>
      <p className="text-xs text-zinc-400">Last updated: 5 mins ago</p>
    </CardContent>
  </Card>
)

const _ResourceIndicator = ({ icon: Icon, title, value, max }: ResourceIndicatorProps) => (
  <div className="flex items-center space-x-4">
    <Icon className="h-8 w-8 text-zinc-400" />
    <div className="space-y-1 flex-1">
      <p className="text-sm font-medium leading-none text-white">{title}</p>
      <Progress 
        value={(value / max) * 100} 
        className="bg-zinc-800 [&>div]:bg-blue-500" 
      />
    </div>
    <div className="text-sm font-medium text-white">{value}/{max}</div>
  </div>
)

const WeatherWidget = ({ icon: Icon, title, value, unit }: WeatherWidgetProps) => (
  <Card className="bg-zinc-900 border-zinc-800">
    <CardContent className="flex items-center justify-between p-3">
      <div className="flex items-center gap-2">
        <Icon className="h-6 w-6 text-zinc-400" />
        <div>
          <p className="text-xs font-medium text-white">{title}</p>
          <p className="text-lg font-bold text-white">{value}{unit}</p>
        </div>
      </div>
    </CardContent>
  </Card>
)

const WeatherSection = () => (
  <section className="grid grid-cols-1 gap-2 mb-6">
    <div className="grid grid-cols-3 gap-2">
      <WeatherWidget icon={Thermometer} title="Temperature" value={28} unit="°C" />
      <WeatherWidget icon={Droplets} title="Precipitation" value={30} unit="%" />
      <WeatherWidget icon={Wind} title="Wind Speed" value={15} unit="km/h" />
    </div>
  </section>
)

const MapSection = () => (
  <Card className="bg-zinc-900 border-zinc-800 mb-6">
    <CardHeader className="p-4">
      <CardTitle className="text-lg text-white">Live Situation Map</CardTitle>
      <CardDescription className="text-zinc-400">Real-time emergency and resource locations</CardDescription>
    </CardHeader>
    <CardContent className="p-0">
      <MapComponent />
    </CardContent>
  </Card>
)

const CriticalUpdatesSection = () => (
  <Card className="bg-zinc-900 border-zinc-800 mb-6">
    <CardHeader>
      <CardTitle className="text-white">Critical Updates</CardTitle>
      <CardDescription className="text-zinc-400">Latest emergency alerts and statuses</CardDescription>
    </CardHeader>
    <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <StatusCard icon={AlertTriangle} title="Emergency Alerts" status="2 Active" severity="destructive" />
      <StatusCard icon={Hospital} title="Hospital Capacity" status="75% Full" severity="warning" />
      <StatusCard icon={Zap} title="Power Grid" status="Stable" severity="default" />
      <StatusCard icon={Wifi} title="Network Status" status="Online" severity="success" />
    </CardContent>
  </Card>
)

const PersonalSafetySection = () => (
  <Card className="bg-zinc-900 border-zinc-800 mb-6">
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
            <Progress 
              value={75} 
              className="w-full bg-zinc-700 [&>div]:bg-blue-500" 
            />
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

export function DashboardComponent() {
  return (
    <div className="bg-zinc-950 text-white p-2 sm:p-4 md:p-6">
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold">CrisisCore Dashboard</h1>
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

      <main className="space-y-6">
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
    </div>
  )
}