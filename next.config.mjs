/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['ts', 'tsx'],
  reactStrictMode: false,
  experimental: {
    instrumentationHook: true,
  },
};

export default nextConfig;
