/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
    serverComponentsExternalPackages: ['bcrypt'],
  },
  images: {
    domains: ['res.cloudinary.com'],
  },
};

module.exports = nextConfig;
