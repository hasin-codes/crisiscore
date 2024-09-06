export default function GridBackground() {
  return (
    <div className=" fixed inset-0 z-[-1] w-screen h-screen h-screen bg-black  overflow-hidden">
      <div className="absolute inset-0" style={{
        backgroundImage: `
          radial-gradient(circle at 1px 1px, rgba(255, 255, 255, 0.15) 1px, transparent 0),
          radial-gradient(circle at 1.5px 1.5px, rgba(255, 255, 255, 0.5) 1.5px, transparent 0),
          radial-gradient(circle at 1px 1px, rgba(255, 255, 255, 0.05) 1px, transparent 0)
        `,
        backgroundSize: '40px 40px, 60px 60px, 80px 80px',
        backgroundPosition: '0 0, 20px 20px, 40px 40px',
      }} />
    </div>
  )
}

