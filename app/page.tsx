'use client';

import { SignedIn, SignedOut } from "@clerk/nextjs";
import { HomePage } from '@/components/home-page';
import { useRouter } from 'next/navigation';
import { LogIn } from 'lucide-react';

export default function Home() {
  const router = useRouter();

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-24 text-white">
      <SignedIn>
        <HomePage />
      </SignedIn>
      <SignedOut>
        <div className="text-center">
          <h1 className="text-2xl mb-4 text-white">Welcome to CrisisCore</h1>
          <p className="mb-4 text-white">Please sign in to continue.</p>
        </div>
      </SignedOut>
      <button 
        onClick={() => router.push('/sign-in')} 
        className="flex items-center justify-center gap-2 btn mt-4 text-white bg-purple-600 border-purple-600 hover:bg-white hover:text-purple-600 transition-colors p-2 rounded"
      >
        <LogIn size={20} />
        Sign In
      </button>
    </main>
  )
}
