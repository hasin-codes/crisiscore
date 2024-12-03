DASHBOARD WEATHER DATA IMPLEMENTATION GUIDE

1. Weather Data Structure
The weather data should follow this interface:

code -
interface WeatherData {
  temperature: {
    value: number  // in Celsius
    unit: '°C'
  }
  precipitation: {
    value: number  // in percentage
    unit: '%'
  }
  windSpeed: {
    value: number  // in kilometers per hour
    unit: 'km/h'
  }
}

2. Geolocation Implementation
To get user location, implement these steps:

code -
// Get user coordinates
navigator.geolocation.getCurrentPosition(
  (position) => {
    const lat = position.coords.latitude
    const lon = position.coords.longitude
    // Use these coordinates for API calls
  },
  (error) => {
    console.error('Error getting location:', error)
  },
  {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
  }
)

3. API Integration
When implementing the weather API:

code -
async function getWeatherData(lat: number, lon: number) {
  const response = await fetch(
    `YOUR_WEATHER_API_ENDPOINT?lat=${lat}&lon=${lon}&units=metric`
  )
  const data = await response.json()
  
  return {
    temperature: {
      value: data.temp,  // ensure this matches API response
      unit: '°C'
    },
    precipitation: {
      value: data.precipitation,  // ensure this matches API response
      unit: '%'
    },
    windSpeed: {
      value: data.wind_speed,  // ensure this matches API response
      unit: 'km/h'
    }
  }
}

4. Required API Response Format
Your weather API should return data in this format:

code -
{
  "temp": 28,            // temperature in Celsius
  "precipitation": 30,    // precipitation chance in percentage
  "wind_speed": 15       // wind speed in km/h
  // Add any additional fields needed
}

5. Error Handling
Implement proper error handling:

code -
try {
  const weatherData = await getWeatherData(lat, lon)
  // Use the data
} catch (error) {
  // Handle specific error cases
  if (error.name === 'GeolocationPositionError') {
    // Handle location permission denied
  } else if (error.name === 'FetchError') {
    // Handle API fetch errors
  }
  // Fallback to default values if needed
  return defaultWeatherData
}

6. Default Values
When location or API fails, use these defaults:

code -
const defaultWeatherData = {
  temperature: { value: 25, unit: '°C' },
  precipitation: { value: 20, unit: '%' },
  windSpeed: { value: 12, unit: 'km/h' }
}

7. Update Frequency
- Weather data should be refreshed every 30 minutes
- Location should be updated every hour
- Cache responses to prevent excessive API calls

8. Security Considerations
- Never store raw location data
- Use HTTPS for API calls
- Implement rate limiting
- Validate API responses
- Use environment variables for API keys

9. Privacy Requirements
- Always ask for user consent before getting location
- Provide option to use approximate location
- Allow manual location input as fallback
- Clear location data when session ends

10. Performance Notes
- Implement loading states for data fetching
- Cache successful API responses
- Use error boundaries for fallbacks
- Consider implementing progressive enhancement 

11. Critical Updates Data Structure
The critical updates data should follow this interface:

code -
interface CriticalUpdate {
  id: string
  title: string
  status: string
  severity: 'default' | 'secondary' | 'destructive' | 'outline'
  icon: string
  lastUpdated: string
}

12. Critical Updates API Response Format
Your API should return data in this format:

code -
{
  "criticalUpdates": [
    {
      "id": "emergency-alerts",
      "title": "Emergency Alerts",
      "status": "2 Active",
      "severity": "destructive",
      "icon": "alert-triangle",
      "lastUpdated": "5 mins ago"
    },
    {
      "id": "hospital-capacity",
      "title": "Hospital Capacity",
      "status": "75% Full",
      "severity": "secondary",
      "icon": "hospital",
      "lastUpdated": "5 mins ago"
    },
    {
      "id": "power-grid",
      "title": "Power Grid",
      "status": "Stable",
      "severity": "default",
      "icon": "zap",
      "lastUpdated": "5 mins ago"
    },
    {
      "id": "network-status",
      "title": "Network Status",
      "status": "Online",
      "severity": "outline",
      "icon": "wifi",
      "lastUpdated": "5 mins ago"
    }
  ]
}

13. Update Frequency for Critical Updates
- Emergency Alerts: Real-time updates
- Hospital Capacity: Every 15 minutes
- Power Grid Status: Every 5 minutes
- Network Status: Every minute

14. Default Critical Updates
When API fails, use these defaults:

code -
const defaultCriticalUpdates = {
  emergencyAlerts: { status: "No Active Alerts", severity: "default" },
  hospitalCapacity: { status: "Unknown", severity: "outline" },
  powerGrid: { status: "Unknown", severity: "outline" },
  networkStatus: { status: "Unknown", severity: "outline" }
}