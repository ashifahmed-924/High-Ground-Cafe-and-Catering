/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Local JPEGs in /public/images/high-ground (stock until client photos arrive).
    unoptimized: true,
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
