'use client'

import { createContext, useContext, ReactNode, useEffect, useState } from 'react'
import { useGeolocation } from '@/hooks/use-geolocation'
import opencage from 'opencage-api-client'

interface LocationContextType {
  latitude: number | null
  longitude: number | null
  error: string | null
  loading: boolean
  address: string | null
}

const LocationContext = createContext<LocationContextType>({
  latitude: null,
  longitude: null,
  error: null,
  loading: true,
  address: null
})

export function LocationProvider({ children }: { children: ReactNode }) {
  const location = useGeolocation()
  const [address, setAddress] = useState<string | null>(null)

  useEffect(() => {
    let isMounted = true
    const controller = new AbortController()

    async function getAddress() {
      if (location.latitude && location.longitude) {
        try {
          const result = await opencage.geocode({
            q: `${location.latitude},${location.longitude}`,
            key: process.env.NEXT_PUBLIC_OPENCAGE_API_KEY!,
            language: 'en',
            pretty: 1,
            limit: 1
          })
          
          if (result.results.length > 0 && isMounted) {
            const place = result.results[0]
            setAddress(place.formatted)
          }
        } catch (error) {
          console.error('Error getting address:', error)
        }
      }
    }

    getAddress()

    return () => {
      isMounted = false
      controller.abort()
    }
  }, [location.latitude, location.longitude])

  const contextValue = {
    ...location,
    address
  }

  return (
    <LocationContext.Provider value={contextValue}>
      {children}
    </LocationContext.Provider>
  )
}

export function useLocation(): LocationContextType {
  const context = useContext(LocationContext)
  if (!context) {
    console.error('useLocation must be used within LocationProvider')
    return {
      latitude: null,
      longitude: null,
      error: 'Location context not available',
      loading: false,
      address: null
    }
  }
  return context
} 