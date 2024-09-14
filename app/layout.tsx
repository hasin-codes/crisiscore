import { ClerkProvider } from '@clerk/nextjs'
import './globals.css'
import GridBackground from './components/GridBackground'
import { SpeedInsights } from '@vercel/speed-insights/next'
import Navbar from '@/components/Navbar'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <ClerkProvider>
        <body>
          <GridBackground />
          <Navbar />
          <main className="pt-20 px-4 max-w-screen-lg mx-auto">{children}</main>
          <SpeedInsights />
        </body>
      </ClerkProvider>
    </html>
  )
}