const { getDefaultConfig } = require("expo/metro-config");

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

// Exclude test files from the bundle using blockList
config.resolver.blockList = [
  /.*\.(test|spec)\.(js|jsx|ts|tsx)$/,
  /.*\/__tests__\/.*$/,
  /.*\/setupTests\.ts$/,
  /.*\/jest\.config\.js$/,
];

// Add path aliases for React Native CLI compatibility
config.resolver.alias = {
  "@": __dirname,
  "@assets": `${__dirname}/assets`,
  "@components": `${__dirname}/components`,
  "@constants": `${__dirname}/constants`,
  "@hooks": `${__dirname}/hooks`,
  "@models": `${__dirname}/models`,
  "@utils": `${__dirname}/utils`,
  "@app": `${__dirname}/app`,
};

module.exports = config;
