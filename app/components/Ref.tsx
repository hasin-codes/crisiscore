import { useState, useEffect } from 'react';
import useWeatherData from '../hooks/useGeolocation';
import { formatNumber } from '../utils/formatters';

interface WeatherData {
  location: string;
  windSpeed: number;
  precipitation: number;
  windDirection: string; // Add this if it's used
  // Add any other properties that are used from weatherData
}

function AIChatHistory() {
  // ... existing code ...

  const { weatherData, error } = useWeatherData();

  const convertToKnots = (speedMS: number) => speedMS * 1.94384;
  const convertToCM = (precipMM: number) => precipMM / 10; // Convert mm to cm

  const speedInKnots = weatherData ? formatNumber(convertToKnots(weatherData.windSpeed), 1) : 0;
  const precipitationCM = weatherData ? formatNumber(convertToCM(weatherData.precipitation), 2) : 0;

  return (
    <div className="p-4">
      {/* ... existing JSX ... */}
      {weatherData && (
        <div className="mt-4 bg-gray-100 p-4 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-2">Weather Information</h2>
          <p className="mb-1"><span className="font-medium">Location:</span> {weatherData.location}</p>
          <p className="mb-1"><span className="font-medium">Wind Speed:</span> {speedInKnots} knots</p>
          <p><span className="font-medium">Precipitation:</span> {precipitationCM} cm</p>
        </div>
      )}
      {error && (
        <div className="mt-4 bg-red-100 p-4 rounded-lg text-red-700">
          <p><span className="font-medium">Error:</span> {error}</p>
        </div>
      )}
      {/* ... existing JSX ... */}
    </div>
  );
}

export default AIChatHistory;