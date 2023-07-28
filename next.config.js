/** @type {import('next').NextConfig} */

module.exports = {
  webpack: (config, options) => {
    // your custom webpack configuration
    return config;
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};