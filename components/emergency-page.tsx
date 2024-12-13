'use client'

import React from 'react'
import { motion, useMotionTemplate, useMotionValue } from "framer-motion"
import { AlertCircle, Bell, ChevronDown, ChevronUp, Filter, Map, Menu, MessageCircle, Search, Settings, Share2, Users, Tent, Package, Siren, Heart, UserPlus, HelpingHand, FileQuestion, User, Phone, AlertTriangle, Shield, Ambulance, AmbulanceIcon as FirstAid, Zap, Flame, Droplet, Home, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { toast } from '@/components/ui/use-toast'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import Script from 'next/script'
import { cn } from "@/lib/utils"
import { Spotlight } from "@/components/ui/spotlight"
import { Checkbox } from "@/components/ui/checkbox"

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
}

interface FormDialogProps {
  title: string;
  description: string;
  children: React.ReactNode;
  trigger: React.ReactNode;
}

const FormDialog = ({ title, description, children, trigger }: FormDialogProps) => (
  <Dialog>
    <DialogTrigger asChild>
      {trigger}
    </DialogTrigger>
    <DialogContent className="sm:max-w-[425px] bg-black/30 backdrop-blur-2xl border border-zinc-800/50 text-white shadow-xl">
      <DialogHeader>
        <DialogTitle className="text-xl font-semibold">{title}</DialogTitle>
        <DialogDescription className="text-zinc-400">{description}</DialogDescription>
      </DialogHeader>
      {children}
    </DialogContent>
  </Dialog>
)

const handleFormSubmit = (formName: string) => (e: React.FormEvent) => {
  e.preventDefault()
  toast({
    title: "Form Submitted",
    description: `Your ${formName} has been submitted successfully.`,
  })
}

