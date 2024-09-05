import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BrainCircuit } from "lucide-react"

export default function Planner() {
  return (
    <Card className="col-span-1 md:col-span-2 border-[#343434] shadow-[0_0_10px_rgba(255,255,255,0.1)] bg-white bg-opacity-10 backdrop-blur-[7px]">
      <CardHeader>
        <CardTitle className="flex items-center text-white">
          <BrainCircuit className="w-6 h-6 mr-2" />
          AI Planner
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="bg-[#010B13] rounded-lg p-4 h-[300px] overflow-y-auto">
          <p className="text-white text-sm">
            This is where the AI-generated text will appear. The content is read-only and can be scrolled if it exceeds the height of the container.
          </p>
          {/* Add more paragraphs or content as needed */}
        </div>
      </CardContent>
    </Card>
  )
}