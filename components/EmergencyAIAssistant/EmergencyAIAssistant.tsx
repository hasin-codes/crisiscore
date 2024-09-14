import React, { useState, useRef } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { ScrollArea } from '@/components/ui/scroll-area'
import { MessageSquare, User, Send } from "lucide-react"

type Message = {
  text: string;
  isAI: boolean;
}

const EmergencyAIAssistant = () => {
  const [messages, setMessages] = useState<Message[]>([
    { text: "Welcome to the Emergency AI Assistant. How can I help you today?", isAI: true },
    { text: "I need information about evacuation procedures.", isAI: false }
  ])
  const [input, setInput] = useState('')
  const scrollAreaRef = useRef<HTMLDivElement>(null)

  const handleSend = () => {
    if (input.trim()) {
      setMessages([...messages, { text: input, isAI: false }])
      setInput('')
      // Simulate AI response
      setTimeout(() => {
        setMessages(prev => [...prev, { text: "I'm processing your request. Please stand by for detailed information.", isAI: true }])
      }, 1000)
    }
  }

  return (
    <Card className="border-[#343434] shadow-[0_0_10px_rgba(255,255,255,0.1)] bg-white bg-opacity-10 backdrop-blur-[7px] lg:row-span-2 w-full max-w-2xl mx-auto h-[600px] flex flex-col">
      <CardHeader className="border-b border-[#343434]">
        <CardTitle className="flex items-center text-white">
          <MessageSquare className="w-6 h-6 mr-2" />
          Emergency AI Assistant
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-grow flex flex-col p-0">
        <ScrollArea className="flex-grow p-4" ref={scrollAreaRef}>
          {messages.map((message, index) => (
            <div key={index} className={`flex ${message.isAI ? 'justify-start' : 'justify-end'} mb-4`}>
              <div className={`flex ${message.isAI ? 'flex-row' : 'flex-row-reverse'} items-start max-w-[80%]`}>
                <div className={`flex-shrink-0 ${message.isAI ? 'mr-3' : 'ml-3'}`}>
                  {message.isAI ? (
                    <div className="w-8 h-8 bg-[#343434] rounded-full flex items-center justify-center">
                      <MessageSquare className="w-5 h-5 text-white" />
                    </div>
                  ) : (
                    <div className="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                      <User className="w-5 h-5 text-white" />
                    </div>
                  )}
                </div>
                <div className={`rounded-lg p-3 ${message.isAI ? 'bg-[#343434] text-white' : 'bg-white bg-opacity-20 text-white'}`}>
                  {message.text}
                </div>
              </div>
            </div>
          ))}
        </ScrollArea>
        <div className="border-t border-[#343434] p-4">
          <div className="flex items-end">
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && (e.preventDefault(), handleSend())}
              placeholder="Type your message here..."
              className="flex-grow mr-2 min-h-[60px] max-h-[120px] bg-[#010B13] text-white border-[#343434]"
            />
            <Button onClick={handleSend} className="flex-shrink-0 bg-[#343434] text-white hover:bg-[#454545]">
              <Send className="w-4 h-4" />
              <span className="sr-only">Send message</span>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default EmergencyAIAssistant