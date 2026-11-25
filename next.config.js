/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  images: {
    // Static export requires a custom loader or unoptimized
    unoptimized: true,
  },
};

module.exports = nextConfig;
