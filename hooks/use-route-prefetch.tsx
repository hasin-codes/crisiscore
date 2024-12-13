'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

const routes = [
  '/',
  '/emergency',
  '/planner',
  '/alerts'
]

export function useRoutePrefetch() {
  const router = useRouter()

  useEffect(() => {
    // Prefetch all routes with a small delay to not impact initial page load
    const timer = setTimeout(() => {
      routes.forEach(route => {
        // Add try-catch to handle potential prefetch errors
        try {
          router.prefetch(route)
        } catch (error) {
          console.warn(`Failed to prefetch route: ${route}`, error)
        }
      })
    }, 1000)

    return () => clearTimeout(timer)
  }, [router])
} 