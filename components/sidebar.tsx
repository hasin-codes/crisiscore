'use client'

import React from 'react'
import { Home, Bell, Map, MessageCircle, Settings, User } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { usePathname, useRouter } from 'next/navigation'

const NavItem = ({ icon, label, path }: { icon: React.ReactNode; label: string; path?: string }) => {
  const router = useRouter()
  const pathname = usePathname()
  const isActive = path ? pathname === path : false

  return (
    <Button 
      variant="ghost" 
      className={cn(
        "w-full justify-start px-4 py-2 text-zinc-400 hover:text-white hover:bg-zinc-800",
        "transition-colors duration-200",
        isActive && "bg-zinc-800 text-white"
      )}
      onClick={() => path && router.push(path)}
    >
      {icon}
      <span className="ml-2">{label}</span>
    </Button>
  )
}

export function Sidebar() {
  return (
    <aside className="fixed top-0 left-0 w-64 h-screen flex flex-col bg-zinc-900 text-white border-r border-zinc-800">
      <div className="p-4 border-b border-zinc-800">
        <h1 className="text-xl font-bold">CrisisCore</h1>
      </div>
      <nav className="flex-1 py-2">
        <NavItem 
          icon={<Home className="h-5 w-5" />} 
          label="Home" 
          path="/"
        />
        <NavItem 
          icon={<Bell className="h-5 w-5" />} 
          label="Alerts" 
          path="/alerts"
        />
        <NavItem 
          icon={<Map className="h-5 w-5" />} 
          label="Planner" 
          path="/planner"
        />
        <NavItem 
          icon={<MessageCircle className="h-5 w-5" />} 
          label="Emergency" 
          path="/emergency"
        />
        <NavItem 
          icon={<Settings className="h-5 w-5" />} 
          label="Settings" 
        />
      </nav>
      <div className="p-4 border-t border-zinc-800">
        <Button 
          variant="ghost" 
          className="w-full justify-start px-4 py-2 text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors duration-200"
        >
          <Avatar className="h-8 w-8">
            <AvatarImage src="/placeholder-avatar.jpg" alt="User" />
            <AvatarFallback><User className="h-5 w-5" /></AvatarFallback>
          </Avatar>
          <span className="ml-2">User Profile</span>
        </Button>
      </div>
    </aside>
  )
}