/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  output: 'standalone',
  images: {
    domains: ['http://127.0.0.1:3030'],
  },
}

module.exports = nextConfig
