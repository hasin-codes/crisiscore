'use client'

import React, { useEffect, useRef } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Wind, Droplets, AlertTriangle, FileText, Phone, Send, MessageSquare } from "lucide-react"
import useWeatherData from '../app/hooks/useGeolocation'
import { formatNumber } from '../utils/formatters'

declare global {
  interface Window {
    windyInit: any;
    L: any;
  }
}

export function HomePage() {
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
        zoom: 10,
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
    <div className="min-h-screen text-white p-4 font-sans">
      <header className="mb-6">
        <h1 className="text-2xl font-bold text-left text-white">CrisisCore</h1>
      </header>
      <Card className="col-span-1 md:col-span-2 border-[#343434] shadow-[0_0_10px_rgba(255,255,255,0.1)] bg-white bg-opacity-10 backdrop-blur-[9px] mb-4">
          <CardHeader>
            <CardTitle className="text-xxl font-bold">Hello</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xl mb-2">A powerful cyclone is moving in from the east with extremely dangerous winds at 33 m/s. This can rip off coconut trees and cause severe damage to buildings, including tearing off roofs.</p>
          </CardContent>
        </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Weather Updates */}
        <Card className="col-span-1 md:col-span-2 border-[#343434] shadow-[0_0_10px_rgba(255,255,255,0.1)] bg-white bg-opacity-10 backdrop-blur-[9px]">
          <CardHeader>
            <CardTitle className="flex items-center text-white">
              <svg className="w-6 h-6 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Tactical Weather
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

        {/* Alerts Section */}
        <Card className="border-red-700 shadow-[0_0_10px_rgba(255,255,255,0.1)] bg-white bg-opacity-10 backdrop-blur-[9px]">
          <CardHeader>
            <CardTitle className="flex items-center text-white">
              <AlertTriangle className="w-6 h-6 mr-2" />
              Critical Alerts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-white">
              <li className="flex items-center">
                <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
                Water levels critical in Zone A
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></span>
                Evacuation order for Sector 7
              </li>
            </ul>
          </CardContent>
        </Card>

        {/* Planner Section */}
        <Card className="border-[#343434] shadow-[0_0_10px_rgba(255,255,255,0.1)] bg-white bg-opacity-10 backdrop-blur-[9px]">
          <CardHeader>
            <CardTitle className="flex items-center text-white">
              <FileText className="w-6 h-6 mr-2" />
              Mission Checklist
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-white">
              <li className="flex items-center">
                <input type="checkbox" className="mr-2 form-checkbox text-white" />
                <span>Gather important documents</span>
              </li>
              <li className="flex items-center">
                <input type="checkbox" className="mr-2 form-checkbox text-[#010B13]" />
                <span>Prepare emergency kit</span>
              </li>
              <li className="flex items-center">
                <input type="checkbox" className="mr-2 form-checkbox text-[#010B13]" />
                <span>Secure property</span>
              </li>
            </ul>
          </CardContent>
        </Card>

        {/* Emergency Tools */}
        <Card className="border-[#343434] shadow-[0_0_10px_rgba(255,255,255,0.1)] bg-white bg-opacity-10 backdrop-blur-[9px]">
          <CardHeader>
            <CardTitle className="flex items-center text-white">
              <svg className="w-6 h-6 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10 2L3 9L10 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M14 2L21 9L14 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <line x1="3" y1="22" x2="21" y2="22" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
              Emergency Controls
            </CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-2">
            <Button variant="destructive" className="w-full text-white">
              <Phone className="w-4 h-4 mr-2" />
              SOS Call
            </Button>
            <Button variant="outline" className="w-full bg-yellow-900 text-yellow-100 border-yellow-700 hover:bg-yellow-800">
              <AlertTriangle className="w-4 h-4 mr-2" />
              Report Damage
            </Button>
            <Button variant="outline" className="w-full col-span-2 bg-[#010B13] text-white border-[#010B13] hover:bg-[#010B13]">
              <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                <path d="M12 6V12L16 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
              Emergency Broadcast
            </Button>
          </CardContent>
        </Card>

        {/* Relief Section */}
        <Card className="col-span-1 md:col-span-2 border-[#343434] shadow-[0_0_10px_rgba(255,255,255,0.1)] bg-white bg-opacity-10 backdrop-blur-[9px]">
          <CardHeader>
            <CardTitle className="flex items-center text-white">
              <Send className="w-6 h-6 mr-2" />
              Relief Operations
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium text-white">Aid Request #1274</span>
                  <span className="text-sm font-medium text-white">70%</span>
                </div>
                <Progress value={70} className="w-full" />
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium text-white">Aid Dispatch #892</span>
                  <span className="text-sm font-medium text-white">40%</span>
                </div>
                <Progress value={40} className="w-full" />
              </div>
              <Button className="w-full bg-green-700 hover:bg-green-600 text-white">
                Request/Send Aid
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* AI Chat */}
        <Card className="border-[#343434] shadow-[0_0_10px_rgba(255,255,255,0.1)] bg-white bg-opacity-10 backdrop-blur-[9px]">
          <CardHeader>
            <CardTitle className="flex items-center text-white">
              <MessageSquare className="w-6 h-6 mr-2" />
              Operations Command AI
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="h-32 bg-[#010B13] rounded-lg p-2 overflow-y-auto">
                <p className="text-sm text-white">How can I assist with your emergency operations?</p>
              </div>
              <div className="flex items-center">
                <input type="text" placeholder="Enter your query..." className="flex-grow mr-2 p-2 bg-[#010B13] rounded-lg text-white" />
                <Button className="text-white">Send</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}