const MissingPersonsRegistry = () => (
  <Card className="bg-zinc-900 text-white border-zinc-800 h-full relative overflow-hidden">
    <Spotlight
      className="-top-40 left-0"
      fill="white"
    />
    <CardHeader>
      <CardTitle className="text-lg font-bold flex items-center">
        <Users className="mr-2 h-5 w-5 text-red-500" />
        Missing Persons Registry
      </CardTitle>
      <CardDescription className="text-zinc-400">Search and manage missing person reports</CardDescription>
    </CardHeader>
    <CardContent>
      <div className="space-y-4">
        <div className="flex space-x-2">
          <Input placeholder="Search missing persons..." className="bg-black/50 backdrop-blur-sm text-white border-zinc-700 placeholder:text-zinc-400 flex-grow" />
          <Button variant="outline" size="icon" className="bg-zinc-800 text-white border-zinc-700 hover:bg-zinc-700">
            <Search className="h-4 w-4" />
          </Button>
        </div>
        <ScrollArea className="h-[200px] w-full rounded-md border border-zinc-800">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="flex items-center space-x-4 p-4 border-b border-zinc-800 last:border-b-0">
              <Avatar className="h-10 w-10">
                <AvatarImage src={`https://i.pravatar.cc/40?img=${i+1}`} />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <div className="flex-grow">
                <h3 className="font-semibold">John Doe {i+1}</h3>
                <p className="text-sm text-zinc-400">Last seen: Central Park, {2+i} hours ago</p>
              </div>
              <Badge variant={i % 2 === 0 ? 'default' : 'outline'} className="ml-auto">
                {i % 2 === 0 ? 'Active' : 'Found'}
              </Badge>
            </div>
          ))}
        </ScrollArea>
      </div>
    </CardContent>
    <CardFooter>
      <FormDialog 
        title="Report Missing Person" 
        description="Please provide details about the missing person."
        trigger={
          <Button className="w-full bg-red-500 hover:bg-red-600 text-white">
            <AlertTriangle className="mr-2 h-4 w-4" />
            Report Missing Person
          </Button>
        }
      >
        <form onSubmit={handleFormSubmit("Missing Person Report")} className="space-y-6">
          <div className="space-y-4">
            <div>
              <Label className="text-sm font-medium mb-2 block">Full Name</Label>
              <FancyInput 
                placeholder="Enter full name" 
                className="w-full"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-sm font-medium mb-2 block">Gender</Label>
              <Select>
                  <SelectTrigger className="w-full bg-black/50 backdrop-blur-sm text-white border-zinc-700">
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                  <SelectItem value="non-binary">Non-Binary</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
              <div>
                <Label className="text-sm font-medium mb-2 block">Date of Birth</Label>
                <FancyInput type="date" className="w-full" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-sm font-medium mb-2 block">Height (cm)</Label>
                <FancyInput type="number" placeholder="Height in cm" className="w-full" />
            </div>
              <div>
                <Label className="text-sm font-medium mb-2 block">Weight (kg)</Label>
                <FancyInput type="number" placeholder="Weight in kg" className="w-full" />
            </div>
            </div>

            <div>
              <Label className="text-sm font-medium mb-2 block">Last Seen Location</Label>
              <FancyInput placeholder="Enter location details" className="w-full" />
            </div>

            <div>
              <Label className="text-sm font-medium mb-2 block">Last Seen Date/Time</Label>
              <FancyInput type="datetime-local" className="w-full" />
            </div>

            <div>
              <Label className="text-sm font-medium mb-2 block">Clothing Description</Label>
              <Textarea 
                placeholder="Describe what they were wearing" 
                className="w-full bg-black/50 backdrop-blur-sm text-white border-zinc-700 rounded-md placeholder:text-zinc-400"
              />
            </div>

            <div>
              <Label className="text-sm font-medium mb-2 block">Medical Conditions</Label>
              <Textarea 
                placeholder="List any medical conditions" 
                className="w-full bg-black/50 backdrop-blur-sm text-white border-zinc-700 rounded-md placeholder:text-zinc-400"
              />
            </div>

            <div>
              <Label className="text-sm font-medium mb-2 block">Distinguishing Features</Label>
              <Textarea 
                placeholder="Birthmarks, scars, tattoos, etc." 
                className="w-full bg-black/50 backdrop-blur-sm text-white border-zinc-700 rounded-md placeholder:text-zinc-400"
              />
            </div>
          </div>

          <DialogFooter>
            <Button 
              type="submit" 
              className="w-full bg-red-500 hover:bg-red-600 text-white font-medium py-2 rounded-lg transition-colors"
            >
              Submit Report →
            </Button>
          </DialogFooter>
        </form>
      </FormDialog>
    </CardFooter>
  </Card>
)

const EmergencyServiceStatus = () => (
  <Card className="bg-zinc-900 text-white border-zinc-800 h-full">
    <CardHeader>
      <CardTitle className="text-lg font-bold flex items-center">
        <Siren className="mr-2 h-5 w-5 text-yellow-500" />
        Emergency Service Status
      </CardTitle>
      <CardDescription className="text-zinc-400">Real-time status of emergency services</CardDescription>
    </CardHeader>
    <CardContent>
      <div className="space-y-4">
        {[
          { name: 'Fire Department', icon: AlertCircle, status: 'Available' },
          { name: 'Police', icon: Shield, status: 'High Demand' },
          { name: 'Ambulance', icon: Ambulance, status: 'Available' },
          { name: 'Hospital', icon: FirstAid, status: 'High Demand' }
        ].map((service, i) => (
          <div key={i} className="flex items-center justify-between p-3 bg-zinc-800 rounded-lg">
            <div className="flex items-center space-x-3">
              <service.icon className="h-5 w-5 text-zinc-400" />
              <span>{service.name}</span>
            </div>
            <Badge variant={service.status === 'Available' ? 'default' : 'secondary'} className={service.status === 'Available' ? 'bg-green-500 text-white' : 'bg-yellow-500 text-black'}>
              {service.status}
            </Badge>
          </div>
        ))}
      </div>
    </CardContent>
    <CardFooter>
      <FormDialog 
        title="Request Emergency Service" 
        description="Please provide details about the emergency."
        trigger={
          <Button className="w-full bg-red-500 hover:bg-red-600 text-white">
            <Siren className="mr-2 h-4 w-4" />
            Request Emergency Service
          </Button>
        }
      >
        <form onSubmit={handleFormSubmit("Emergency Service Request")}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="serviceType" className="text-right">Service Type</Label>
              <Select>
                <SelectTrigger className="col-span-3 bg-black/50 backdrop-blur-sm text-white border-zinc-700">
                  <SelectValue placeholder="Select service type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="fire">Fire Department</SelectItem>
                  <SelectItem value="police">Police</SelectItem>
                  <SelectItem value="ambulance">Ambulance</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="location" className="text-right">Location</Label>
              <Input id="location" className="col-span-3 bg-black/50 backdrop-blur-sm text-white border-zinc-700" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="emergencyDetails" className="text-right">Emergency Details</Label>
              <Textarea id="emergencyDetails" className="col-span-3 bg-black/50 backdrop-blur-sm text-white border-zinc-700" />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" className="bg-red-500 hover:bg-red-600 text-white">Submit Request</Button>
          </DialogFooter>
        </form>
      </FormDialog>
    </CardFooter>
  </Card>
)

