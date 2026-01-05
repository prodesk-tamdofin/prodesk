/** @type {import('next').NextConfig} */
const nextConfig = {
  // Vercel uses the default server output; no base path or asset prefix required.
  images: {
    unoptimized: true,
  },
  experimental: {
    optimizePackageImports: ['lucide-react', 'framer-motion'],
  },
};

module.exports = nextConfig;
