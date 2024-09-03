import { useState, useEffect } from 'react';
import { ReactNode } from 'react'; // Add this import

interface WeatherData {
  location: string; // Make sure this property is included
  past3hprecip: any;
  ts: any;
  wind_u: any;
  wind_v: any;
  units: any;
  warning: any;
  windSpeed: number;
  windDirection: string;
  precipitation: any;
}

const useWeatherData = () => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [userLocation, setUserLocation] = useState<{ lat: number; lon: number } | null>(null);

  useEffect(() => {
    const getUserLocation = () => {
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setUserLocation({
              lat: position.coords.latitude,
              lon: position.coords.longitude
            });
          },
          (error) => {
            console.error("Error getting user location:", error);
            setError("Unable to get user location");
          }
        );
      } else {
        setError("Geolocation is not supported by this browser");
      }
    };

    getUserLocation();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (!userLocation) return;

      try {
        const data = await fetchWeatherData(userLocation.lat, userLocation.lon);
        setWeatherData(data);
        setError(null);
      } catch (err) {
        console.error("Error fetching weather data:", err);
        setError(err instanceof Error ? err.message : "Failed to fetch weather data");
      }
    };

    if (userLocation) {
      fetchData();
    }
  }, [userLocation]);

  return { weatherData, error, userLocation };
};

async function fetchWeatherData(lat: number, lon: number): Promise<WeatherData> {
  const apiKey = process.env.NEXT_PUBLIC_WINDY_API_KEY;
  if (!apiKey) {
    console.error("Windy API key is not set in environment variables");
    throw new Error('Windy API key is not set');
  }

  const response = await fetch('https://api.windy.com/api/point-forecast/v2', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      lat,
      lon,
      model: 'gfs',
      parameters: ['wind', 'precip'],
      key: apiKey
    }),
  });

  if (response.ok) {
    const data = await response.json();
    
    // Check if the expected properties exist
    if (!data['past3hprecip-surface'] || !data.ts || !data['wind_u-surface'] || !data['wind_v-surface'] || !data.units) {
      throw new Error('Unexpected data structure from API');
    }

    const wind_u = data['wind_u-surface'][0];
    const wind_v = data['wind_v-surface'][0];
    const windSpeedMS = Math.sqrt(wind_u ** 2 + wind_v ** 2);
    const windSpeedKnots = windSpeedMS * 1.94384; // Convert m/s to knots
    const windDirection = getWindDirection(Math.atan2(wind_v, wind_u) * 180 / Math.PI);
    const precipitation = data['past3hprecip-surface'][0];

    return {
      location: `${lat.toFixed(4)}, ${lon.toFixed(4)}`, // Add this line
      past3hprecip: data['past3hprecip-surface'],
      ts: data.ts,
      wind_u: data['wind_u-surface'],
      wind_v: data['wind_v-surface'],
      units: {
        ...data.units,
        'wind_speed': 'knots' // Update the unit for wind speed
      },
      warning: data.warning,
      windSpeed: windSpeedKnots,
      windDirection,
      precipitation
    };
  } else {
    throw new Error('Failed to fetch weather data');
  }
}

function getWindDirection(degree: number): string {
  const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
  return directions[Math.round(((degree + 360) % 360) / 45) % 8];
}

export default useWeatherData;