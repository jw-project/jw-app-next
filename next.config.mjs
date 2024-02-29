/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['ts', 'tsx'],
  experimental: {
    instrumentationHook: true,
  },
};

export default nextConfig;
