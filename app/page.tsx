import { SignedIn, SignedOut } from "@clerk/nextjs";
import { HomePage } from '@/components/home-page';
import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen">

      <SignedOut>
        <Link href="/sign-in">
          <button className="bg-white text-black px-4 py-2 rounded-md hover:bg-opacity-90 transition-colors">
            Sign In
          </button>
        </Link>
      </SignedOut>
      <SignedIn>
        <HomePage />
      </SignedIn>
    </main>
  )
}
