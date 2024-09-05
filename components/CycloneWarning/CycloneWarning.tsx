'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { Card, CardContent } from "@/components/ui/card"
import axios from 'axios'

const RATE_LIMIT_DURATION = 10 * 60 * 1000 // 10 minutes in milliseconds

export default function CycloneWarning() {
  const [fullText, setFullText] = useState('')
  const [displayText, setDisplayText] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [location, setLocation] = useState<{ lat: number; lon: number } | null>(null)
  const lastFetchTime = useRef<number>(0)
  const cachedWeatherData = useRef<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const canFetch = useCallback(() => {
    const now = Date.now()
    return now - lastFetchTime.current >= RATE_LIMIT_DURATION
  }, [])

  const fetchWeatherWarning = useCallback(async () => {
    if (!location || !canFetch()) {
      const remainingTime = Math.ceil((RATE_LIMIT_DURATION - (Date.now() - lastFetchTime.current)) / 1000)
      setError(`Please wait ${remainingTime} seconds before making another request.`)
      return
    }

    try {
      const weatherResponse = await axios.post('/api/weather-forecast', {
        lat: location.lat,
        lon: location.lon
      })

      setFullText(weatherResponse.data.message)
      cachedWeatherData.current = weatherResponse.data.message
      lastFetchTime.current = Date.now()
      setIsTyping(true)
      setError(null)
    } catch (error) {
      console.error('Error fetching weather warning:', error)
      setError('Unable to fetch weather warning. Please check back later.')
      setIsTyping(false)
    }
  }, [location, canFetch])

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
    if (location && canFetch()) {
      fetchWeatherWarning()
    }
  }, [location, fetchWeatherWarning, canFetch])

  useEffect(() => {
    const checkAndFetch = () => {
      if (canFetch()) {
        fetchWeatherWarning()
      }
    }

    const intervalId = setInterval(checkAndFetch, 60000) // Check every minute
    return () => clearInterval(intervalId)
  }, [fetchWeatherWarning, canFetch])

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
          {error ? (
            <p className="text-lg font-bold text-red-500">{error}</p>
          ) : (
            <p className="text-lg font-bold text-white whitespace-pre-wrap" aria-live="polite">
              {displayText}
              {isTyping && (
                <span 
                  className="inline-block w-2 h-4 ml-1 bg-white animate-pulse" 
                  aria-hidden="true"
                ></span>
              )}
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  )
}