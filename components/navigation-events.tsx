'use client'

import { useEffect } from 'react'
import { usePathname, useSearchParams, useRouter } from 'next/navigation'
import { useLoading } from '@/contexts/loading-context'
import { routes } from '@/hooks/use-route-prefetch'

export function NavigationEvents() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const router = useRouter()
  const { setIsLoading } = useLoading()

  useEffect(() => {
    const handleStart = () => {
      setIsLoading(true)
    }

    const handleStop = () => {
      setIsLoading(false)
    }

    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const link = target.closest('a')
      const button = target.closest('button')
      
      if (link?.href || button) {
        handleStart()
        if (link?.pathname && routes.includes(link.pathname)) {
          router.prefetch(link.pathname)
        }
        setTimeout(handleStop, 500)
      }
    }

    document.addEventListener('click', handleClick)

    return () => {
      document.removeEventListener('click', handleClick)
    }
  }, [setIsLoading, pathname, router])

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 300)
    return () => clearTimeout(timer)
  }, [pathname, searchParams, setIsLoading])

  return null
} 