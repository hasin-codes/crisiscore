import React, { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertTriangle, Thermometer, Droplets, Wind } from "lucide-react"
import { useGeolocation } from '@/hooks/useGeolocation'
import axios from 'axios'

interface ForecastData {
  temperature: number;
  precipitation: number;
  windSpeed: number;
}

const emergencyAlerts = [
  { message: 'Danger Signal 9 in your area - Govt', color: 'bg-red-500' },
]

export default function EmergencyAlerts() {
  const [forecastData, setForecastData] = useState<ForecastData | null>(null);
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

  const weatherData = [
    { title: 'Temperature', value: forecastData?.temperature, unit: '°C', icon: Thermometer, color: 'text-red-400' },
    { title: 'Precipitation', value: forecastData?.precipitation, unit: 'cm', icon: Droplets, color: 'text-blue-400' },
    { title: 'Wind Speed', value: forecastData?.windSpeed, unit: 'knots', icon: Wind, color: 'text-green-400' },
  ];

  return (
    <Card className="border-[#343434] shadow-[0_0_10px_rgba(255,255,255,0.1)] bg-white bg-opacity-10 backdrop-blur-[7px] w-full max-w-3xl mx-auto overflow-hidden">
      <CardHeader className="border-b border-red-700 p-3 sm:p-4 md:p-6">
        <CardTitle className="flex items-center text-white text-lg sm:text-xl md:text-2xl">
          <AlertTriangle className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 mr-2 sm:mr-3 text-red-500" />
          Emergency Alerts
        </CardTitle>
      </CardHeader>
      <CardContent className="p-3 sm:p-4 md:p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 mb-4 sm:mb-6">
          {weatherData.map((item, index) => (
            <div key={index} className="bg-white bg-opacity-10 rounded-lg p-3 flex items-center justify-between transition-all duration-300 hover:bg-opacity-20">
              <div className="flex flex-col">
                <h3 className="text-xs sm:text-sm font-medium text-gray-300">{item.title}</h3>
                {isLoading ? (
                  <div className="animate-pulse bg-white bg-opacity-20 h-5 sm:h-6 w-14 sm:w-16 rounded mt-1"></div>
                ) : (
                  <div className="flex items-baseline mt-1">
                    <p className={`text-base sm:text-lg md:text-xl font-bold ${item.color}`}>
                      {item.value !== undefined ? item.value.toFixed(1) : 'N/A'}
                    </p>
                    <span className={`ml-1 text-xs sm:text-sm ${item.color}`}>{item.unit}</span>
                  </div>
                )}
              </div>
              <item.icon className={`w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 ${item.color}`} />
            </div>
          ))}
        </div>
        <div className="bg-white bg-opacity-10 rounded-lg p-3 sm:p-4">
          <h3 className="text-sm sm:text-base md:text-lg font-semibold text-white mb-2 sm:mb-3">Active Alerts</h3>
          <ul className="space-y-2 sm:space-y-3">
            {emergencyAlerts.map((alert, index) => (
              <li key={index} className="flex items-center bg-black bg-opacity-30 rounded-md p-2 sm:p-3 transition-all duration-300 hover:bg-opacity-40 hover:transform hover:scale-[1.02]">
                <span className={`w-2 h-2 sm:w-3 sm:h-3 ${alert.color} rounded-full mr-2 sm:mr-3 animate-pulse`}></span>
                <span className="text-white text-xs sm:text-sm">{alert.message}</span>
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  )
}