const EmergencyShelterHub = () => (
  <Card className="bg-zinc-900 text-white border-zinc-800 h-full">
    <CardHeader>
      <CardTitle className="text-lg font-bold flex items-center">
        <Tent className="mr-2 h-5 w-5 text-blue-500" />
        Emergency Shelter Hub
      </CardTitle>
      <CardDescription className="text-zinc-400">Real-time shelter capacity and resource information</CardDescription>
    </CardHeader>
    <CardContent>
      <Tabs defaultValue="capacity" className="w-full">
        <TabsList className="grid w-full grid-cols-3 bg-zinc-800">
          <TabsTrigger value="capacity" className="data-[state=active]:bg-zinc-700">Capacity</TabsTrigger>
          <TabsTrigger value="resources" className="data-[state=active]:bg-zinc-700">Resources</TabsTrigger>
          <TabsTrigger value="transport" className="data-[state=active]:bg-zinc-700">Transport</TabsTrigger>
        </TabsList>
        <TabsContent value="capacity" className="space-y-4 mt-4">
          {['Shelter A', 'Shelter B', 'Shelter C'].map((shelter, i) => (
            <div key={i} className="flex items-center justify-between bg-zinc-800 p-3 rounded-lg">
              <span>{shelter}</span>
              <div className="flex items-center space-x-2">
                <Progress value={75 - i * 15} className="w-[100px] [&>div]:bg-blue-500" />
                <span className="text-sm">{75 - i * 15}%</span>
              </div>
            </div>
          ))}
        </TabsContent>
        <TabsContent value="resources" className="space-y-2 mt-4">
          <div className="bg-zinc-800 p-4 rounded-lg space-y-2">
            <p className="flex justify-between"><span>Food:</span> <span className="text-green-500">Sufficient for 3 days</span></p>
            <p className="flex justify-between"><span>Water:</span> <span className="text-green-500">Sufficient for 5 days</span></p>
            <p className="flex justify-between"><span>Medical Supplies:</span> <span className="text-yellow-500">Limited</span></p>
            <p className="flex justify-between"><span>Blankets:</span> <span className="text-green-500">Adequate</span></p>
          </div>
        </TabsContent>
        <TabsContent value="transport" className="space-y-2 mt-4">
          <div className="bg-zinc-800 p-4 rounded-lg space-y-2">
            <p className="flex justify-between"><span>Buses:</span> <span>5 available</span></p>
            <p className="flex justify-between"><span>Pickup Points:</span> <span>3 active</span></p>
            <p className="flex justify-between"><span>Next Departure:</span> <span>15 minutes</span></p>
          </div>
        </TabsContent>
      </Tabs>
    </CardContent>
    <CardFooter>
      <Button className="w-full bg-blue-500 hover:bg-blue-600 text-white">
        <Map className="mr-2 h-4 w-4" />
        Find Nearest Shelter
      </Button>
    </CardFooter>
  </Card>
)

