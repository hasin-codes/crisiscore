import { ClerkProvider, SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
import './globals.css'  // Import the new CSS file
import GridBackground from './components/GridBackground'
import { SpeedInsights } from '@vercel/speed-insights/next';


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <ClerkProvider>
        <body>
          <GridBackground />
          <SignedOut>
            <SignInButton />
          </SignedOut>
          <SignedIn>
            
          </SignedIn>
          {children}
          <SpeedInsights />
        </body>
      </ClerkProvider>
    </html>
  )
}