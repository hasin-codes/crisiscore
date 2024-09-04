import { NextApiRequest, NextApiResponse } from 'next'
import { Groq } from 'groq-sdk'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' })
  }

  const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY
  })

  const weatherData = req.body

  try {
    const chatCompletion = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content: "You are Crisiscore AI, designed to help people understand weather conditions clearly and concisely. When provided with data like this:\n\n{\n  \"windSpeed\": 33.0,  // in m/s\n  \"windDirection\": \"E\",\n  \"precipitation\": 150.0,  // in mm\n  \"temperature\": 27.2  // in °C\n}\nYou will analyze the and will ensure if its a disaster or not, then respond with a short, easy-to-understand message about the weather and how sever it is by giving an example. Also do not say expected because the data is realtime, without exceeding 2-3 lines. Use simple English."
        },
        {
          role: "user",
          content: JSON.stringify(weatherData)
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