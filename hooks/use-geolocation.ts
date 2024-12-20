'use client'

import { useState, useEffect } from 'react'

interface GeolocationState {
  latitude: number | null
  longitude: number | null
  error: string | null
  loading: boolean
}

export function useGeolocation() {
  const [state, setState] = useState<GeolocationState>({
    latitude: null,
    longitude: null,
    error: null,
    loading: true,
  })

  useEffect(() => {
    if (typeof window === 'undefined' || !navigator?.geolocation) {
      setState({
        latitude: null,
        longitude: null,
        error: 'Geolocation is not supported',
        loading: false,
      })
      return
    }

    const handleSuccess = (position: GeolocationPosition) => {
      setState({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        error: null,
        loading: false,
      })
    }

    const handleError = (error: GeolocationPositionError) => {
      // More detailed error messages with debugging info
      const errorMessage = {
        1: 'Location access denied. Please enable location services in your browser settings.',
        2: `Unable to determine location. Error: ${error.message}. Try refreshing or check if you're on HTTPS.`,
        3: 'Location request timed out. Please check your connection and try again.'
      }[error.code] || `Failed to get location: ${error.message}`

      console.debug('Geolocation error:', {
        code: error.code,
        message: error.message,
        PERMISSION_DENIED: error.PERMISSION_DENIED,
        POSITION_UNAVAILABLE: error.POSITION_UNAVAILABLE,
        TIMEOUT: error.TIMEOUT
      })

      setState({
        latitude: null,
        longitude: null,
        error: errorMessage,
        loading: false,
      })
    }

    // Increase timeout and adjust settings
    const geoOptions = {
      enableHighAccuracy: false, // Set to false first to try less accurate but faster position
      timeout: 10000, // Increased timeout
      maximumAge: 30000 // Allow cached positions up to 30 seconds old
    }

    // Try getting position with less strict settings first
    navigator.geolocation.getCurrentPosition(
      handleSuccess,
      (error) => {
        if (error.code === error.POSITION_UNAVAILABLE) {
          // If initial attempt fails, try again with high accuracy
          navigator.geolocation.getCurrentPosition(
            handleSuccess,
            handleError,
            { ...geoOptions, enableHighAccuracy: true, timeout: 20000 }
          )
        } else {
          handleError(error)
        }
      },
      geoOptions
    )

    // Watch for location updates
    const watchId = navigator.geolocation.watchPosition(
      handleSuccess,
      handleError,
      { ...geoOptions, enableHighAccuracy: true }
    )

    // Cleanup function to remove the watch when component unmounts
    return () => {
      navigator.geolocation.clearWatch(watchId)
    }
  }, [])

  return state
} 