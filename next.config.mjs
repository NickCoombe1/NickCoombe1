/** @type {import('next').NextConfig} */
export default {
  webpack: (config) => {
    // Add a rule to process markdown files
    config.module.rules.push({
      test: /\.md$/, // Target .md files
      use: "raw-loader", // Use the raw-loader to import Markdown as a string
    });

    return config;
  },
  async redirects() {
    return [
      {
        source: "/", // The path to match
        destination: "/about", // The path to redirect to
        permanent: true, // Set to true for a 308 permanent redirect
      },
    ];
  },
};
