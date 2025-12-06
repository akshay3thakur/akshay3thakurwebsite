/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
    ],
  },
  // Turbopack is enabled by default in Next.js 16
  // If you need webpack, use: npm run build -- --webpack
  turbopack: {},
}

module.exports = nextConfig

