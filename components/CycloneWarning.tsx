'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent } from "@/components/ui/card"
import axios from 'axios'

export default function CycloneWarning() {
  const [fullText, setFullText] = useState('')
  const [displayText, setDisplayText] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [location, setLocation] = useState<{ lat: number; lon: number } | null>(null)

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lon: position.coords.longitude
          })
        },
        (error) => {
          console.error('Error getting location:', error)
          setFullText('Unable to get your location. Please enable location services and try again.')
        }
      )
    } else {
      setFullText('Geolocation is not supported by your browser.')
    }
  }, [])

  useEffect(() => {
    const fetchWeatherWarning = async () => {
      if (!location) return

      try {
        const weatherResponse = await axios.post('/api/weather-forecast', {
          lat: location.lat,
          lon: location.lon
        })

        setFullText(weatherResponse.data.message)
        setIsTyping(true)
      } catch (error) {
        console.error('Error fetching weather warning:', error)
        setFullText('Unable to fetch weather warning. Please check back later.')
        setIsTyping(true)
      }
    }

    if (location) {
      fetchWeatherWarning()
    }
  }, [location])

  useEffect(() => {
    if (!isTyping) return

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
  }, [fullText, isTyping])

  return (
    <div className="px-4">
      <Card className="border-[#343434] shadow-[0_0_10px_rgba(255,255,255,0.1)] bg-white bg-opacity-10 backdrop-blur-[7px] min-h-[65px] w-full">
        <CardContent className="p-4">
          <p className="text-lg font-bold text-white whitespace-pre-wrap" aria-live="polite">
            {displayText}
            {isTyping && (
              <span 
                className="inline-block w-2 h-4 ml-1 bg-white animate-pulse" 
                aria-hidden="true"
              ></span>
            )}
          </p>
        </CardContent>
      </Card>
    </div>
  )
}