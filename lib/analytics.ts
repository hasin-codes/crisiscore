export function trackEvent(name: string, properties?: Record<string, any>) {
  if (typeof window !== 'undefined' && process.env.NODE_ENV === 'production') {
    // Implement your analytics tracking here
    // Example: Mixpanel, Google Analytics, etc.
  }
} 