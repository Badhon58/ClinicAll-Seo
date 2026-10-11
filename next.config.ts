// import type { NextConfig } from "next";
// const nextConfig: NextConfig = {
//   images: {
//     domains: [
//       "img.icons8.com",
//       "clinicallbd.obs.as-south-208.rcloud.reddotdigitalit.com",
//       "clinicall-files.obs.as-south-208.rcloud.reddotdigitalit.com",
//       "epharma.com.bd",
//       "lh3.googleusercontent.com",
//     ],
//   },
//   // staticPageGenerationTimeout: 120,
// };
// export default nextConfig
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "clinicall-files.obs.as-south-208.rcloud.reddotdigitalit.com",
      },
      {
        protocol: "https",
        hostname: "clinicall-files.obs.as-south-208.rcloud.reddotdigitalit.com",
      },
      {
        protocol: "https",
        hostname: "clinicallbd.obs.as-south-208.rcloud.reddotdigitalit.com",
      },
      {
        protocol: "https",
        hostname: "img.icons8.com",
      },
      {
        protocol: "https",
        hostname: "epharma.com.bd",
      },
      {
        protocol: "https",
        hostname: "cdn2.arogga.com",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
    ],
  },
};

export default nextConfig;
