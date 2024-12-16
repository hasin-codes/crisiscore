import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster"
import { SidebarDemo } from "@/components/sidebar";
import { MainContent } from "@/components/ui/main-content";
import { ClerkProvider } from '@clerk/nextjs'
import { LocationProvider } from '@/contexts/location-context'
import BottomNav from "@/components/bottom-nav";
import ClientWrapper from "@/components/ui/client-wrapper"
import { RoutePrefetcher } from '@/components/route-prefetcher'
import ErrorBoundary from "@/components/error-boundary"
import { TopBar } from "@/components/top-bar"
import { LoadingProvider } from "@/contexts/loading-context"
import { NavigationEvents } from "@/components/navigation-events"

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
  openGraph: {
    title: 'CrisisCore',
    description: 'Emergency Management System',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CrisisCore',
    description: 'Emergency Management System',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html 
      lang="en" 
      className={`${geistSans.variable} ${geistMono.variable}`}
      suppressHydrationWarning
    >
      <body 
        className="bg-zinc-950"
        suppressHydrationWarning
      >
        <ClerkProvider>
          <LoadingProvider>
            <TopBar />
            <NavigationEvents />
            <div className="pt-[calc(2vh+56px)]">
              <main className="bg-zinc-950">
                <ErrorBoundary>
                  <LocationProvider>
                    <div className="flex min-h-[calc(100vh-calc(2vh+56px))]">
                      <SidebarDemo />
                      <MainContent>
                        {children}
                      </MainContent>
                      <ClientWrapper>
                        <BottomNav />
                      </ClientWrapper>
                    </div>
                    <Toaster />
                    <ClientWrapper>
                      <RoutePrefetcher />
                    </ClientWrapper>
                  </LocationProvider>
                </ErrorBoundary>
              </main>
            </div>
          </LoadingProvider>
        </ClerkProvider>
      </body>
    </html>
  )
}
