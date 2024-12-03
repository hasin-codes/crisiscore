import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster"
import Script from 'next/script'
import { SidebarDemo } from "@/components/sidebar";
import { MainContent } from "@/components/ui/main-content";
import { ClerkProvider } from '@clerk/nextjs'
import { LocationProvider } from '@/contexts/location-context'

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
  display: 'swap',
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
  display: 'swap',
});

export const metadata: Metadata = {
  title: "CrisisCore",
  description: "Emergency Management System",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <LocationProvider>
        <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
          <body className="bg-zinc-950">
            <div className="flex min-h-screen">
              <SidebarDemo />
              <MainContent>
                {children}
              </MainContent>
            </div>
            <Toaster />
          </body>
        </html>
      </LocationProvider>
    </ClerkProvider>
  )
}
