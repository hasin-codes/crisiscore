import { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios'
import { Groq } from 'groq-sdk'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' })
  }

  const { lat, lon } = req.body

  try {
    // Call Windy API
    const windyResponse = await axios.post('https://api.windy.com/api/point-forecast/v2', {
      lat: lat,
      lon: lon,
      model: 'gfs',
      parameters: ['wind', 'temp', 'precip'],
      key: process.env.NEXT_PUBLIC_WINDY_API_KEY
    })

    // Process with Groq
    const groq = new Groq({
      apiKey: process.env.NEXT_PUBLIC_GROQ_API_KEY
    })

    const aiInput = JSON.stringify(windyResponse.data);
    console.log('Data sent to AI:', aiInput);

    const chatCompletion = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content: "You are CrisisCore AI, a specialized weather analysis AI designed to evaluate and forecast weather conditions for the upcoming 1-2 hours based on JSON data received from the Windy API. The data includes: 'ts' (Unix timestamps in milliseconds), 'wind_u-surface' and 'wind_v-surface' (wind components in m/s), 'temp-surface' (temperatures in Kelvin), 'past3hprecip-surface' (precipitation in meters/3 hours), and 'units'. Convert timestamps to readable dates, wind speeds to knots (√(u² + v²) * 1.94384), temperatures to Celsius (°C = K - 273.15), and precipitation to cm. Identify potential hazards like strong winds, extreme temperatures, heavy rainfall, rapid changes, dry spells, thunderstorms, and freezing conditions. Provide a concise 2-3 sentence summary of the weather outlook, including key metrics, identified hazards, and necessary warnings. Focus solely on the provided data, avoiding speculation. Your response should be clear, accurate, and easily understood by the public, highlighting potential risks requiring precautions. Ignore any 'warning' field in the data."
        },
        {
          role: "user",
          content: aiInput
        }
      ],
      model: "llama3-groq-70b-8192-tool-use-preview",
      temperature: 0.2,
      max_tokens: 1024,
      top_p: 0.65,
      stream: false,
      stop: null
    })

    const aiResponse = chatCompletion.choices[0]?.message?.content || ''

    res.status(200).json({ message: aiResponse })
  } catch (error) {
    console.error('Error processing weather data:', error)
    res.status(500).json({ message: 'Error processing weather data' })
  }
}