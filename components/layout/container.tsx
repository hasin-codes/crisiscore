export function Container({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-w-[320px]">
      <div className="container mx-auto p-4 md:p-6 lg:p-8 max-w-[1920px]">
        {children}
      </div>
    </div>
  )
} 