const EmergencyCommandCenter = () => (
  <Card className="bg-zinc-900 text-white border-zinc-800 h-full">
    <CardHeader>
      <CardTitle className="text-lg font-bold flex items-center">
        <AlertCircle className="mr-2 h-5 w-5 text-orange-500" />
        Emergency Command Center
      </CardTitle>
      <CardDescription className="text-zinc-400">Real-time status of critical infrastructure</CardDescription>
    </CardHeader>
    <CardContent>
      <div className="grid grid-cols-2 gap-4">
        {[
          { name: 'Electricity', icon: Zap, status: 'Available' },
          { name: 'Gas', icon: Flame, status: 'Available' },
          { name: 'Water', icon: Droplet, status: 'Limited' },
          { name: 'Shelter', icon: Home, status: 'Ready' }
        ].map((item, i) => (
          <Card key={i} className="bg-zinc-800 border-zinc-700">
            <CardHeader className="p-4">
              <CardTitle className="text-sm font-medium flex items-center">
                <item.icon className="mr-2 h-4 w-4" />
                {item.name}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Badge 
                variant="outline" 
                className={
                  item.status === 'Available' ? 'bg-green-500 text-white' : 
                  item.status === 'Limited' ? 'bg-yellow-500 text-black' : 
                  'bg-red-500 text-white'
                }
              >
                {item.status}
              </Badge>
            </CardContent>
          </Card>
        ))}
      </div>
    </CardContent>
  </Card>
)

type Step = {
  id: number;
  name: string;
  fields: string[];
}

