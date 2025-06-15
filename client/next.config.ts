import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  /* config options here */

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'vision-naire.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
}

export default nextConfig
