import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CrisisCoreAIButton from './CrisisCoreAIButton';

const WeatherForecast: React.FC = () => {
  const [forecast, setForecast] = useState<string>('');
  const [lastFetchTime, setLastFetchTime] = useState<number | null>(null);
  const [location, setLocation] = useState<{ lat: number; lon: number } | null>(null);

  const getLocation = (): Promise<GeolocationPosition> => {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error('Geolocation is not supported by your browser'));
      } else {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      }
    });
  };

  const fetchForecast = async () => {
    if (!location) {
      setForecast('Unable to get your location. Please enable location services and try again.');
      return;
    }

    try {
      const response = await axios.post('/api/weather-forecast', {
        lat: location.lat,
        lon: location.lon
      });

      setForecast(response.data.message);
      localStorage.setItem('weatherForecast', response.data.message);
      const currentTime = Date.now();
      localStorage.setItem('weatherForecastTimestamp', currentTime.toString());
      setLastFetchTime(currentTime);
    } catch (error) {
      console.error('Error fetching weather forecast:', error);
      setForecast('Unable to fetch weather forecast. Please try again later.');
    }
  };

  useEffect(() => {
    const initializeLocation = async () => {
      try {
        const position = await getLocation();
        setLocation({
          lat: position.coords.latitude,
          lon: position.coords.longitude
        });
      } catch (error) {
        console.error('Error getting location:', error);
        setForecast('Unable to get your location. Please enable location services and refresh the page.');
      }
    };

    initializeLocation();
  }, []);

  useEffect(() => {
    if (location) {
      const storedForecast = localStorage.getItem('weatherForecast');
      const storedTimestamp = localStorage.getItem('weatherForecastTimestamp');

      if (storedForecast && storedTimestamp) {
        const timeDiff = Date.now() - parseInt(storedTimestamp);
        if (timeDiff < 10 * 60 * 1000) { // 10 minutes
          setForecast(storedForecast);
          setLastFetchTime(parseInt(storedTimestamp));
          return;
        }
      }

      fetchForecast();
    }
  }, [location]);

  const canFetch = () => {
    if (!lastFetchTime) return true;
    return Date.now() - lastFetchTime > 10 * 60 * 1000; // 10 minutes
  };

  return (
    <div>
      <h2>Weather Forecast</h2>
      <p>{forecast}</p>
      <CrisisCoreAIButton fetchWeatherForecast={fetchForecast} canFetch={canFetch} />
    </div>
  );
};

export default WeatherForecast;