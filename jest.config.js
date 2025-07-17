module.exports = {
  preset: "react-native",
  setupFilesAfterEnv: ["<rootDir>/setupTests.ts"],
  transformIgnorePatterns: [
    "node_modules/(?!((jest-)?react-native|@react-native(-community)?)|expo(nent)?|@expo(nent)?/.*|@expo-google-fonts/.*|react-navigation|@react-navigation/.*|@unimodules/.*|unimodules|sentry-expo|native-base|react-native-svg)",
  ],
  testEnvironment: "node",
  moduleFileExtensions: ["ts", "tsx", "js", "jsx"],
  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": ["babel-jest", { presets: ["module:@react-native/babel-preset"] }],
  },
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/$1",
    "^@hooks/(.*)$": "<rootDir>/hooks/$1",
    "^@components/(.*)$": "<rootDir>/components/$1",
    "^@constants/(.*)$": "<rootDir>/constants/$1",
    "^@models/(.*)$": "<rootDir>/models/$1",
    "^@utils/(.*)$": "<rootDir>/utils/$1",
    "^@assets/(.*)$": "<rootDir>/assets/$1",
    "^@app/(.*)$": "<rootDir>/app/$1",
    "\\.(mp3|wav|ogg|m4a)$": "<rootDir>/__mocks__/audioFile.js",
  },
  testMatch: ["**/__tests__/**/*.(ts|tsx|js)", "**/*.(test|spec).(ts|tsx|js)"],
  collectCoverageFrom: [
    "app/**/*.{ts,tsx}",
    "components/**/*.{ts,tsx}",
    "hooks/**/*.{ts,tsx}",
    "!**/*.d.ts",
    "!**/node_modules/**",
  ],
};
