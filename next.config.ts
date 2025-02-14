import type { NextConfig } from "next";

import BundleAnalyzer from "@next/bundle-analyzer";

const nextConfig: NextConfig = {
  /* config options here */
  logging: {
    fetches: {
      fullUrl: true
    }
  },
  skipTrailingSlashRedirect: true
};

const withBundleAnalyzer = BundleAnalyzer({
  // eslint-disable-next-line n/no-process-env
  enabled: process.env.ANALYZE === "true"
});
export default withBundleAnalyzer(nextConfig);
