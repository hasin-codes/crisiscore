import * as Sentry from "@sentry/nextjs"

const isProd = process.env.NODE_ENV === 'production'

export function initErrorTracking() {
  if (isProd) {
    Sentry.init({
      dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
      tracesSampleRate: 1.0,
      environment: process.env.NODE_ENV,
    })
  }
}

export function trackError(error: unknown, context?: Record<string, any>) {
  if (isProd) {
    Sentry.captureException(error, { extra: context })
  } else {
    console.error('Error:', error, 'Context:', context)
  }
} 