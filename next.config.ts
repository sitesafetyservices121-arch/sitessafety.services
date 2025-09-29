
import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'firebasestorage.googleapis.com',
        port: '',
        pathname: '/**',
      },
    ],
    qualities: [75, 100],
  },
  // This is required to allow the Next.js dev server to be accessed from
  // the IDX preview window.
  allowedDevOrigins: ['https://*.googleusercontent.com', 'https://*.cloudworkstations.dev'],

};

export default nextConfig;
