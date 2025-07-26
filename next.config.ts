// next.config.js or next.config.ts

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['img.freepik.com', 'fra.cloud.appwrite.io'],
  },
  experimental: {
    serverActions: {
      bodySizeLimit: '900mb', // or higher if needed like '20mb'
    },
  },
};

export default nextConfig;
