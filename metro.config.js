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

module.exports = config;
