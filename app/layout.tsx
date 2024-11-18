import { Sidebar } from '@/components/sidebar'
import { Toaster } from "@/components/ui/toaster"
import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'CrisisCore',
  description: 'Emergency Management System',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <div className="flex min-h-screen">
          <div className="hidden md:block fixed h-screen z-30">
            <Sidebar />
          </div>
          <main className="flex-1 w-full md:pl-64">
            {children}
          </main>
        </div>
        <Toaster />
      </body>
    </html>
  )
}
