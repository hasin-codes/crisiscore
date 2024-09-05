import React, { useEffect, useRef } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Wind, Droplets } from "lucide-react"
import useWeatherData from '../../app/hooks/useGeolocation'
import { formatNumber } from '../../utils/formatters'

declare global {
  interface Window {
    windyInit: any;
    L: any;
  }
}

const WeatherInsights = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const { weatherData, error, userLocation } = useWeatherData();

  useEffect(() => {
    const loadScripts = async () => {
      await loadScript('https://unpkg.com/leaflet@1.4.0/dist/leaflet.js');
      await loadScript('https://api.windy.com/assets/map-forecast/libBoot.js');
      if (userLocation) {
        initWindyMap(userLocation.lat, userLocation.lon);
      }
    };

    loadScripts();
  }, [userLocation]);

  const loadScript = (src: string): Promise<void> => {
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = src;
      script.async = true;
      script.onload = () => resolve();
      script.onerror = () => reject();
      document.body.appendChild(script);
    });
  };

  const initWindyMap = (lat: number, lon: number) => {
    if (mapRef.current && window.windyInit) {
      const mapApiKey = process.env.NEXT_PUBLIC_WINDY_MAP_API_KEY;
      if (!mapApiKey) {
        console.error("Windy Map API key is not set in environment variables");
        return;
      }
      const options = {
        key: mapApiKey,
        lat: lat,
        lon: lon,
        zoom: 20,
      };

      window.windyInit(options, (windyAPI: any) => {
        const { map } = windyAPI;
        if (window.L) {
          window.L.marker([lat, lon]).addTo(map).bindPopup('Your Location').openPopup();
        }
      });
    }
  };

  return (
    <Card className="col-span-1 md:col-span-2 border-[#343434] shadow-[0_0_10px_rgba(255,255,255,0.1)] bg-white bg-opacity-10 backdrop-blur-[7px]">
      <CardHeader>
        <CardTitle className="flex items-center text-white">
          <svg className="w-6 h-6 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Weather Insights
        </CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-2 gap-4">
        <div className="flex items-center">
          <Wind className="w-8 h-8 mr-2 text-white" />
          <div>
            <div className="text-sm text-white">Wind Speed</div>
            <div className="text-xl font-bold text-white">
              {weatherData ? `${formatNumber(weatherData.windSpeed * 1.94384, 1)} knots ${weatherData.windDirection}` : 'Loading...'}
            </div>
          </div>
        </div>
        <div className="flex items-center">
          <Droplets className="w-8 h-8 mr-2 text-white" />
          <div>
            <div className="text-sm text-white">Precipitation</div>
            <div className="text-xl font-bold text-white">
              {weatherData ? `${formatNumber(weatherData.precipitation / 10, 2)} cm` : 'Loading...'}
            </div>
          </div>
        </div>
        {error && (
          <div className="col-span-2 text-red-500">
            Error: {error}. Please check the console for more details.
          </div>
        )}
        <div className="col-span-2 bg-[#010B13] rounded-lg p-2" style={{height: '300px'}}>
          <div id="windy" ref={mapRef} className="w-full h-full bg-black rounded-lg relative overflow-hidden">
            {!userLocation && <div className="absolute inset-0 flex items-center justify-center text-white">Loading map...</div>}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default WeatherInsights