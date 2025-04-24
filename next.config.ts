import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: false,
  webpack(config) {
    config.module.rules.push({
      test: /node-pre-gyp[\\/]lib[\\/]util[\\/]nw-pre-gyp[\\/]index\.html$/,
      use: "null-loader",
    });

    return config;
  },
};

export default nextConfig;
