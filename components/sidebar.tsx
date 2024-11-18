'use client'

import React from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { Home, Bell, Map, MessageCircle, Settings, User, FileText, AlertTriangle } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  path?: string;
  isActive?: boolean;
  onClick?: () => void;
}

const NavItem = ({ icon, label, path, isActive, onClick }: NavItemProps) => (
  <Button 
    variant="ghost" 
    className={cn(
      "w-full justify-start px-4 py-2 text-zinc-400 hover:text-white hover:bg-zinc-800",
      "transition-colors duration-200",
      isActive && "bg-zinc-800 text-white"
    )}
    onClick={onClick}
  >
    {icon}
    <span className="ml-2">{label}</span>
  </Button>
)

export function Sidebar() {
  const router = useRouter()
  const pathname = usePathname()

  const navigation = [
    { icon: <Home className="h-5 w-5" />, label: 'Home', path: '/' },
    { icon: <Bell className="h-5 w-5" />, label: 'Alerts', path: '/alerts' },
    { icon: <FileText className="h-5 w-5" />, label: 'Planner', path: '/planner' },
    { icon: <AlertTriangle className="h-5 w-5" />, label: 'Emergency', path: '/emergency' },
    { icon: <MessageCircle className="h-5 w-5" />, label: 'Community' },
    { icon: <Settings className="h-5 w-5" />, label: 'Settings' }
  ]

  return (
    <aside className="w-64 h-full bg-zinc-900 text-white">
      <div className="flex flex-col h-full">
        <div className="p-4 border-b border-zinc-800">
          <h1 className="text-xl font-bold">CrisisCore</h1>
        </div>
        <nav className="flex-1 py-2">
          {navigation.map((item) => (
            <NavItem
              key={item.label}
              icon={item.icon}
              label={item.label}
              isActive={item.path ? pathname === item.path : false}
              onClick={() => item.path && router.push(item.path)}
            />
          ))}
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
      </div>
    </aside>
  )
}