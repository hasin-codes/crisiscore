import { z } from 'zod'

const envSchema = z.object({
  NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: z.string(),
  CLERK_SECRET_KEY: z.string(),
  NODE_ENV: z.enum(['development', 'production', 'test']),
  // Add other env vars here
})

export const env = envSchema.parse(process.env) 