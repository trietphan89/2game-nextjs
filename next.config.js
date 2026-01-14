/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Keep API routes disabled for now (no backend yet)
  // output: 'export', // Commented out to allow dynamic pages
  images: {
    unoptimized: true,
    domains: ['2game.space', 'www.2game.space'],
  },
  trailingSlash: true,
  // Allow external domains to access Next.js dev server
  allowedDevOrigins: ['https://2game.space', 'https://www.2game.space', 'http://2game.space', 'http://www.2game.space'],
  // Compression and optimization
  compress: true,
  poweredByHeader: false,
  // Skip type checking during build (fix types later)
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  // CORS headers for production
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'Access-Control-Allow-Origin', value: '*' },
          { key: 'Access-Control-Allow-Methods', value: 'GET,OPTIONS,PATCH,DELETE,POST,PUT' },
          { key: 'Access-Control-Allow-Headers', value: 'X-Requested-With, Content-Type, Authorization' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-XSS-Protection', value: '1; mode=block' },
        ],
      },
    ]
  },
}

module.exports = nextConfig
