import React from 'react';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex items-center justify-center h-full">
      <div>
      <h1 className="text-4xl font-bold mb-8 text-white">Welcome to CrisisCore</h1>
        {children}
      </div>
    </div>
  )
}