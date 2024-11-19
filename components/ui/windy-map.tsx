'use client'

import React, { useEffect } from 'react'
import ClientOnly from '@/components/ui/client-only'

interface WindyMapProps {
  className?: string;
  height?: string;
}

declare global {
  interface Window {
    windyInit: any;
    L: any;
  }
}

export function WindyMap({ className = "", height = "400px" }: WindyMapProps) {
  useEffect(() => {
    // Basic options
    const options = {
      key: 'UNCGlTSf0dcRpJzJOb5dD1Cqo3ox8QgM',
      lat: 50.4,
      lon: 14.3,
      zoom: 5,
      container: document.getElementById('windy')
    }

    // Initialize Windy API
    window.windyInit(options, (windyAPI: any) => {
      const { map, store } = windyAPI
      store.set('overlay', 'wind')
    })
  }, [])

  return (
    <ClientOnly>
      <div 
        id="windy"
        className={`w-full h-full rounded-lg overflow-hidden ${className}`}
        style={{ 
          minHeight: height,
          background: '#202123'
        }}
      />
    </ClientOnly>
  )
} 