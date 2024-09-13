'use client'

import React, { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import axios from 'axios'
import { useGeolocation } from '@/hooks/useGeolocation'

interface WeatherDetails {
  message: string;
}

export default function AlertDetails() {
  const [weatherDetails, setWeatherDetails] = useState<WeatherDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { location, error: locationError } = useGeolocation();

  useEffect(() => {
    const fetchWeatherDetails = async () => {
      if (!location) return;
      
      try {
        setIsLoading(true);
        const response = await axios.post('/api/weather-forecast', { 
          lat: location.latitude, 
          lon: location.longitude 
        });
        setWeatherDetails(response.data);
      } catch (error) {
        console.error('Error fetching weather details:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (location) {
      fetchWeatherDetails();
    }
  }, [location]);

  return (
    <Card className="border-[#343434] shadow-[0_0_10px_rgba(255,255,255,0.1)] bg-white bg-opacity-10 backdrop-blur-[7px] mb-6">
      <CardHeader>
        <CardTitle className="text-white">Weather Alert Details</CardTitle>
      </CardHeader>
      <CardContent>
        {locationError ? (
          <p className="text-red-500">{locationError}</p>
        ) : !location ? (
          <p className="text-white">Getting your location...</p>
        ) : isLoading ? (
          <div className="animate-pulse space-y-2">
            <div className="bg-white bg-opacity-20 h-4 w-3/4 rounded"></div>
            <div className="bg-white bg-opacity-20 h-4 w-1/2 rounded"></div>
          </div>
        ) : (
          <p className="text-sm text-white">{weatherDetails?.message || 'No weather details available.'}</p>
        )}
      </CardContent>
    </Card>
  )
}