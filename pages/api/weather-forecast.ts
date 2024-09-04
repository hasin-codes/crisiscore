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

    const chatCompletion = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content: "You are Crisiscore AI, designed to help people understand weather conditions clearly and concisely. Analyze the weather data and determine if it indicates a potential disaster. Respond with a short, easy-to-understand message about the weather and its severity, giving an example if appropriate. Use simple English and keep the response to 2-3 lines."
        },
        {
          role: "user",
          content: JSON.stringify(windyResponse.data)
        }
      ],
      model: "llama3-groq-70b-8192-tool-use-preview",
      temperature: 0.5,
      max_tokens: 1024,
      top_p: 0.65,
      stream: false,
      stop: null
    })

    res.status(200).json({ message: chatCompletion.choices[0]?.message?.content || '' })
  } catch (error) {
    console.error('Error processing weather data:', error)
    res.status(500).json({ message: 'Error processing weather data' })
  }
}