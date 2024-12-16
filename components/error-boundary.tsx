'use client'

import { useEffect } from 'react'
import { ErrorBoundary as ReactErrorBoundary } from 'react-error-boundary'
import { logger } from '@/lib/logger'
import { Button } from '@/components/ui/button'

function ErrorFallback({ error, resetErrorBoundary }: { 
  error: Error
  resetErrorBoundary: () => void 
}) {
  useEffect(() => {
    logger.error('UI Error:', error)
  }, [error])

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-950 p-4">
      <div className="text-center space-y-4">
        <h2 className="text-xl font-bold text-white">Something went wrong</h2>
        <p className="text-neutral-400">We're sorry for the inconvenience</p>
        <Button 
          onClick={resetErrorBoundary}
          className="bg-[#E6FF00] text-black hover:bg-[#E6FF00]/90"
        >
          Try again
        </Button>
      </div>
    </div>
  )
}

export default function AppErrorBoundary({ 
  children 
}: { 
  children: React.ReactNode 
}) {
  return (
    <ReactErrorBoundary
      FallbackComponent={ErrorFallback}
      onError={(error) => logger.error('Caught error:', error)}
      onReset={() => {
        // Reset app state here if needed
      }}
    >
      {children}
    </ReactErrorBoundary>
  )
} 