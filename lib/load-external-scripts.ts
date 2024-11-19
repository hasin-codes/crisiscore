export const loadExternalScripts = async () => {
  if (typeof window === 'undefined') return

  // Function to load script and wait for it to be ready
  const loadScript = (src: string): Promise<void> => {
    return new Promise((resolve, reject) => {
      if (document.querySelector(`script[src*="${src}"]`)) {
        resolve()
        return
      }

      const script = document.createElement('script')
      script.src = src
      script.async = false // Make script loading synchronous
      script.onload = () => resolve()
      script.onerror = () => reject(new Error(`Failed to load script: ${src}`))
      document.head.appendChild(script)
    })
  }

  // Function to load CSS
  const loadCSS = (href: string): Promise<void> => {
    return new Promise((resolve) => {
      if (document.querySelector(`link[href*="${href}"]`)) {
        resolve()
        return
      }

      const link = document.createElement('link')
      link.rel = 'stylesheet'
      link.href = href
      link.onload = () => resolve()
      document.head.appendChild(link)
    })
  }

  try {
    // Load Leaflet CSS first
    await loadCSS('https://unpkg.com/leaflet@1.4.0/dist/leaflet.css')
    
    // Load Leaflet JS
    await loadScript('https://unpkg.com/leaflet@1.4.0/dist/leaflet.js')
    
    // Load Windy
    await loadScript('https://api.windy.com/assets/map-forecast/libBoot.js')

    return true
  } catch (error) {
    console.error('Error loading external scripts:', error)
    return false
  }
} 