import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Allow cross-origin requests for development
  allowedDevOrigins: ["10.153.158.177"],
  // Enable static export for deployment as static files
  output: 'export',
};

export default nextConfig;
