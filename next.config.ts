import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['pmlradrjbsfkrxpflxmy.supabase.co'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'pmlradrjbsfkrxpflxmy.supabase.co',
        pathname: '/storage/**',
      },
    ],
  },
};

export default nextConfig;
