/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    domains: ['github.com', 'img.clerk.com']
  },
  headers: async () => {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Set-Cookie',
            value: '__clerk_db_jwt=; SameSite=Strict; Secure',
          },
        ],
      },
    ]
  },
  experimental: {
    optimizeFonts: true,
  },
  onDemandEntries: {
    maxInactiveAge: 25 * 1000,
    pagesBufferLength: 2,
  },
  webpack: (config, { isServer }) => {
    config.infrastructureLogging = {
      level: 'error',
    }
    
    return config
  },
}

module.exports = nextConfig 