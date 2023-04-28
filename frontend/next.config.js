/** @type {import('next').NextConfig} */
const nextConfig = {
  rules: {
    "@next/next/no-img-element": "off",
   },
  reactStrictMode: true,
  experimental: {
  appDir: true,
  }
}

module.exports = nextConfig
