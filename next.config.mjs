/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '3000',  // Specify the port if necessary
        pathname: '/uploads/**',  // Match the folder path for the images
      },
    ],
  },
};

export default nextConfig;
