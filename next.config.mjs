/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "dashboard.saracoffee.com", // Add your image hostname
        pathname: "/wp-content/uploads/**",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/blog/:slug*",
        destination: "/:slug*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;

// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   async headers() {
//     return [
//       {
//         source: "/(.*)", // Apply to all routes
//         headers: [
//           {
//             key: "Content-Security-Policy",
//             value:
//               "default-src 'self'; font-src 'self' https://fonts.gstatic.com https://*.stripe.com data:; script-src 'self' 'unsafe-eval' 'unsafe-inline' https://*.stripe.com; frame-src https://*.stripe.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
//           },
//         ],
//       },
//     ];
//   },
//   images: {
//     remotePatterns: [
//       {
//         protocol: "https",
//         hostname: "dashboard.saracoffee.com",
//         pathname: "/wp-content/uploads/**",
//       },
//     ],
//   },
// };

// export default nextConfig;
