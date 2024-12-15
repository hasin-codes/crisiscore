'use client'

import { useEffect } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import { useLoading } from '@/contexts/loading-context'

export function NavigationEvents() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const { setIsLoading } = useLoading()

  useEffect(() => {
    const handleStart = () => {
      setIsLoading(true)
    }

    const handleStop = () => {
      setIsLoading(false)
    }

    // Navigation observers
    const navigationObserver = new PerformanceObserver((list) => {
      list.getEntries().forEach((entry) => {
        if (entry.entryType === 'navigation') {
          handleStart()
        }
      })
    })

    navigationObserver.observe({ entryTypes: ['navigation'] })

    // Click handler for navigation
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (target.tagName === 'A' || target.closest('a') || target.closest('button')) {
        handleStart()
        setTimeout(handleStop, 500) // Fallback timer
      }
    }

    document.addEventListener('click', handleClick)

    return () => {
      navigationObserver.disconnect()
      document.removeEventListener('click', handleClick)
    }
  }, [setIsLoading])

  // Handle route changes
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 300)
    return () => clearTimeout(timer)
  }, [pathname, searchParams, setIsLoading])

  return null
} 