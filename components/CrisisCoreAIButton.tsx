import { useState } from 'react'
import { motion } from 'framer-motion'
import { RefreshCw, BrainCircuit } from 'lucide-react'

interface CrisisCoreAIButtonProps {
  fetchWeatherForecast: () => Promise<void>
  canFetch: () => boolean
}

export default function CrisisCoreAIButton({ fetchWeatherForecast, canFetch }: CrisisCoreAIButtonProps) {
  const [isLoading, setIsLoading] = useState(false)

  const handleClick = async () => {
    setIsLoading(true)
    await fetchWeatherForecast()
    setIsLoading(false)
  }

  const getButtonText = () => {
    if (isLoading) return 'Analyzing...'
    return canFetch() ? 'Get CrisisCore AI Forecast' : 'Wait for Analysis'
  }

  return (
    <motion.button
      onClick={handleClick}
      className={`
        relative overflow-hidden px-4 py-2 rounded-full font-medium text-sm
        bg-gradient-to-r from-blue-500 to-purple-600 text-white
        shadow-lg hover:shadow-xl
        disabled:opacity-50 disabled:cursor-not-allowed
        transition-all duration-300 ease-in-out
      `}
      disabled={isLoading || !canFetch()}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <motion.div
        className="absolute inset-0 bg-white opacity-25"
        animate={{
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          repeatType: 'reverse',
        }}
      />
      <span className="relative flex items-center justify-center">
        {isLoading ? (
          <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <BrainCircuit className="mr-2 h-4 w-4" />
        )}
        <span>{getButtonText()}</span>
      </span>
      <span className="sr-only">{getButtonText()}</span>
    </motion.button>
  )
}