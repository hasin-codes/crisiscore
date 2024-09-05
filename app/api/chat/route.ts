import { kv } from '@vercel/kv';
import { getSession } from '@/lib/auth'; // Ensure this path is correct
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const session = await getSession();
  const userId = session?.user?.id;
  if (!userId) {
    return new Response('Unauthorized', { status: 401 });
  }

  const lastRequestTime = await kv.get(`lastRequest:${userId}`);
  const currentTime = Date.now();

  if (lastRequestTime && typeof lastRequestTime === 'number') {
    const timeSinceLastRequest = currentTime - lastRequestTime;
    if (timeSinceLastRequest < 600000) {
      const remainingTime = Math.ceil((600000 - timeSinceLastRequest) / 1000);
      return new Response(`Please wait ${remainingTime} seconds before making another request.`, { status: 429 });
    }
  }

  await kv.set(`lastRequest:${userId}`, currentTime);

  // Parse the request body
  const { lat, lon } = await req.json();

  // Here you would typically make a call to your weather API
  // For this example, we'll just return a mock response
  const mockWeatherWarning = `Weather warning for coordinates (${lat}, ${lon}): No severe weather conditions expected in the next 24 hours.`;

  // Return the response
  return NextResponse.json({ message: mockWeatherWarning });
}