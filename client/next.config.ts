// client/next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    
    domains: [
      "via.placeholder.com",
      "upload.wikimedia.org",
      "crests.football-data.org",

     
      "localhost",    
      "example.com",    
    ],

    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "8081",
        pathname: "/api/files/**",   // or “/uploads/**” depending on your route
      },
    ],
  },
};

export default nextConfig;
