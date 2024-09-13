import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from 'next/link'
import { Checkbox } from "@/components/ui/checkbox"

interface Task {
  id: number;
  description: string;
}

interface PreparationChecklistProps {
  aiPlanTasks: Task[] | null;
}

const PreparationChecklist: React.FC<PreparationChecklistProps> = ({ aiPlanTasks }) => {
  const displayTasks = aiPlanTasks?.slice(0, 4) || []

  return (
    <Card className="border-[#343434] shadow-[0_0_10px_rgba(255,255,255,0.1)] bg-white bg-opacity-10 backdrop-blur-[7px]">
      <CardHeader>
        <CardTitle className="flex items-center text-white">
          <FileText className="w-6 h-6 mr-2" />
          Preparation Checklist
        </CardTitle>
      </CardHeader>
      <CardContent>
        {aiPlanTasks ? (
          <>
            <ul className="space-y-2 text-white mb-4">
              {displayTasks.map((task) => (
                <li key={task.id} className="flex items-center space-x-2">
                  <Checkbox id={`task-${task.id}`} />
                  <label
                    htmlFor={`task-${task.id}`}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {task.description}
                  </label>
                </li>
              ))}
            </ul>
            <Link href="/planner">
              <Button className="w-full bg-[#343434] text-white hover:bg-[#454545]">
                View More
              </Button>
            </Link>
          </>
        ) : (
          <Link href="/planner">
            <Button className="w-full bg-[#343434] text-white hover:bg-[#454545]">
              Generate Plan
            </Button>
          </Link>
        )}
      </CardContent>
    </Card>
  )
}

export default PreparationChecklist

