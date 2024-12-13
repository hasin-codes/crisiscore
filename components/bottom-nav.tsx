"use client"

import { motion } from "framer-motion"
import { LayoutDashboard, Siren, CalendarDays, Bell } from 'lucide-react'
import { usePathname, useRouter } from 'next/navigation'

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
  const activeTab = navItems.findIndex(item => item.href === pathname)

  return (
    <motion.div 
      className="fixed bottom-4 left-0 right-0 pb-safe block md:hidden z-50"
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      <nav className="mx-auto max-w-md px-4">
        <div className="flex items-center justify-around rounded-[28px] bg-black/40 backdrop-blur-sm py-2 px-3 border border-zinc-800">
          {navItems.map((item, index) => {
            const isActive = activeTab === index
            return (
              <motion.button
                key={index}
                onClick={() => {
                  router.push(item.href)
                }}
                className="relative flex items-center justify-center"
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
                <span className="flex items-center gap-2 px-3 py-2">
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
    </motion.div>
  )
}

