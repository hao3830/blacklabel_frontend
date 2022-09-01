/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  basePath:'/blacklabel',
  output: 'standalone',
  images: {
    domains: ['https://aiclub.uit.edu.vn'],
  },
}

module.exports = nextConfig
