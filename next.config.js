/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  assetPrefix: '/prodesk',
  basePath: '/prodesk',
  images: {
    unoptimized: true,
  },
  // Enable experimental features for better performance
  experimental: {
    optimizePackageImports: ['lucide-react', 'framer-motion'],
  },
};

module.exports = nextConfig;
