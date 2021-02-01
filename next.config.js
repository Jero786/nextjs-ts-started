module.exports = {
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      "~/*": "/*",
      "test-utils": "./utils/tests",
      "~/components/*": "./components/*",
      "~/styles/*": "./styles/*",
      "~/domain/*": "./domain/*",
      "~/constants/*": "./constants/*",
    }
    config.node = { fs: 'empty' };
    return config
  }
}