const FormStepper = ({ currentStep, steps }: { currentStep: number, steps: Step[] }) => (
  <div className="relative flex justify-between mb-8">
    {steps.map((step, i) => (
      <div key={step.id} className="flex flex-col items-center">
        <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 
          ${i < currentStep 
            ? 'bg-green-500 border-green-500 text-white' 
            : i === currentStep 
              ? 'border-blue-500 text-blue-500' 
              : 'border-zinc-600 text-zinc-600'}`}
        >
          {i < currentStep ? <Check className="w-4 h-4" /> : step.id}
        </div>
        <span className="text-xs mt-1 text-zinc-400">{step.name}</span>
        {i < steps.length - 1 && (
          <div className={`absolute top-4 left-0 h-[2px] 
            ${i < currentStep ? 'bg-green-500' : 'bg-zinc-600'}`} 
            style={{
              width: `${100 / (steps.length - 1)}%`,
              left: `${(100 / (steps.length - 1)) * i}%`
            }}
          />
        )}
      </div>
    ))}
  </div>
)

const VolunteerRegistrationForm = () => {
  const [currentStep, setCurrentStep] = React.useState(0)
  
  const steps: Step[] = [
    { id: 1, name: 'Personal Info', fields: ['name', 'dob', 'gender'] },
    { id: 2, name: 'Emergency Contact', fields: ['emergencyName', 'relationship', 'phone'] },
    { id: 3, name: 'Availability', fields: ['availability', 'location', 'travel'] },
    { id: 4, name: 'Skills', fields: ['background', 'experience', 'skills'] },
    { id: 5, name: 'Health', fields: ['health', 'conditions', 'allergies'] },
    { id: 6, name: 'Agreement', fields: ['consent', 'waiver', 'privacy'] },
    { id: 7, name: 'Review', fields: ['review'] }
  ]

  const renderStep = () => {
    switch(currentStep) {
      case 0:
        return (
          <div className="space-y-4">
            <div>
              <Label className="text-sm font-medium mb-2 block">Full Name</Label>
              <FancyInput placeholder="Enter your full name" />
            </div>
            <div>
              <Label className="text-sm font-medium mb-2 block">Date of Birth</Label>
              <FancyInput type="date" />
            </div>
            <div>
              <Label className="text-sm font-medium mb-2 block">Gender</Label>
              <Select>
                <SelectTrigger className="w-full bg-black/50 backdrop-blur-sm text-white border-zinc-700">
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                  <SelectItem value="non-binary">Non-binary</SelectItem>
                  <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-sm font-medium mb-2 block">Primary Phone Number</Label>
              <FancyInput placeholder="Enter phone number" type="tel" />
            </div>
            <div>
              <Label className="text-sm font-medium mb-2 block">Email Address (Optional)</Label>
              <FancyInput placeholder="Enter email address" type="email" />
            </div>
            <div>
              <Label className="text-sm font-medium mb-2 block">Residential Address</Label>
              <Textarea 
                placeholder="Enter your address" 
                className="w-full bg-black/50 backdrop-blur-sm text-white border-zinc-700 rounded-md"
              />
            </div>
          </div>
        )
      
      case 1:
        return (
          <div className="space-y-4">
            <div>
              <Label className="text-sm font-medium mb-2 block">Emergency Contact Name</Label>
              <FancyInput placeholder="Enter emergency contact name" />
            </div>
            <div>
              <Label className="text-sm font-medium mb-2 block">Relationship</Label>
              <Select>
                <SelectTrigger className="w-full bg-black/50 backdrop-blur-sm text-white border-zinc-700">
                  <SelectValue placeholder="Select relationship" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="parent">Parent</SelectItem>
                  <SelectItem value="sibling">Sibling</SelectItem>
                  <SelectItem value="spouse">Spouse</SelectItem>
                  <SelectItem value="friend">Friend</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-sm font-medium mb-2 block">Emergency Contact Number</Label>
              <FancyInput placeholder="Enter emergency contact number" type="tel" />
            </div>
          </div>
        )

      case 2:
        return (
          <div className="space-y-4">
            <div>
              <Label className="text-sm font-medium mb-2 block">Availability Days</Label>
              <Select>
                <SelectTrigger className="w-full bg-black/50 backdrop-blur-sm text-white border-zinc-700">
                  <SelectValue placeholder="Select available days" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="weekdays">Weekdays</SelectItem>
                  <SelectItem value="weekends">Weekends</SelectItem>
                  <SelectItem value="all">All Days</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-sm font-medium mb-2 block">Preferred Location</Label>
              <FancyInput placeholder="Enter preferred location" />
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="travel" className="bg-black/50" />
              <Label htmlFor="travel">Willing to travel</Label>
            </div>
            <div>
              <Label className="text-sm font-medium mb-2 block">Maximum Travel Distance (km)</Label>
              <FancyInput type="number" placeholder="Enter maximum travel distance" />
            </div>
          </div>
        )

      case 3:
        return (
          <div className="space-y-4">
            <div>
              <Label className="text-sm font-medium mb-2 block">Professional Background</Label>
              <Select>
                <SelectTrigger className="w-full bg-black/50 backdrop-blur-sm text-white border-zinc-700">
                  <SelectValue placeholder="Select background" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="healthcare">Healthcare</SelectItem>
                  <SelectItem value="engineering">Engineering</SelectItem>
                  <SelectItem value="logistics">Logistics</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-sm font-medium mb-2 block">Relevant Experience</Label>
              <Textarea 
                placeholder="Describe your relevant experience" 
                className="w-full bg-black/50 backdrop-blur-sm text-white border-zinc-700 rounded-md"
              />
            </div>
            <div>
              <Label className="text-sm font-medium mb-2 block">Skills</Label>
              <div className="space-y-2">
                {[
                  'First Aid/CPR',
                  'Counseling/Support',
                  'Cooking',
                  'Driving',
                  'Repairs',
                  'Logistics'
                ].map((skill) => (
                  <div key={skill} className="flex items-center space-x-2">
                    <Checkbox id={skill} className="bg-black/50" />
                    <Label htmlFor={skill}>{skill}</Label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )

      case 4:
        return (
          <div className="space-y-4">
            <div>
              <Label className="text-sm font-medium mb-2 block">Physical Health Status</Label>
              <Select>
                <SelectTrigger className="w-full bg-black/50 backdrop-blur-sm text-white border-zinc-700">
                  <SelectValue placeholder="Select health status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="excellent">Excellent</SelectItem>
                  <SelectItem value="good">Good</SelectItem>
                  <SelectItem value="moderate">Moderate</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-sm font-medium mb-2 block">Medical Conditions (Optional)</Label>
              <Textarea 
                placeholder="List any medical conditions" 
                className="w-full bg-black/50 backdrop-blur-sm text-white border-zinc-700 rounded-md"
              />
            </div>
            <div>
              <Label className="text-sm font-medium mb-2 block">Allergies/Dietary Restrictions</Label>
              <Textarea 
                placeholder="List any allergies or dietary restrictions" 
                className="w-full bg-black/50 backdrop-blur-sm text-white border-zinc-700 rounded-md"
              />
            </div>
          </div>
        )

      case 5:
        return (
          <div className="space-y-4">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Checkbox id="background-check" className="bg-black/50" />
                <Label htmlFor="background-check">
                  I consent to a background check if required
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="liability" className="bg-black/50" />
                <Label htmlFor="liability">
                  I understand the risks involved and agree to participate willingly
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="privacy" className="bg-black/50" />
                <Label htmlFor="privacy">
                  I agree to the collection and use of my data for volunteer management
                </Label>
              </div>
            </div>
          </div>
        )

      case 6:
        return (
          <div className="space-y-4">
            <div className="bg-black/30 p-4 rounded-lg">
              <h3 className="font-medium mb-2">Review Your Information</h3>
              <p className="text-sm text-zinc-400">
                Please review all the information you've provided. You can go back to any previous step to make changes.
              </p>
              {/* Add a summary of all entered information here */}
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <form onSubmit={handleFormSubmit("Volunteer Registration")} className="space-y-6">
      <FormStepper currentStep={currentStep} steps={steps} />
      {renderStep()}
      <div className="flex justify-between mt-6">
        <Button
          type="button"
          variant="outline"
          onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
          disabled={currentStep === 0}
          className="bg-black/50 backdrop-blur-sm"
        >
          Previous
        </Button>
        <Button
          type="button"
          onClick={() => {
            if (currentStep === steps.length - 1) {
              // Submit form
            } else {
              setCurrentStep(Math.min(steps.length - 1, currentStep + 1))
            }
          }}
          className="bg-green-500 hover:bg-green-600"
        >
          {currentStep === steps.length - 1 ? 'Submit' : 'Next'}
        </Button>
      </div>
    </form>
  )
}

const CommunitySupportNetwork = () => {
  const [activeTab, setActiveTab] = React.useState('volunteers')

  const volunteerData = [
    { name: 'John Doe', phone: '123-456-7890', skills: 'First Aid, Driving' },
    { name: 'Jane Smith', phone: '234-567-8901', skills: 'Cooking, Child Care' },
    { name: 'Alice Johnson', phone: '345-678-9012', skills: 'Medical, Search and Rescue' },
    { name: 'Bob Williams', phone: '456-789-0123', skills: 'Construction, Heavy Lifting' },
    { name: 'Charlie Brown', phone: '567-890-1234', skills: 'Counseling, Logistics' },
  ]

  const resourceData = [
    { type: 'Food', quantity: '500 kg', provider: 'Local Supermarket' },
    { type: 'Water', quantity: '1000 L', provider: 'City Water Department' },
    { type: 'Blankets', quantity: '200', provider: 'Community Center' },
    { type: 'First Aid Kits', quantity: '50', provider: 'Red Cross' },
    { type: 'Generators', quantity: '10', provider: 'Hardware Store' },
  ]

  const requestData = [
    { type: 'Medical Assistance', urgency: 'High', requester: 'Sarah Connor' },
    { type: 'Food Supply', urgency: 'Medium', requester: 'James Bond' },
    { type: 'Shelter', urgency: 'High', requester: 'Bruce Wayne' },
    { type: 'Transportation', urgency: 'Low', requester: 'Peter Parker' },
    { type: 'Childcare', urgency: 'Medium', requester: 'Leia Organa' },
  ]

  return (
    <Card className="bg-zinc-900 text-white border-zinc-800">
      <CardHeader>
        <CardTitle className="text-lg font-bold flex items-center">
          <Users className="mr-2 h-5 w-5 text-green-500" />
          Community Support Network
        </CardTitle>
        <CardDescription className="text-zinc-400">Coordinate community efforts and resources</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-zinc-800">
            <TabsTrigger value="volunteers" className="data-[state=active]:bg-zinc-700">Volunteers</TabsTrigger>
            <TabsTrigger value="resources" className="data-[state=active]:bg-zinc-700">Resources</TabsTrigger>
            <TabsTrigger value="requests" className="data-[state=active]:bg-zinc-700">Requests</TabsTrigger>
          </TabsList>
          <TabsContent value="volunteers" className="space-y-4 mt-4">
            <div className="flex justify-between items-center">
              <span>Active Volunteers</span>
              <Badge className="bg-green-500 text-white">{volunteerData.length}</Badge>
            </div>
            <ScrollArea className="h-[200px] w-full rounded-md border border-zinc-700 p-4">
              {volunteerData.map((volunteer, index) => (
                <div key={index} className="flex justify-between items-center py-3 border-b border-zinc-700 last:border-b-0">
                  <div>
                    <span className="font-medium">{volunteer.name}</span>
                    <p className="text-sm text-zinc-400">{volunteer.skills}</p>
                  </div>
                  <span className="text-zinc-400 flex items-center">
                    <Phone className="h-4 w-4 mr-2" />
                    {volunteer.phone}
                  </span>
                </div>
              ))}
            </ScrollArea>
            <FormDialog 
              title="Register as Volunteer" 
              description="Please complete all steps to register as a volunteer."
              trigger={<Button variant="outline" className="w-full bg-zinc-800 text-white hover:bg-zinc-700">Register as Volunteer</Button>}
            >
              <VolunteerRegistrationForm />
            </FormDialog>
          </TabsContent>
          <TabsContent value="resources" className="space-y-4 mt-4">
            <div className="flex justify-between items-center">
              <span>Shared Resources</span>
              <Badge className="bg-blue-500 text-white">{resourceData.length}</Badge>
            </div>
            <ScrollArea className="h-[200px] w-full rounded-md border border-zinc-700 p-4">
              {resourceData.map((resource, index) => (
                <div key={index} className="flex justify-between items-center py-3 border-b border-zinc-700 last:border-b-0">
                  <div>
                    <span className="font-medium">{resource.type}</span>
                    <p className="text-sm text-zinc-400">{resource.quantity}</p>
                  </div>
                  <span className="text-zinc-400">{resource.provider}</span>
                </div>
              ))}
            </ScrollArea>
            <FormDialog 
              title="Offer Resources" 
              description="Please provide details about the resources you can offer."
              trigger={<Button variant="outline" className="w-full bg-zinc-800 text-white hover:bg-zinc-700">Offer Resources</Button>}
            >
              <form onSubmit={handleFormSubmit("Resource Offer")}>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="resourceType" className="text-right">Resource Type</Label>
                    <Input id="resourceType" className="col-span-3 bg-black/50 backdrop-blur-sm text-white border-zinc-700" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="resourceQuantity" className="text-right">Quantity</Label>
                    <Input id="resourceQuantity" className="col-span-3 bg-black/50 backdrop-blur-sm text-white border-zinc-700" type="number" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="resourceProvider" className="text-right">Provider</Label>
                    <Input id="resourceProvider" className="col-span-3 bg-black/50 backdrop-blur-sm text-white border-zinc-700" />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white">Offer Resource</Button>
                </DialogFooter>
              </form>
            </FormDialog>
          </TabsContent>
          <TabsContent value="requests" className="space-y-4 mt-4">
            <div className="flex justify-between items-center">
              <span>Help Requests</span>
              <Badge className="bg-red-500 text-white">{requestData.length}</Badge>
            </div>
            <ScrollArea className="h-[200px] w-full rounded-md border border-zinc-700 p-4">
              {requestData.map((request, index) => (
                <div key={index} className="flex justify-between items-center py-3 border-b border-zinc-700 last:border-b-0">
                  <div>
                    <span className="font-medium">{request.type}</span>
                    <p className="text-sm text-zinc-400">Requested by: {request.requester}</p>
                  </div>
                  <Badge variant={request.urgency === 'High' ? 'destructive' : request.urgency === 'Medium' ? 'default' : 'secondary'}>
                    {request.urgency}
                  </Badge>
                </div>
              ))}
            </ScrollArea>
            <FormDialog 
              title="Submit Help Request" 
              description="Please provide details about the help you need."
              trigger={<Button variant="outline" className="w-full bg-zinc-800 text-white hover:bg-zinc-700">Submit Help Request</Button>}
            >
              <form onSubmit={handleFormSubmit("Help Request")}>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="requestType" className="text-right">Request Type</Label>
                    <Input id="requestType" className="col-span-3 bg-black/50 backdrop-blur-sm text-white border-zinc-700" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="requestUrgency" className="text-right">Urgency</Label>
                    <Select>
                      <SelectTrigger className="col-span-3 bg-black/50 backdrop-blur-sm text-white border-zinc-700">
                        <SelectValue placeholder="Select urgency level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Low</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="requesterName" className="text-right">Your Name</Label>
                    <Input id="requesterName" className="col-span-3 bg-black/50 backdrop-blur-sm text-white border-zinc-700" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="requestDetails" className="text-right">Details</Label>
                    <Textarea id="requestDetails" className="col-span-3 bg-black/50 backdrop-blur-sm text-white border-zinc-700" />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit" className="bg-red-500 hover:bg-red-600 text-white">Submit Request</Button>
                </DialogFooter>
              </form>
            </FormDialog>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

// Add this new Input component based on Aceternity UI
const FancyInput = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, type, ...props }, ref) => {
    const radius = 100;
    const [visible, setVisible] = React.useState(false);

    let mouseX = useMotionValue(0);
    let mouseY = useMotionValue(0);

    function handleMouseMove({ currentTarget, clientX, clientY }: any) {
      let { left, top } = currentTarget.getBoundingClientRect();
      mouseX.set(clientX - left);
      mouseY.set(clientY - top);
    }

    return (
      <motion.div
        style={{
          background: useMotionTemplate`
            radial-gradient(
              ${visible ? radius + "px" : "0px"} circle at ${mouseX}px ${mouseY}px,
              var(--blue-500),
              transparent 80%
            )
          `,
        }}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setVisible(true)}
        onMouseLeave={() => setVisible(false)}
        className="p-[2px] rounded-lg transition duration-300 group/input backdrop-blur-sm"
      >
        <input
          type={type}
          className={cn(
            `flex h-10 w-full border-none bg-black/50 text-white shadow-input rounded-md px-3 py-2 text-sm 
            file:border-0 file:bg-transparent file:text-sm file:font-medium 
            placeholder:text-zinc-400
            focus-visible:outline-none focus-visible:ring-[2px] focus-visible:ring-neutral-600
            disabled:cursor-not-allowed disabled:opacity-50
            dark:shadow-[0px_0px_1px_1px_var(--neutral-700)]
            group-hover/input:shadow-none transition duration-400
            backdrop-blur-sm`,
            className
          )}
          ref={ref}
          {...props}
        />
      </motion.div>
    );
  }
);
FancyInput.displayName = "FancyInput";

export function EmergencyPageComponent() {
  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <div className="grid gap-8">
        <motion.div variants={cardVariants} initial="hidden" animate="visible" className="grid md:grid-cols-2 gap-8">
          <MissingPersonsRegistry />
          <EmergencyServiceStatus />
        </motion.div>

        <motion.div variants={cardVariants} initial="hidden" animate="visible" transition={{ delay: 0.2 }} className="grid md:grid-cols-2 gap-8">
          <EmergencyShelterHub />
          <EmergencyCommandCenter />
        </motion.div>

        <motion.div variants={cardVariants} initial="hidden" animate="visible" transition={{ delay: 0.4 }}>
          <CommunitySupportNetwork />
        </motion.div>
      </div>
    </div>
  )
}