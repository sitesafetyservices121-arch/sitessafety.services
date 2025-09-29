/** @type {import('next').NextConfig} */
const nextConfig = {
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
      {
        protocol: 'https',
        hostname: 'picsum.photos',
      },
      {
        protocol: 'https',
        hostname: 'iili.io',
      },
    ],
  },
  // This is required to allow the Next.js dev server to be accessed from
  // the IDX preview window.
  allowedDevOrigins: [
    'https://*.googleusercontent.com',
    'https://*.cloudworkstations.dev',
    'https://6000-firebase-studio-1755150981545.cluster-lu4mup47g5gm4rtyvhzpwbfadi.cloudworkstations.dev',
  ],
};

module.exports = nextConfig;
