'use client'

import React from 'react'

export function ClientProvider({
  children
}: {
  children: React.ReactNode
}) {
  const [isMounted, setIsMounted] = React.useState(false)

  React.useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return null
  }

  return <>{children}</>
} 