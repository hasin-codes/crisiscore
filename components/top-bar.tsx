"use client"

import { Bell, ChevronRight, Settings } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs"
import { useRouter, usePathname } from "next/navigation"
import { useUser } from "@clerk/nextjs"
import { useEffect, useState } from "react"
import { useLoading } from "@/contexts/loading-context"

export function TopBar() {
  const router = useRouter()
  const pathname = usePathname()
  const { user } = useUser()
  const { isLoading } = useLoading()
  const [isVisible, setIsVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      setIsVisible(currentScrollY < lastScrollY || currentScrollY < 10)
      setLastScrollY(currentScrollY)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [lastScrollY])

  return (
    <>
      <div 
        className={`fixed top-0 left-0 right-0 h-[calc(2vh+56px)] bg-black/90 backdrop-blur-sm z-40 transition-transform duration-300 ease-in-out ${
          isVisible ? 'translate-y-0' : '-translate-y-full'
        }`}
      />
      
      <div 
        className={`fixed top-0 left-0 right-0 z-50 transition-transform duration-300 ease-in-out ${
          isVisible ? 'translate-y-0' : '-translate-y-full'
        }`}
      >
        <div className="px-4 py-[1vh] bg-transparent">
          <nav className="w-full">
            <div className="flex items-center justify-between py-2 px-3">
              <div className="flex items-center gap-4">
                <SignedIn>
                  <Button 
                    variant="ghost" 
                    className="flex items-center rounded-full py-1.5 pl-1.5 pr-4 hover:bg-zinc-700/50 transition-colors w-fit mr-2 bg-zinc-800/50"
                  >
                    <UserButton 
                      afterSignOutUrl="/"
                      appearance={{
                        elements: {
                          avatarBox: "h-7 w-7"
                        }
                      }}
                    />
                    <span className="text-white text-sm font-medium ml-3 select-none">
                      {user?.fullName || 'User'}
                    </span>
                    <ChevronRight className="h-4 w-4 text-gray-400 ml-3" />
                  </Button>
                </SignedIn>
                
                <SignedOut>
                  <SignInButton mode="modal">
                    <Button 
                      variant="ghost" 
                      className="flex items-center rounded-full py-1.5 pl-1.5 pr-4 hover:bg-zinc-700/50 transition-colors w-fit mr-2 bg-zinc-800/50"
                    >
                      <div className="relative">
                        <Avatar className="h-7 w-7">
                          <AvatarImage 
                            src="/placeholder.svg?height=28&width=28"
                            alt="Sign in" 
                          />
                          <AvatarFallback>SI</AvatarFallback>
                        </Avatar>
                      </div>
                      <span className="text-white text-sm font-medium ml-3 select-none">
                        Sign in
                      </span>
                      <ChevronRight className="h-4 w-4 text-gray-400 ml-auto" />
                    </Button>
                  </SignInButton>
                </SignedOut>
              </div>
              
              <div className="flex items-center gap-2">
                <SignedIn>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="rounded-full hover:bg-zinc-700/50 h-9 w-9 bg-zinc-800/50"
                    onClick={() => router.push('/notifications')}
                  >
                    <Bell className="h-4 w-4 text-gray-400" />
                    <span className="sr-only">Notifications</span>
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="rounded-full hover:bg-zinc-700/50 h-9 w-9 bg-zinc-800/50"
                    onClick={() => router.push('/settings')}
                  >
                    <Settings className="h-4 w-4 text-gray-400" />
                    <span className="sr-only">Settings</span>
                  </Button>
                </SignedIn>
              </div>
            </div>
          </nav>
        </div>
        <div className="relative w-full h-[2px]">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-zinc-800 to-transparent" />
          {isLoading && (
            <div
              className="absolute inset-0 bg-[#E6FF00] origin-left animate-loading-bar"
            />
          )}
        </div>
      </div>
    </>
  )
} 