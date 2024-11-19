import dynamic from 'next/dynamic'

export const DynamicWindyMap = dynamic(
  () => import('./windy-map').then((mod) => mod.WindyMap),
  { 
    ssr: false,
    loading: () => (
      <div className="w-full h-full flex items-center justify-center bg-zinc-900 rounded-lg">
        Loading map...
      </div>
    )
  }
) 