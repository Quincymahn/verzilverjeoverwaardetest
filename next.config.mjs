/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http", // The protocol your Strapi server is using
        hostname: "95.211.44.132", // The IP address of your Strapi server
        port: "1337", // The port your Strapi server is running on
        pathname: "/uploads/**", // Allows any path under /uploads/. Use '/**' if uploads can be anywhere.
      },
      // You can add other patterns here if needed for other image sources
    ],
  },
};

export default nextConfig;
