'use client'

import React, { useState } from 'react'
import { ChevronDown, ChevronUp, Filter, Search, Share2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Input } from '@/components/ui/input'
import { motion, AnimatePresence } from 'framer-motion'
import { DynamicWindyMap } from '@/components/ui/dynamic-windy-map'
import ClientOnly from '@/components/ui/client-only'

// Color palette export
export const colorPalette = {
  background: '#09090b', // bg-zinc-950
  cardBackground: '#18181b', // bg-zinc-900
  border: '#27272a', // border-zinc-800
  text: {
    primary: '#ffffff', // text-white
    secondary: '#a1a1aa', // text-zinc-400
    tertiary: '#d4d4d8', // text-zinc-300
  },
  accent: {
    blue: '#60a5fa', // text-blue-400
    red: '#ef4444', // variant="destructive" (assumed color)
  },
  hover: {
    background: '#3f3f46', // hover:bg-zinc-800
  },
  progress: {
    background: '#3f3f46', // bg-zinc-800
    fill: '#60a5fa', // Assuming blue for progress fill
  },
}

// Add these interfaces at the top of the file
interface AlertCardProps {
  title: string;
  mainContent: React.ReactNode;
  expandedContent: React.ReactNode;
  isExpanded: boolean;
  setIsExpanded: (value: boolean) => void;
}

// Update the AlertCard component with proper typing
const AlertCard = ({ 
  title, 
  mainContent, 
  expandedContent, 
  isExpanded, 
  setIsExpanded 
}: AlertCardProps) => {
  return (
    <Card className="bg-zinc-900 border-zinc-800 text-white">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-lg font-bold">{title}</CardTitle>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-zinc-400 hover:text-white hover:bg-zinc-800"
        >
          {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </Button>
      </CardHeader>
      <CardContent>
        <div>{mainContent}</div>
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {expandedContent}
            </motion.div>
          )}
        </AnimatePresence>
      </CardContent>
    </Card>
  )
}

