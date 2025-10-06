
/** @type {import('next').NextConfig} */
const nextConfig = {
  allowedDevOrigins: [
    "https://6000-firebase-studio-1755150981545.cluster-lu4mup47g5gm4rtyvhzpwbfadi.cloudworkstations.dev"
  ],
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: `default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline' freeimage.host platform.linkedin.com; style-src 'self' 'unsafe-inline'; img-src 'self' data: iili.io; font-src 'self';`
          },
        ],
      },
    ];
  },
  images: {
    domains: ['iili.io'],
  },
};

module.exports = nextConfig;
