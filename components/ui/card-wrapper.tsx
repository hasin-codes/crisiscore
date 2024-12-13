'use client'

import { Card } from '@/components/ui/card'
import { cn } from '@/lib/utils'

interface CardWrapperProps {
  children: React.ReactNode
  className?: string
  spotlight?: boolean
  noPadding?: boolean
  variant?: 'default' | 'transparent' | 'nested'
}

export function CardWrapper({ 
  children, 
  className, 
  spotlight = false,
  noPadding = false,
  variant = 'default'
}: CardWrapperProps) {
  return (
    <div className={cn(
      "w-full mx-2 sm:mx-4",
      !noPadding && "mb-4"
    )}>
      <Card 
        className={cn(
          "relative h-full w-full",
          variant === 'default' && "bg-zinc-900 border-zinc-800",
          variant === 'transparent' && "bg-black/40 border-zinc-800/50",
          variant === 'nested' && "bg-zinc-800 border-zinc-700",
          spotlight && "overflow-hidden",
          "text-white",
          className
        )}
      >
        {children}
      </Card>
    </div>
  )
} 