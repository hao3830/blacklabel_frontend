/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  output: 'standalone',
  images: {
    domains: ['https://aiclub.uit.edu.vn/blacklabel/api'],
  },
}

module.exports = nextConfig
