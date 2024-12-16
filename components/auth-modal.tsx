'use client'

import { useSignIn, useSignUp } from "@clerk/nextjs"
import Image from "next/image"
import { useState } from "react"
import Link from "next/link"
import { Spotlight } from "@/components/ui/spotlight"
import { FcGoogle } from 'react-icons/fc'
import { FaFacebook, FaApple } from 'react-icons/fa'
import { toast } from "@/components/ui/use-toast"
import { handleError } from "@/lib/error-handling"
import { logger } from "@/lib/logger"

interface AuthModalProps {
  isOpen: boolean
  onClose: () => void
  mode: 'sign-in' | 'sign-up'
}

const BottomGradient = () => (
  <>
    <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-[#E6FF00] to-transparent" />
    <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-[#E6FF00] to-transparent" />
  </>
)

const providers = ['google', 'facebook', 'apple'] as const
type Provider = (typeof providers)[number]
type OAuthStrategy = `oauth_${Provider}`

export function AuthModal({ isOpen, onClose, mode }: AuthModalProps) {
  const [loading, setLoading] = useState(false)
  const { signIn } = useSignIn()
  const { signUp } = useSignUp()

  const handleOAuth = async (provider: OAuthStrategy) => {
    if (loading) return
    
    try {
      setLoading(true)
      const auth = mode === 'sign-in' ? signIn : signUp
      
      if (!auth) {
        throw new Error('Authentication not initialized')
      }

      await auth.authenticateWithRedirect({
        strategy: provider,
        redirectUrl: "/sso-callback",
        redirectUrlComplete: "/"
      })
    } catch (err) {
      logger.error(`OAuth ${mode} error:`, err)
      const error = handleError(err)
      toast({
        title: "Authentication Error",
        description: error.message || `Failed to ${mode}. Please try again later.`,
        variant: "destructive"
      })
    } finally {
      setLoading(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="relative max-w-md w-full">
        <div className="relative z-10 rounded-2xl p-4 md:p-8 shadow-[0_0_1px_1px_rgba(0,0,0,0.3)] bg-black overflow-hidden">
          <Spotlight 
            className="absolute -top-40 -left-40" 
            fill="white" 
          />
          
          <div className="relative z-20">
            <div className="flex items-center justify-center mb-8">
              <Image 
                src="/logo.png" 
                alt="Logo" 
                width={48} 
                height={48}
                priority
              />
            </div>

            <h2 className="font-bold text-xl text-neutral-200 text-center">
              {mode === 'sign-in' ? 'Welcome back' : 'Create your account'}
            </h2>
            <p className="text-neutral-300 text-sm max-w-sm mt-2 text-center mx-auto">
              {mode === 'sign-in' 
                ? 'Sign in to your account to continue'
                : 'Join CrisisCore to get started'
              }
            </p>

            <div className="my-8 space-y-4">
              {providers.map((provider) => (
                <button
                  key={provider}
                  type="button"
                  disabled={loading}
                  className="relative group/btn flex space-x-2 items-center justify-start px-4 w-full text-white rounded-md h-10 font-medium bg-zinc-900 shadow-[0px_0px_1px_1px_var(--neutral-800)] disabled:opacity-50 disabled:cursor-not-allowed"
                  onClick={() => handleOAuth(`oauth_${provider}` as OAuthStrategy)}
                >
                  {provider === 'google' && <FcGoogle className="h-5 w-5" />}
                  {provider === 'facebook' && <FaFacebook className="h-5 w-5 text-[#1877F2]" />}
                  {provider === 'apple' && <FaApple className="h-5 w-5 text-white" />}
                  <span className="text-neutral-300 text-sm">
                    Continue with {provider.charAt(0).toUpperCase() + provider.slice(1)}
                  </span>
                  <BottomGradient />
                </button>
              ))}
            </div>

            <div className="bg-gradient-to-r from-transparent via-neutral-700 to-transparent my-8 h-[1px] w-full" />

            <div className="text-center space-y-4">
              <p className="text-neutral-300 text-sm">
                By clicking continue, you agree to our{' '}
                <Link href="/terms" className="text-[#E6FF00] hover:underline">
                  Terms of Service
                </Link>{' '}
                and{' '}
                <Link href="/privacy" className="text-[#E6FF00] hover:underline">
                  Privacy Policy
                </Link>
              </p>

              <p className="text-neutral-300 text-sm">
                {mode === 'sign-in' ? (
                  <>
                    Don't have an account?{' '}
                    <button 
                      onClick={() => onClose()}
                      className="text-[#E6FF00] hover:underline font-medium"
                    >
                      Sign up
                    </button>
                  </>
                ) : (
                  <>
                    Already have an account?{' '}
                    <button
                      onClick={() => onClose()}
                      className="text-[#E6FF00] hover:underline font-medium"
                    >
                      Sign in
                    </button>
                  </>
                )}
              </p>
            </div>
          </div>
        </div>

        {loading && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/20 backdrop-blur-sm rounded-2xl">
            <div className="w-8 h-8 border-2 border-[#E6FF00] border-solid rounded-full animate-spin border-t-transparent" />
          </div>
        )}
      </div>
    </div>
  )
} 