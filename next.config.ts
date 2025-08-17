import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  reactStrictMode: false,
  output: "standalone",

  webpack(config, { dev }) {
    config.resolve.alias["@"] = path.resolve(__dirname, "src");
    if (dev) {
      config.watchOptions = {
        aggregateTimeout: 200,
        poll: 1000,
        ignored: ["node_modules/**", ".git/**", ".next/**", "public/audio/**"],
      };
    }
    return config;
  },
};

export default nextConfig;
