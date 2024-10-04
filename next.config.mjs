export default {
  webpack: (config, { isServer }) => {
    // Add a rule to process markdown files
    config.module.rules.push({
      test: /\.md$/, // Target .md files
      use: "raw-loader", // Use the raw-loader to import Markdown as a string
    });

    return config;
  },
};
