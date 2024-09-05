'use client';

import { SignedIn, SignedOut } from "@clerk/nextjs";
import { HomePage } from '@/components/home-page';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.push('/sign-in');
  }, [router]);

  return (
    <main className="flex items-center justify-center h-full p-24">
      <SignedIn>
        <HomePage />
      </SignedIn>
      <SignedOut>
        {/* Redirect happens automatically, no content needed here */}
      </SignedOut>
    </main>
  )
}
