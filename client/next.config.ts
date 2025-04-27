import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // if you have both next.config.ts and next.config.mjs, delete the .mjs one
  images: {
    domains: [
      "via.placeholder.com",
      // add any other image hosts you need here
    ],
  },
  reactStrictMode: true,
};

export default nextConfig;
