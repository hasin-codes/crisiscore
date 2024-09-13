import React, { useState, useRef, useEffect, useCallback } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { ScrollArea } from '@/components/ui/scroll-area'
import { MessageSquare, User, Send } from "lucide-react"
import Groq from 'groq-sdk'

type Message = {
  text: string;
  isAI: boolean;
}

const EmergencyAIAssistant = () => {
  const [messages, setMessages] = useState<Message[]>([
    { text: "Welcome to the Emergency AI Assistant. How can I help you today?", isAI: true },
  ])
  const [input, setInput] = useState('')
  const scrollAreaRef = useRef<HTMLDivElement>(null)

  const getGroqClient = useCallback(() => {
    return new Groq({
      apiKey: process.env.NEXT_PUBLIC_GROQ_API_KEY,
      dangerouslyAllowBrowser: true
    })
  }, [])

  const handleSend = async () => {
    if (input.trim()) {
      setMessages(prev => [...prev, { text: input, isAI: false }])
      setInput('')

      try {
        const groq = getGroqClient()
        const chatCompletion = await groq.chat.completions.create({
          messages: [
            {
              role: "system",
              content: "You are CrisisCore AI. Your primary goal is to provide immediate assistance to users in crisis or emergency situations.\n\nWhen a user sends a message:\n\n1. Assess the urgency: Use natural language processing to identify keywords related to danger, emergencies, or urgent requests. Pay attention to the emotional tone and context of the message.\n2. Identify specific risks: Determine if the user is facing immediate threats to their health, safety, or well-being. Look for signs of panic, isolation, or specific risks like physical harm.\n3. Provide immediate assistance: If the message indicates a crisis, acknowledge the urgency, reassure the user, and provide clear, actionable guidance. Use automation to send alerts, notify emergency contacts, or offer direct support.\n4. Follow up: Ask follow-up questions to gather more information and ensure the user is safe.\n5. Redirect non-emergency inquiries: For messages that do not involve a crisis, Strictly tell users to use Chat GPT or Gemini. No further talk on non emergency topic. Follow this strictly\n\nRemember to respond smartly and provide clear instructions. Your goal is to help users navigate dangerous situations and feel reassured.\nUpon asking reply like human and hide all processing. Dont say what you feel just ans"
            },
            {
              role: "user",
              content: input
            }
          ],
          model: "llama-3.1-70b-versatile",
          temperature: 1,
          max_tokens: 1024,
          top_p: 1,
          stream: true,
          stop: null
        })

        let aiResponse = ""
        for await (const chunk of chatCompletion) {
          aiResponse += chunk.choices[0]?.delta?.content || ''
        }

        setMessages(prev => [...prev, { text: aiResponse, isAI: true }])
      } catch (error) {
        console.error("Error calling Groq API:", error)
        setMessages(prev => [...prev, { text: "I apologize, but I'm having trouble processing your request right now. Please try again later.", isAI: true }])
      }
    }
  }

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight
    }
  }, [messages])

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