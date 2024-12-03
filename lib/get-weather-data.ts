'use client'

import { useLocation } from '@/contexts/location-context'

interface WeatherData {
  temperature: {
    value: number
    unit: '°C'
  }
  precipitation: {
    value: number
    unit: '%'
  }
  windSpeed: {
    value: number
    unit: 'km/h'
  }
}

// This will be replaced with actual API call later
const MOCK_WEATHER_DATA: Record<string, WeatherData> = {
  // London coordinates
  '51.5074,-0.1278': {
    temperature: { value: 28, unit: '°C' },
    precipitation: { value: 30, unit: '%' },
    windSpeed: { value: 15, unit: 'km/h' }
  },
  // Default data
  'default': {
    temperature: { value: 25, unit: '°C' },
    precipitation: { value: 20, unit: '%' },
    windSpeed: { value: 12, unit: 'km/h' }
  }
}

export function useWeatherData() {
  const { latitude, longitude, loading, error } = useLocation()

  if (loading) {
    return {
      loading: true,
      error: null,
      data: null
    }
  }

  if (error) {
    return {
      loading: false,
      error,
      data: MOCK_WEATHER_DATA.default
    }
  }

  // Format coordinates to match mock data key
  const locationKey = latitude && longitude 
    ? `${latitude.toFixed(4)},${longitude.toFixed(4)}`
    : 'default'

  // In real implementation, this would be an API call using the coordinates
  const weatherData = MOCK_WEATHER_DATA[locationKey] || MOCK_WEATHER_DATA.default

  return {
    loading: false,
    error: null,
    data: weatherData
  }
} 