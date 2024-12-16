'use client'

import { useEffect } from "react"
import { useClerk } from "@clerk/nextjs"
import { useRouter } from "next/navigation"

export default function SSOCallback() {
  const { handleRedirectCallback } = useClerk()
  const router = useRouter()

  useEffect(() => {
    async function handleCallback() {
      try {
        await handleRedirectCallback({
          redirectUrl: "/",
          secondFactorUrl: "/",
        })
        router.push('/')
      } catch (err) {
        console.error("OAuth callback error:", err)
        router.push('/sign-in')
      }
    }

    handleCallback()
  }, [handleRedirectCallback, router])

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-950">
      <div className="w-16 h-16 border-4 border-[#E6FF00] border-solid rounded-full animate-spin border-t-transparent" />
    </div>
  )
} 