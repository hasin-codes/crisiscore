'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Search, Users, Tent, Siren, Heart, User, Phone } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { useToast } from "@/components/ui/use-toast"
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

interface FormDialogProps {
  title: string;
  description: string;
  children: React.ReactNode;
  trigger: React.ReactNode;
}

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
}

const FormDialog = ({ title, description, children, trigger }: FormDialogProps) => (
  <Dialog>
    <DialogTrigger asChild>
      {trigger}
    </DialogTrigger>
    <DialogContent className="sm:max-w-[425px] bg-zinc-900 text-white">
      <DialogHeader>
        <DialogTitle>{title}</DialogTitle>
        <DialogDescription>{description}</DialogDescription>
      </DialogHeader>
      {children}
    </DialogContent>
  </Dialog>
)

const handleFormSubmit = (formName: string) => (e: React.FormEvent) => {
  e.preventDefault()
  const { toast } = useToast()
  toast({
    title: "Form Submitted",
    description: `Your ${formName} has been submitted successfully.`,
  })
}

const MissingPersonsRegistry = () => (
  <Card className="bg-zinc-900 text-white border-zinc-800 h-full">
    <CardHeader>
      <CardTitle className="text-lg font-bold">Missing Persons Registry</CardTitle>
      <CardDescription className="text-zinc-400">Search and manage missing person reports</CardDescription>
    </CardHeader>
    <CardContent>
      <div className="space-y-4">
        <div className="flex space-x-2">
          <Input placeholder="Search missing persons..." className="bg-zinc-800 text-white border-zinc-700" />
          <Button variant="outline" size="icon" className="bg-zinc-800 text-white border-zinc-700 hover:bg-zinc-700">
            <Search className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" className="bg-zinc-800 text-white border-zinc-700 hover:bg-zinc-700">
            <Search className="h-4 w-4" />
          </Button>
        </div>
        <ScrollArea className="h-[200px]">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="flex items-center space-x-4 py-2 border-b border-zinc-800 last:border-b-0">
              <div className="w-12 h-12 bg-zinc-800 rounded-full" />
              <div>
                <h3 className="font-semibold">John Doe</h3>
                <p className="text-sm text-zinc-400">Last seen: Central Park, 2 hours ago</p>
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
          <Button className="w-full bg-blue-500 hover:bg-blue-600 text-white">
            <Users className="mr-2 h-4 w-4" />
            Report Missing Person
          </Button>
        }
      >
        <form onSubmit={handleFormSubmit("Missing Person Report")}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">Name</Label>
              <Input id="name" className="col-span-3 bg-zinc-800 text-white border-zinc-700" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="age" className="text-right">Age</Label>
              <Input id="age" className="col-span-3 bg-zinc-800 text-white border-zinc-700" type="number" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="lastSeen" className="text-right">Last Seen</Label>
              <Input id="lastSeen" className="col-span-3 bg-zinc-800 text-white border-zinc-700" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">Description</Label>
              <Textarea id="description" className="col-span-3 bg-zinc-800 text-white border-zinc-700" />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white">Submit Report</Button>
          </DialogFooter>
        </form>
      </FormDialog>
    </CardFooter>
  </Card>
)

