import { NextApiRequest, NextApiResponse } from 'next'
import axios, { AxiosError } from 'axios'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { lat, lon } = req.query

  console.log('Received request with lat:', lat, 'lon:', lon)

  try {
    const response = await axios.post('https://api.windy.com/api/point-forecast/v2', {
      lat: parseFloat(lat as string),
      lon: parseFloat(lon as string),
      model: 'gfs',
      parameters: ['wind', 'temp', 'precip'],
      key: process.env.NEXT_PUBLIC_WINDY_API_KEY
    })

    console.log('Windy API response:', response.data)
    res.status(200).json(response.data)
  } catch (error) {
    console.error('Error fetching weather data:', error)
    if (axios.isAxiosError(error)) {
      console.error('Axios error details:', error.response?.data)
      console.error('Axios error status:', error.response?.status)
      console.error('Axios error headers:', error.response?.headers)
      res.status(500).json({ message: 'Error fetching weather data', error: error.message })
    } else {
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred'
      res.status(500).json({ message: 'Error fetching weather data', error: errorMessage })
    }
  }
}