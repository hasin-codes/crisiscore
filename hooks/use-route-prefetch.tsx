'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export const routes = [
  '/',
  '/emergency',
  '/planner',
  '/alerts',
  '/settings',
  '/notifications'
]

export function useRoutePrefetch() {
  const router = useRouter()

  useEffect(() => {
    routes.forEach(route => {
      try {
        router.prefetch(route)
      } catch (error) {
        console.warn(`Failed to prefetch route: ${route}`, error)
      }
    })

    const handleRouteChange = () => {
      routes.forEach(route => {
        try {
          router.prefetch(route)
        } catch (error) {
          console.warn(`Failed to prefetch route: ${route}`, error)
        }
      })
    }

    window.addEventListener('routeChangeComplete', handleRouteChange)
    return () => window.removeEventListener('routeChangeComplete', handleRouteChange)
  }, [router])
} 