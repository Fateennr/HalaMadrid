import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // if you have both next.config.ts and next.config.mjs, delete the .mjs one
  images: {
    domains: [
      "via.placeholder.com",
      "upload.wikimedia.org", "crests.football-data.org",
    ],
  },
  reactStrictMode: true,
};

export default nextConfig;
