'use client'

import { useRoutePrefetch } from '@/hooks/use-route-prefetch'
import { Component, ErrorInfo, ReactNode } from 'react'

class ErrorBoundary extends Component<
  { children: ReactNode; fallback: ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: ReactNode; fallback: ReactNode }) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(_: Error) {
    return { hasError: true }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.warn('Route prefetching failed:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback
    }

    return this.props.children
  }
}

function PrefetcherContent() {
  useRoutePrefetch()
  return null
}

export function RoutePrefetcher() {
  return (
    <ErrorBoundary fallback={null}>
      <PrefetcherContent />
    </ErrorBoundary>
  )
} 