export function AlertsPageComponent() {
  const [isAIBriefingExpanded, setIsAIBriefingExpanded] = useState(false)
  const [isPredictionsPanelExpanded, setIsPredictionsPanelExpanded] = useState(false)
  const [isSafetyTipsExpanded, setIsSafetyTipsExpanded] = useState(false)

  return (
    <div className="flex min-h-screen bg-zinc-950 text-white">
      <div className="flex-grow overflow-y-auto p-4 md:p-6 lg:p-8">
        <div className="space-y-6 max-w-4xl mx-auto">
          {/* AI Briefing Section */}
          <AlertCard
            title="AI Briefing"
            mainContent={
              <div>
                <p className="text-sm text-zinc-400 mb-2">Last updated: 5 minutes ago</p>
                <p>Current situation: Moderate risk of flash floods in the southern region.</p>
              </div>
            }
            expandedContent={
              <div>
                <Separator className="my-4 bg-zinc-800" />
                <p className="mb-2">Extended forecast indicates a 60% chance of heavy rainfall over the next 48 hours, potentially leading to localized flooding in low-lying areas.</p>
                <p>Residents are advised to stay informed and prepare for possible evacuation notices.</p>
              </div>
            }
            isExpanded={isAIBriefingExpanded}
            setIsExpanded={setIsAIBriefingExpanded}
          />

          {/* Situation Overview */}
          <Card className="bg-zinc-900 border-zinc-800 text-white">
            <CardHeader>
              <CardTitle className="text-lg font-bold">Situation Overview</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Impact Zone */}
              <div>
                <h3 className="font-semibold mb-2">Impact Zone</h3>
                <div className="aspect-video">
                  <DynamicWindyMap />
                </div>
              </div>

              {/* Severity */}
              <div>
                <h3 className="font-semibold mb-2">Severity</h3>
                <div className="flex justify-between items-center mb-2">
                  <span>Current Risk Level</span>
                  <Badge variant="destructive">Moderate</Badge>
                </div>
                <Progress value={60} className="w-full bg-zinc-800" />
                <p className="text-sm text-zinc-400 mt-2">Risk level is based on current weather patterns and historical data.</p>
              </div>

              {/* Timeline */}
              <div>
                <h3 className="font-semibold mb-2">Timeline</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Alert Issued</span>
                    <span className="text-zinc-400">2 hours ago</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Expected Peak</span>
                    <span className="text-zinc-400">In 6 hours</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Estimated Duration</span>
                    <span className="text-zinc-400">12-18 hours</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Safety Tips Module */}
          <AlertCard
            title="Safety Tips"
            mainContent={
              <div>
                <h3 className="font-semibold text-blue-400">Key Safety Tip</h3>
                <p className="text-sm text-zinc-300">Stay informed and be prepared to evacuate if necessary.</p>
              </div>
            }
            expandedContent={
              <div className="space-y-4 mt-4">
                <div>
                  <h3 className="font-semibold text-blue-400">Prepare an Emergency Kit</h3>
                  <ul className="list-disc list-inside text-sm text-zinc-300">
                    <li>Water (one gallon per person per day for at least three days)</li>
                    <li>Non-perishable food (at least a three-day supply)</li>
                    <li>Battery-powered or hand crank radio</li>
                    <li>Flashlight and extra batteries</li>
                    <li>First aid kit</li>
                    <li>Whistle to signal for help</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-blue-400">During a Flood</h3>
                  <ul className="list-disc list-inside text-sm text-zinc-300">
                    <li>Stay informed: Monitor local news and weather reports</li>
                    <li>Move to higher ground if there is a risk of flash flooding</li>
                    <li>Do not walk, swim, or drive through flood waters</li>
                    <li>Stay off bridges over fast-moving water</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-blue-400">After a Flood</h3>
                  <ul className="list-disc list-inside text-sm text-zinc-300">
                    <li>Return home only when authorities say it is safe</li>
                    <li>Avoid standing water as it may be electrically charged</li>
                    <li>Be aware of areas where floodwaters have receded and watch out for debris</li>
                    <li>Do not use appliances or electronics exposed to water until checked for safety</li>
                  </ul>
                </div>
              </div>
            }
            isExpanded={isSafetyTipsExpanded}
            setIsExpanded={setIsSafetyTipsExpanded}
          />

          {/* Predictions Panel */}
          <AlertCard
            title="Predictions"
            mainContent={
              <div>
                <div className="flex justify-between items-center">
                  <span>Flood Risk (Next 24h)</span>
                  <Badge variant="destructive">High</Badge>
                </div>
                <Progress value={80} className="w-full bg-zinc-800 mt-2" />
              </div>
            }
            expandedContent={
              <div className="space-y-4 mt-4">
                <p className="text-sm text-zinc-400">AI models predict an 80% chance of significant flooding in the next 24 hours based on current weather patterns and historical data.</p>
                <div className="space-y-2">
                  <h4 className="font-semibold text-blue-400">Potential Impacts:</h4>
                  <ul className="list-disc list-inside text-sm text-zinc-300">
                    <li>Road closures in low-lying areas</li>
                    <li>Possible power outages</li>
                    <li>Evacuation of flood-prone neighborhoods</li>
                  </ul>
                </div>
                <Button variant="outline" className="w-full bg-zinc-800 text-white hover:bg-zinc-700">
                  <Share2 className="mr-2 h-4 w-4" />
                  Share Prediction Report
                </Button>
              </div>
            }
            isExpanded={isPredictionsPanelExpanded}
            setIsExpanded={setIsPredictionsPanelExpanded}
          />

          {/* Update Timeline */}
          <Card className="bg-zinc-900 border-zinc-800 text-white">
            <CardHeader>
              <CardTitle className="text-lg font-bold">Recent Updates</CardTitle>
              <CardDescription>
                <div className="flex items-center space-x-2">
                  <Input type="text" placeholder="Search updates" className="bg-zinc-800 text-white border-zinc-700" />
                  <Button variant="outline" size="icon" className="bg-zinc-800 text-white hover:bg-zinc-700">
                    <Search className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon" className="bg-zinc-800 text-white hover:bg-zinc-700">
                    <Filter className="h-4 w-4" />
                  </Button>
                </div>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[300px]">
                <div className="space-y-4">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="border-l-2 border-blue-500 pl-4 pb-4">
                      <h3 className="font-semibold text-blue-400">Update {5 - i}</h3>
                      <p className="text-sm text-zinc-400">
                        {i === 0 ? '5 minutes ago' : `${i * 30} minutes ago`}
                      </p>
                      <p className="mt-1 text-zinc-300">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full bg-zinc-800 text-white hover:bg-zinc-700">Load More</Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}