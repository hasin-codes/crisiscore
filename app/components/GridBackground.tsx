export default function GridBackground() {
  return (
    <div className="fixed inset-0 z-[-1] w-screen h-screen bg-black grid grid-cols-[repeat(20,1fr)] grid-rows-[repeat(20,1fr)] gap-0">
      {Array.from({ length: 20 * 20 }).map((_, i) => (
        <div key={i} className="border-[1px] border-white border-opacity-10" />
      ))}
    </div>
  )
}