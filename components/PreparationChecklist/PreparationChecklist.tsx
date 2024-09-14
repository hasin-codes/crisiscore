import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText } from "lucide-react"

const PreparationChecklist = () => {
  return (
    <Card className="border-[#343434] shadow-[0_0_10px_rgba(255,255,255,0.1)] bg-white bg-opacity-10 backdrop-blur-[7px]">
      <CardHeader>
        <CardTitle className="flex items-center text-white">
          <FileText className="w-6 h-6 mr-2" />
          Preparation Checklist
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2 text-white">
          <li className="flex items-center">
            <input type="checkbox" className="mr-2 form-checkbox text-white" />
            <span>Gather important documents</span>
          </li>
          <li className="flex items-center">
            <input type="checkbox" className="mr-2 form-checkbox text-[#010B13]" />
            <span>Prepare emergency kit</span>
          </li>
          <li className="flex items-center">
            <input type="checkbox" className="mr-2 form-checkbox text-[#010B13]" />
            <span>Secure property</span>
          </li>
        </ul>
      </CardContent>
    </Card>
  )
}

export default PreparationChecklist

