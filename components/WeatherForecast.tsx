import React, { useState, useEffect } from 'react';
import axios from 'axios';

const WeatherForecast: React.FC = () => {
  const [forecast, setForecast] = useState<string>('');

  useEffect(() => {
    const fetchForecast = async () => {
      try {
        const storedForecast = localStorage.getItem('weatherForecast');
        const storedTimestamp = localStorage.getItem('weatherForecastTimestamp');

        if (storedForecast && storedTimestamp) {
          const timeDiff = Date.now() - parseInt(storedTimestamp);
          if (timeDiff < 10 * 60 * 1000) { // 10 minutes
            setForecast(storedForecast);
            return;
          }
        }

        const response = await axios.post('/api/weather-forecast', {
          lat: 40.7128, // Example latitude (New York City)
          lon: -74.0060 // Example longitude (New York City)
        });

        setForecast(response.data.message);
        localStorage.setItem('weatherForecast', response.data.message);
        localStorage.setItem('weatherForecastTimestamp', Date.now().toString());
      } catch (error) {
        console.error('Error fetching weather forecast:', error);
        setForecast('Unable to fetch weather forecast. Please try again later.');
      }
    };

    fetchForecast();
  }, []);

  return (
    <div>
      <h2>Weather Forecast</h2>
      <p>{forecast}</p>
    </div>
  );
};

export default WeatherForecast;