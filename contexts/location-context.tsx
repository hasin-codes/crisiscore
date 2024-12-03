'use client'

import { createContext, useContext, ReactNode } from 'react'
import { useGeolocation } from '@/hooks/use-geolocation'

interface LocationContextType {
  latitude: number | null
  longitude: number | null
  error: string | null
  loading: boolean
}

const LocationContext = createContext<LocationContextType | undefined>(undefined)

export function LocationProvider({ children }: { children: ReactNode }) {
  const location = useGeolocation()

  return (
    <LocationContext.Provider value={location}>
      {children}
    </LocationContext.Provider>
  )
}

export function useLocation() {
  const context = useContext(LocationContext)
  if (context === undefined) {
    throw new Error('useLocation must be used within a LocationProvider')
  }
  return context
} 