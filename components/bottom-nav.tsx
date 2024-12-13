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
  const { scrollY } = useScroll()
  const [isScrollingUp, setIsScrollingUp] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)
  
  const activeTab = navItems.findIndex(item => item.href === pathname)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      setIsScrollingUp(currentScrollY < lastScrollY)
      setLastScrollY(currentScrollY)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [lastScrollY])

  const bottomValue = useTransform(
    scrollY,
    [0, 100],
    [isScrollingUp ? '2vh' : '-100%', isScrollingUp ? '2vh' : '-100%']
  )

  return (
    <motion.div 
      className="fixed left-[2vw] right-[2vw] pb-safe block md:hidden z-50"
      style={{ bottom: bottomValue }}
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      <div className="px-[2vw] py-[1vh]">
        <nav className="mx-auto max-w-[90vw]">
          <div className="flex items-center justify-around rounded-[28px] bg-black/40 backdrop-blur-sm py-2 px-3 border border-zinc-800">
            {navItems.map((item, index) => {
              const isActive = activeTab === index
              return (
                <motion.button
                  key={index}
                  onClick={() => {
                    router.push(item.href)
                  }}
                  className="relative flex items-center justify-center max-w-[120px]"
                  whileTap={{ scale: 0.95 }}
                >
                  {isActive && (
                    <motion.div
                      layoutId="bubble"
                      className="absolute inset-0 -z-10 rounded-full bg-[#E6FF00]"
                      initial={false}
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  <span className="flex items-center gap-1 px-3 py-2">
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

