'use client'

import React, { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import axios from 'axios'
import { Thermometer, Droplets, Wind, AlertTriangle } from 'lucide-react'
import { motion } from 'framer-motion'
import { useGeolocation } from '@/hooks/useGeolocation'

interface ForecastData {
  temperature: number;
  precipitation: number;
  windSpeed: number;
}

export default function AlertCards() {
  const [forecastData, setForecastData] = useState<ForecastData | null>(null);
  const [aiMessage, setAiMessage] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);
  const { location, error: locationError } = useGeolocation();

  useEffect(() => {
    const fetchForecastData = async () => {
      if (!location) return;
      
      try {
        setIsLoading(true);
        const response = await axios.post('/api/weather-forecast', { 
          lat: location.latitude, 
          lon: location.longitude 
        });
        const aiResponse = response.data.message;
        setAiMessage(aiResponse);

        // Extract numerical data from AI response
        const tempMatch = aiResponse.match(/(-?\d+(\.\d+)?)\s*°C/);
        const precipMatch = aiResponse.match(/(\d+(\.\d+)?)\s*cm/);
        const windMatch = aiResponse.match(/(\d+(\.\d+)?)\s*knots/);

        setForecastData({
          temperature: tempMatch ? parseFloat(tempMatch[1]) : 0,
          precipitation: precipMatch ? parseFloat(precipMatch[1]) : 0,
          windSpeed: windMatch ? parseFloat(windMatch[1]) : 0,
        });
      } catch (error) {
        console.error('Error fetching forecast data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (location) {
      fetchForecastData();
    }
  }, [location]);

  const cardData = [
    { title: 'Temperature', value: forecastData?.temperature, unit: '°C', icon: Thermometer, gradient: 'from-red-500 to-orange-500' },
    { title: 'Precipitation', value: forecastData?.precipitation, unit: 'cm', icon: Droplets, gradient: 'from-blue-500 to-cyan-500' },
    { title: 'Wind Speed', value: forecastData?.windSpeed, unit: 'knots', icon: Wind, gradient: 'from-green-500 to-teal-500' },
  ];

  return (
    <div className="space-y-6 pb-6">
      <h2 className="text-2xl font-bold text-white">Weather Alerts</h2>
      {locationError ? (
        <p className="text-red-500">{locationError}</p>
      ) : !location ? (
        <p className="text-white">Getting your location...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {cardData.map((card, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className={`border-[#343434] shadow-[0_0_20px_rgba(255,255,255,0.1)] bg-gradient-to-br ${card.gradient} bg-opacity-10 backdrop-blur-[7px] transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(255,255,255,0.2)]`}>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-white text-lg font-medium">{card.title}</CardTitle>
                  <card.icon className="h-6 w-6 text-white opacity-70" />
                </CardHeader>
                <CardContent>
                  {isLoading ? (
                    <div className="animate-pulse bg-white bg-opacity-20 h-8 w-24 rounded"></div>
                  ) : (
                    <p className="text-3xl font-bold text-white">
                      {card.value !== undefined ? `${card.value.toFixed(1)} ${card.unit}` : 'N/A'}
                    </p>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  )
}