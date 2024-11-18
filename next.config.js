/** @type {import('next').NextConfig} */
const nextConfig = {
  // ... your existing config
  experimental: {
    // Add this to better handle React 19 RC
    serverActions: {
      allowedForwardedHosts: ['localhost', 'your-domain.com'],
      bodySizeLimit: '2mb'
    }
  }
}

export default nextConfig 