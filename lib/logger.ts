const isProd = process.env.NODE_ENV === 'production'

export const logger = {
  info: (message: string, ...args: any[]) => {
    if (isProd) {
      // Use a proper logging service in production
      // Example: winston, pino, etc.
    } else {
      console.log(message, ...args)
    }
  },
  error: (message: string, error?: unknown) => {
    if (isProd) {
      // Log to error tracking service
      // Example: Sentry, LogRocket, etc.
    } else {
      console.error(message, error)
    }
  }
} 