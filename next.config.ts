import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/public/PaperJMDR",
        destination: "/Public/PaperJMDR",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
