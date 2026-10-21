/** @type {import('next').NextConfig} */
const isGithubPages = process.env.GITHUB_PAGES === 'true'
const repoName = 'AgriWeb'

const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 31536000,
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'i.pinimg.com' },
      { protocol: 'https', hostname: 'firebasestorage.googleapis.com' },
      { protocol: 'https', hostname: 'lh3.googleusercontent.com' },
    ],
    unoptimized: true, // Required for static export
  },
  experimental: {
    optimizePackageImports: ['lucide-react', '@radix-ui/react-icons'],
  },
  // GitHub Pages requires basePath and assetPrefix for subdirectory deployment
  basePath: isGithubPages ? `/${repoName}` : '',
  assetPrefix: isGithubPages ? `/${repoName}/` : '',
  trailingSlash: true, // Recommended for static hosting
  headers: async () => [
    {
      source: '/:path*',
      headers: [
        { key: 'X-DNS-Prefetch-Control', value: 'on' },
        { key: 'X-Content-Type-Options', value: 'nosniff' },
        { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
      ],
    },
    {
      source: '/assets/:path*',
      headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }],
    },
    {
      source: '/data/:path*',
      headers: [
        { key: 'Cache-Control', value: 'public, max-age=3600, stale-while-revalidate=86400' },
        { key: 'Access-Control-Allow-Origin', value: '*' },
      ],
    },
  ],
  rewrites: async () => [
    { source: '/sw.js', destination: '/_next/static/sw.js' },
  ],
}

module.exports = nextConfig