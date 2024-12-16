"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { LayoutDashboard, Siren, CalendarDays, Bell } from 'lucide-react'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

interface NavItem {
  icon: typeof LayoutDashboard
  label: string
  href: string
}

const navItems: NavItem[] = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/" },
  { icon: Siren, label: "Emergency", href: "/emergency" },
  { icon: CalendarDays, label: "Planner", href: "/planner" },
  { icon: Bell, label: "Alerts", href: "/alerts" },
]

export default function BottomNav() {
  const router = useRouter()
  const pathname = usePathname()
  const [isVisible, setIsVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)
  
  const activeTab = navItems.findIndex(item => item.href === pathname)

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
    <motion.div 
      className="fixed left-[2vw] right-[2vw] bottom-[1vh] pb-1 block md:hidden z-50"
      animate={{ 
        y: isVisible ? 0 : 100 
      }}
      transition={{
        duration: 0.3,
        ease: "easeInOut"
      }}
    >
      <div className="px-[2vw] py-[0.5vh]">
        <nav className="mx-auto max-w-[90vw]">
          <div className="flex items-center justify-around rounded-[28px] bg-black/40 backdrop-blur-sm py-2 px-3 border border-zinc-800 overflow-hidden">
            {navItems.map((item, index) => {
              const isActive = activeTab === index
              return (
                <motion.button
                  key={index}
                  onClick={() => router.push(item.href)}
                  className="relative flex items-center justify-center max-w-[120px]"
                >
                  {isActive && (
                    <motion.div
                      layoutId="bubble"
                      className="absolute rounded-full bg-[#E6FF00]"
                      style={{
                        top: '2px',
                        bottom: '2px',
                        left: '2px',
                        right: '2px'
                      }}
                      transition={{
                        type: "tween",
                        duration: 0.3,
                        ease: "easeInOut"
                      }}
                    />
                  )}
                  <span className="relative z-10 flex items-center gap-1 px-3 py-2">
                    <span className={`flex items-center justify-center rounded-full transition-colors ${
                      isActive ? "bg-transparent" : "bg-zinc-800"
                    } p-2`}>
                      <item.icon
                        className={`transition-all ${
                          isActive ? "size-5" : "size-6"
                        } ${
                          isActive ? "text-zinc-900" : "text-zinc-400"
                        }`}
                      />
                    </span>
                    <motion.span
                      initial={false}
                      animate={{ width: isActive ? "auto" : 0, opacity: isActive ? 1 : 0 }}
                      transition={{ duration: 0.2 }}
                      className={`text-sm font-medium overflow-hidden whitespace-nowrap ${
                        isActive ? "text-zinc-900" : "text-zinc-200"
                      }`}
                    >
                      {item.label}
                    </motion.span>
                  </span>
                </motion.button>
              )
            })}
          </div>
        </nav>
      </div>
    </motion.div>
  )
}

