'use client'

interface ContainerProps {
  children: React.ReactNode
}

export function Container({ children }: ContainerProps) {
  return (
    <div className="min-w-[320px]">
      <div className="container mx-auto px-0 sm:px-2 md:px-6 lg:px-8 py-2 sm:py-4 md:py-6 lg:py-8 max-w-[1920px]">
        {children}
      </div>
    </div>
  )
} 