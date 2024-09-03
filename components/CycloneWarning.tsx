'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent } from "@/components/ui/card"

export default function CycloneWarning() {
  const [displayText, setDisplayText] = useState('')
  const [isTyping, setIsTyping] = useState(true)
  const fullText = "A powerful cyclone is moving in from the east with extremely dangerous winds at 33 m/s. This can rip off coconut trees and cause severe damage to buildings, including tearing off roofs."

  useEffect(() => {
    let i = 0
    const typingInterval = setInterval(() => {
      if (i < fullText.length) {
        setDisplayText(fullText.slice(0, i + 1))
        i++
      } else {
        clearInterval(typingInterval)
        setIsTyping(false)
      }
    }, 50) // Faster typing speed for longer text

    return () => clearInterval(typingInterval)
  }, [])

  return (
    <div className="px-4">
      <Card className="border-[#343434] shadow-[0_0_10px_rgba(255,255,255,0.1)] bg-white bg-opacity-10 backdrop-blur-[40px]">
        <CardContent className="p-2">
          <p className="text-2xl font-bold text-white whitespace-pre-wrap" aria-live="polite">
            {displayText}
            {isTyping && (
              <span 
                className="inline-block w-2 h-8 ml-1 bg-white animate-pulse" 
                aria-hidden="true"
              ></span>
            )}
          </p>
        </CardContent>
      </Card>
    </div>
  )
}