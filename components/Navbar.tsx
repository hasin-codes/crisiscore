'use client'

import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Home, AlertTriangle, FileText, Siren, Truck } from 'lucide-react'
import Link from 'next/link'
import { UserButton, useUser } from "@clerk/nextjs"
import { useRouter } from 'next/navigation'
import { usePathname } from 'next/navigation'

const pages = [
  { name: 'Home', icon: Home, href: '/' },
  { name: 'Alerts', icon: AlertTriangle, href: '/alerts' },
  { name: 'Planner', icon: FileText, href: '/planner' },
  { name: 'Emergency', icon: Siren, href: '/emergency' },
  { name: 'Relief', icon: Truck, href: '/relief' },
]

export default function Navbar() {
  const pathname = usePathname()
  const [activePage, setActivePage] = useState(() => {
    const currentPage = pages.find(page => page.href === pathname)
    return currentPage ? currentPage.name : 'Home'
  })
  const { isSignedIn } = useUser()
  const router = useRouter()

  const handlePageClick = (pageName: string, href: string) => {
    setActivePage(pageName)
    router.push(href)
  }

  return (
    <nav className="bg-transparent text-white p-4 flex items-center justify-between relative">
      <div className="w-1/4">
        <Link href="/" className="text-2xl font-bold">
          <span className="hidden sm:inline">CrisisCore</span>
        </Link>
      </div>
      
      <div className="flex justify-center w-1/2">
        <div className="flex border-[#343434] shadow-[0_0_10px_rgba(255,255,255,0.1)] bg-white bg-opacity-10 backdrop-blur-[2px] rounded-lg p-1">
          {pages.map((page) => (
            <Button
              key={page.name}
              variant="ghost"
              className={`flex items-center justify-center space-x-2 px-3 py-2 rounded-md mx-1 ${
                activePage === page.name
                  ? 'bg-white text-black'
                  : 'text-white hover:bg-white hover:text-black'
              }`}
              onClick={() => handlePageClick(page.name, page.href)}
            >
              <page.icon className="w-5 h-5 lg:hidden" />
              <span className="hidden lg:inline">{page.name}</span>
            </Button>
          ))}
        </div>
      </div>
      
      <div className="w-1/4 flex justify-end">
        {isSignedIn ? (
          <UserButton afterSignOutUrl="/" />
        ) : (
          <Button 
            variant="outline" 
            className="text-white bg-transparent hover:bg-white hover:text-black border-[#343434] shadow-[0_0_10px_rgba(255,255,255,0.1)]"
          >
            Sign In
          </Button>
        )}
      </div>
    </nav>
  )
}