const EmergencyServiceStatus = () => (
  <Card className="bg-zinc-900 text-white border-zinc-800 h-full">
    <CardHeader>
      <CardTitle className="text-lg font-bold">Emergency Service Status</CardTitle>
      <CardDescription className="text-zinc-400">Real-time status of emergency services</CardDescription>
    </CardHeader>
    <CardContent>
      <div className="space-y-4">
        {['Fire Department', 'Police', 'Ambulance', 'Hospital'].map((service, i) => (
          <div key={i} className="flex items-center justify-between">
            <span>{service}</span>
            <Badge variant={i % 2 === 0 ? 'default' : 'secondary'} className={i % 2 === 0 ? 'bg-green-500 text-white' : 'bg-yellow-500 text-black'}>
              {i % 2 === 0 ? 'Available' : 'High Demand'}
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
                <SelectTrigger className="col-span-3 bg-zinc-800 text-white border-zinc-700">
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
              <Input id="location" className="col-span-3 bg-zinc-800 text-white border-zinc-700" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="emergencyDetails" className="text-right">Emergency Details</Label>
              <Textarea id="emergencyDetails" className="col-span-3 bg-zinc-800 text-white border-zinc-700" />
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
      <CardTitle className="text-lg font-bold">Emergency Shelter Hub</CardTitle>
      <CardDescription className="text-zinc-400">Real-time shelter capacity and resource information</CardDescription>
    </CardHeader>
    <CardContent>
      <Tabs defaultValue="capacity" className="w-full">
        <TabsList className="grid w-full grid-cols-3 bg-zinc-800">
          <TabsTrigger value="capacity" className="data-[state=active]:bg-zinc-700">Capacity</TabsTrigger>
          <TabsTrigger value="resources" className="data-[state=active]:bg-zinc-700">Resources</TabsTrigger>
          <TabsTrigger value="transport" className="data-[state=active]:bg-zinc-700">Transport</TabsTrigger>
        </TabsList>
        <TabsContent value="capacity" className="space-y-4">
          {['Shelter A', 'Shelter B', 'Shelter C'].map((shelter, i) => (
            <div key={i} className="flex items-center justify-between">
              <span>{shelter}</span>
              <div className="flex items-center space-x-2">
                <Progress 
                  value={75 - i * 15} 
                  className="w-[100px] [&>div]:bg-blue-500" 
                />
                <span className="text-sm">{75 - i * 15}%</span>
              </div>
            </div>
          ))}
        </TabsContent>
        <TabsContent value="resources" className="space-y-2">
          <p>Food: Sufficient for 3 days</p>
          <p>Water: Sufficient for 5 days</p>
          <p>Medical Supplies: Limited</p>
          <p>Blankets: Adequate</p>
        </TabsContent>
        <TabsContent value="transport" className="space-y-2">
          <p>Buses: 5 available</p>
          <p>Pickup Points: 3 active</p>
          <p>Next Departure: 15 minutes</p>
        </TabsContent>
      </Tabs>
    </CardContent>
    <CardFooter>
      <Button className="w-full bg-blue-500 hover:bg-blue-600 text-white">
        <Tent className="mr-2 h-4 w-4" />
        Find Nearest Shelter
      </Button>
    </CardFooter>
  </Card>
)

const EmergencyCommandCenter = () => (
  <Card className="bg-zinc-900 text-white border-zinc-800 h-full">
    <CardHeader>
      <CardTitle className="text-lg font-bold">Emergency Command Center</CardTitle>
      <CardDescription className="text-zinc-400">Real-time status of critical infrastructure</CardDescription>
    </CardHeader>
    <CardContent>
      <div className="grid grid-cols-2 gap-4">
        <Card className="bg-zinc-800 border-zinc-700">
          <CardHeader className="p-4">
            <CardTitle className="text-sm font-medium">Electricity</CardTitle>
          </CardHeader>
          <CardContent>
            <Badge variant="outline" className="bg-green-500 text-white">Available</Badge>
          </CardContent>
        </Card>
        <Card className="bg-zinc-800 border-zinc-700">
          <CardHeader className="p-4">
            <CardTitle className="text-sm font-medium">Gas</CardTitle>
          </CardHeader>
          <CardContent>
            <Badge variant="outline" className="bg-green-500 text-white">Available</Badge>
          </CardContent>
        </Card>
        <Card className="bg-zinc-800 border-zinc-700">
          <CardHeader className="p-4">
            <CardTitle className="text-sm font-medium">Tubewell</CardTitle>
          </CardHeader>
          <CardContent>
            <Badge variant="outline" className="bg-red-500 text-white">Sinked</Badge>
          </CardContent>
        </Card>
        <Card className="bg-zinc-800 border-zinc-700">
          <CardHeader className="p-4">
            <CardTitle className="text-sm font-medium">Shelter</CardTitle>
          </CardHeader>
          <CardContent>
            <Badge variant="outline" className="bg-green-500 text-white">Ready</Badge>
          </CardContent>
        </Card>
      </div>
    </CardContent>
  </Card>
)

const CommunitySupportNetwork = () => {
  const [activeTab, setActiveTab] = useState('volunteers')

  const volunteerData = [
    { name: 'John Doe', phone: '123-456-7890' },
    { name: 'Jane Smith', phone: '234-567-8901' },
    { name: 'Alice Johnson', phone: '345-678-9012' },
    { name: 'Bob Williams', phone: '456-789-0123' },
    { name: 'Charlie Brown', phone: '567-890-1234' },
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
        <CardTitle className="text-lg font-bold">Community Support Network</CardTitle>
        <CardDescription className="text-zinc-400">Coordinate community efforts and resources</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-zinc-800">
            <TabsTrigger value="volunteers" className="data-[state=active]:bg-zinc-700">Volunteers</TabsTrigger>
            <TabsTrigger value="resources" className="data-[state=active]:bg-zinc-700">Resources</TabsTrigger>
            <TabsTrigger value="requests" className="data-[state=active]:bg-zinc-700">Requests</TabsTrigger>
          </TabsList>
          <TabsContent value="volunteers" className="space-y-4">
            <div className="flex justify-between items-center">
              <span>Active Volunteers</span>
              <Badge className="bg-blue-500 text-white">{volunteerData.length}</Badge>
            </div>
            <ScrollArea className="h-[200px] w-full rounded-md border border-zinc-700 p-4">
              {volunteerData.map((volunteer, index) => (
                <div key={index} className="flex justify-between items-center py-2 border-b border-zinc-700 last:border-b-0">
                  <span>{volunteer.name}</span>
                  <span className="text-zinc-400 flex items-center">
                    <Phone className="h-4 w-4 mr-2" />
                    {volunteer.phone}
                  </span>
                </div>
              ))}
            </ScrollArea>
            <FormDialog 
              title="Register as Volunteer" 
              description="Please provide your information to register as a volunteer."
              trigger={<Button variant="outline" className="w-full bg-zinc-800 text-white hover:bg-zinc-700">Register as Volunteer</Button>}
            >
              <form onSubmit={handleFormSubmit("Volunteer Registration")}>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="volunteerName" className="text-right">Name</Label>
                    <Input id="volunteerName" className="col-span-3 bg-zinc-800 text-white border-zinc-700" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="volunteerPhone" className="text-right">Phone</Label>
                    <Input id="volunteerPhone" className="col-span-3 bg-zinc-800 text-white border-zinc-700" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="volunteerSkills" className="text-right">Skills</Label>
                    <Input id="volunteerSkills" className="col-span-3 bg-zinc-800 text-white border-zinc-700" />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white">Register</Button>
                </DialogFooter>
              </form>
            </FormDialog>
          </TabsContent>
          <TabsContent value="resources" className="space-y-4">
            <div className="flex justify-between items-center">
              <span>Shared Resources</span>
              <Badge className="bg-blue-500 text-white">{resourceData.length}</Badge>
            </div>
            <ScrollArea className="h-[200px] w-full rounded-md border border-zinc-700 p-4">
              {resourceData.map((resource, index) => (
                <div key={index} className="flex justify-between items-center py-2 border-b border-zinc-700 last:border-b-0">
                  <span>{resource.type}</span>
                  <span className="text-zinc-400">{resource.quantity}</span>
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
                    <Input id="resourceType" className="col-span-3 bg-zinc-800 text-white border-zinc-700" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="resourceQuantity" className="text-right">Quantity</Label>
                    <Input id="resourceQuantity" className="col-span-3 bg-zinc-800 text-white border-zinc-700" type="number" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="resourceProvider" className="text-right">Provider</Label>
                    <Input id="resourceProvider" className="col-span-3 bg-zinc-800 text-white border-zinc-700" />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white">Offer Resource</Button>
                </DialogFooter>
              </form>
            </FormDialog>
          </TabsContent>
          <TabsContent value="requests" className="space-y-4">
            <div className="flex justify-between items-center">
              <span>Help Requests</span>
              <Badge className="bg-blue-500 text-white">{requestData.length}</Badge>
            </div>
            <ScrollArea className="h-[200px] w-full rounded-md border border-zinc-700 p-4">
              {requestData.map((request, index) => (
                <div key={index} className="flex justify-between items-center py-2 border-b border-zinc-700 last:border-b-0">
                  <span>{request.type}</span>
                  <Badge variant={request.urgency === 'High' ? 'destructive' : request.urgency === 'Medium' ? 'default' : 'secondary'}>
                    {request.urgency}
                  </Badge>
                  <span className="text-zinc-400">{request.requester}</span>
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
                    <Input id="requestType" className="col-span-3 bg-zinc-800 text-white border-zinc-700" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="requestUrgency" className="text-right">Urgency</Label>
                    <Select>
                      <SelectTrigger className="col-span-3 bg-zinc-800 text-white border-zinc-700">
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
                    <Input id="requesterName" className="col-span-3 bg-zinc-800 text-white border-zinc-700" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="requestDetails" className="text-right">Details</Label>
                    <Textarea id="requestDetails" className="col-span-3 bg-zinc-800 text-white border-zinc-700" />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white">Submit Request</Button>
                </DialogFooter>
              </form>
            </FormDialog>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter>
        <Button className="w-full bg-blue-500 hover:bg-blue-600 text-white">
          <Heart className="mr-2 h-4 w-4" />
          Join Community Support
        </Button>
      </CardFooter>
    </Card>
  )
}

export function EmergencyPageComponent() {
  return (
    <div className="min-h-screen bg-zinc-950 text-white p-4 md:p-8">
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Emergency Center</h1>
        <Avatar className="h-10 w-10">
          <AvatarImage src="/placeholder-avatar.jpg" alt="User" />
          <AvatarFallback><User className="h-6 w-6" /></AvatarFallback>
        </Avatar>
      </header>

      <div className="grid gap-8 md:grid-cols-2">
        <motion.div variants={cardVariants} initial="hidden" animate="visible" className="grid gap-8">
          <Card className="bg-zinc-900 text-white border-zinc-800">
            <CardContent className="p-0">
              <div className="grid md:grid-cols-2 gap-4">
                <MissingPersonsRegistry />
                <EmergencyServiceStatus />
              </div>
            </CardContent>
          </Card>
        </motion.div>
        <motion.div variants={cardVariants} initial="hidden" animate="visible" transition={{ delay: 0.2 }} className="grid gap-8">
          <Card className="bg-zinc-900 text-white border-zinc-800">
            <CardContent className="p-0">
              <div className="grid md:grid-cols-2 gap-4">
                <EmergencyShelterHub />
                <EmergencyCommandCenter />
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
      
      <motion.div variants={cardVariants} initial="hidden" animate="visible" transition={{ delay: 0.4 }} className="mt-8">
        <CommunitySupportNetwork />
      </motion.div>
    </div>
  )
}