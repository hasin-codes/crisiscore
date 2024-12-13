'use client'

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

export function MainContent({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <motion.main 
      className={cn("flex-1 p-6 overflow-x-hidden", className)}
      layout
      transition={{
        duration: 0.2,
        ease: "easeInOut"
      }}
    >
      {children}
    </motion.main>
  )
} 