/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  experimental: {
    appDir: true,
    runtime: 'experimental-edge',
  },
  images: {
    domains: ['localhost', 's.gravatar.com'],
  },
};

module.exports = nextConfig;
