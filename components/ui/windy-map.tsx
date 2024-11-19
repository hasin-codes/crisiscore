'use client'

import React, { useEffect } from 'react'
import ClientOnly from '@/components/ui/client-only'
import type { Map } from 'leaflet'

interface WindyMapProps {
  className?: string;
  height?: string;
}

interface WindyAPI {
  map: Map;
  store: {
    set: (key: string, value: string) => void;
  };
}

declare global {
  interface Window {
    windyInit: (options: WindyOptions, callback: (api: WindyAPI) => void) => void;
    L: any;
  }
}

interface WindyOptions {
  key: string;
  lat: number;
  lon: number;
  zoom: number;
  container: HTMLElement | string;
}

export function WindyMap({ className = "", height = "400px" }: WindyMapProps) {
  useEffect(() => {
    const windyContainer = document.getElementById('windy')
    if (!windyContainer) return

    // Basic options
    const options: WindyOptions = {
      key: 'UNCGlTSf0dcRpJzJOb5dD1Cqo3ox8QgM',
      lat: 50.4,
      lon: 14.3,
      zoom: 5,
      container: windyContainer
    }

    // Initialize Windy API
    window.windyInit(options, (windyAPI: WindyAPI) => {
      const { store } = windyAPI
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