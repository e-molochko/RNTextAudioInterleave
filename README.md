# RNTextAudioInterleave

A React Native audio player app that synchronizes audio playback with transcript highlighting. The app supports Android, iOS, and Web platforms with flexible development workflows.

## Features

- **Audio Playback**: Play audio files with synchronized transcript
- **Interactive Controls**: Play, Pause, Rewind, Forward, and Repeat functionality
- **Transcript Highlighting**: Real-time highlighting of current spoken phrase
- **Cross-Platform**: Works on Android, iOS, and Web
- **Flexible Development**: Support for Expo Go, Development Client, and React Native CLI workflows

## Project Structure

```
RNTextAudioInterleave/
├── app/                   # App screens (Expo Router)
│   ├── home/             # Home screen with audio file list
│   ├── player/           # Player screen with audio controls
│   └── _layout.tsx       # Navigation layout
├── components/           # Reusable UI components
├── hooks/               # Custom React hooks
├── constants/           # App constants and colors
├── utils/               # Utility functions
├── models/              # TypeScript type definitions
├── assets/              # Audio files, images, and fonts
├── android/             # Generated Android project (after prebuild)
├── ios/                 # Generated iOS project (after prebuild)
├── __mocks__/           # Jest mocks for testing
├── coverage/            # Test coverage reports
├── app.json             # Expo configuration
├── eas.json             # EAS Build configuration
└── package.json
```

## Prerequisites

- **Node.js** (v20.18.1 or higher)
- **npm** or **yarn**
- **Expo CLI**: `npm install -g @expo/cli`
- **EAS CLI**: `npm install -g eas-cli` (for cloud builds)

### Platform-Specific Requirements

#### Android

- **Android Studio** with Android SDK
- **Java Development Kit (JDK)** 11 or higher
- Enable **Developer Options** and **USB Debugging** on your device

#### iOS (macOS only)

- **Xcode**
- **iOS Simulator** or physical iOS device
- **Apple Developer Account** (for device testing)

## Installation

```bash
git clone https://github.com/e-molochko/RNTextAudioInterleave.git
cd RNTextAudioInterleave
npm install
```

## Development Workflows

This project supports three development approaches:

### 1. **Expo Go** (Quickest start)

```bash
npm run start:expo-go
# Scan QR code with Expo Go app
```

- ✅ No setup required
- ❌ Limited native module support

### 2. **Development Client** (Recommended)

```bash
# Build dev client (one time)
npm run build:dev-android

# Start development
npm start
# Scan QR code with your custom dev client app
```

- ✅ Full native module support
- ✅ Expo dev tools and debugging
- ✅ Cloud builds (no local setup)

### 3. **React Native CLI** (Best performance)

```bash
# Generate native projects (one time)
npm run prebuild

# Start development
npm start                # Terminal 1: Start Metro
npm run rn:android      # Terminal 2: Build & run Android
```

- ✅ Fastest build cycles
- ✅ Direct native debugging
- ✅ Pure React Native experience

## Adding Expo Dev Client

### Why Use Expo Dev Client?

**Expo Dev Client** provides a custom build of Expo Go with full native module support. It's essential for:

- **EAS Development Builds**: Cloud builds with development tools
- **Custom Native Modules**: When Expo Go doesn't support your native dependencies
- **Development Tools**: Expo's debugging and development features

### How to Add Expo Dev Client

```bash
# Install expo-dev-client
npm install expo-dev-client

# Add to app.json plugins (if not already present)
# "plugins": ["expo-dev-client"]

# Build development client
npm run build:dev-android  # or build:dev-ios
```

### When to Use vs Avoid

**Use Dev Client when:**

- Building with EAS (cloud builds)
- Using custom native modules
- Need Expo's development tools

**Avoid Dev Client when:**

- Using pure React Native CLI workflow
- Want faster build cycles
- Testing production-like builds

## Available Scripts

### Development

```bash
npm start                # Expo dev client
npm run start:expo-go   # Expo Go
npm run android         # Android with dev client
npm run ios             # iOS with dev client
npm run web             # Web development
```

### React Native CLI

```bash
npm run rn:android      # Build & run Android
npm run rn:ios          # Build & run iOS
npm run rn:clean        # Clean Android build cache
```

### Building & Deployment

```bash
npm run build:web           # Web production build
npm run build:dev-android   # EAS development build (Android)
npm run build:dev-ios       # EAS development build (iOS)
npm run build:preview-android # EAS preview build (Android)
```

### Project Maintenance

```bash
npm run prebuild           # Generate native projects
npm run prebuild:clean     # Clean & regenerate native projects
npm test                   # Run tests
npm run test:coverage      # Run tests with coverage
npm run format             # Format code with Prettier
```

## Web Deployment

### Netlify (Recommended)

1. Connect your repository to Netlify
2. Set build command: `npm run build:web`
3. Set publish directory: `dist`
4. Deploy automatically on every push

### Manual Deployment

```bash
npm run build:web
# Upload the `dist` folder to your hosting provider
```

## Mobile App Deployment

### Android (Google Play Store)

#### EAS Build (Recommended)

```bash
npm run build:preview-android  # Build APK via EAS
# Upload to Google Play Console
```

#### Local Build (Requires Android Studio)

```bash
# Generate native projects (if not already done)
npm run prebuild

# Build release APK
cd android
./gradlew assembleRelease
cd ..

# APK will be in: android/app/build/outputs/apk/release/app-release.apk
```

**Prerequisites for Local Build:**

- Android Studio installed
- Android SDK configured
- Java Development Kit (JDK) 11 or higher
- Environment variables set (ANDROID_HOME, JAVA_HOME)

### iOS (App Store)

```bash
npm run build:preview-ios      # Build IPA via EAS
# Upload to App Store Connect
```

## Audio File Format

### Audio File (.mp3)

- Standard MP3 format
- Phrases should be clearly separated
- Include natural pauses between speakers

### Transcript File (.json)

```json
{
  "pause": 500,
  "speakers": [
    {
      "name": "John",
      "phrases": [
        { "words": "Hello, how are you?", "time": 2000 },
        { "words": "I'm doing great!", "time": 1500 }
      ]
    },
    {
      "name": "Jane",
      "phrases": [
        { "words": "Hi there! I'm good.", "time": 2200 },
        { "words": "That's wonderful!", "time": 1800 }
      ]
    }
  ]
}
```

## Testing

Tests are located next to the components they test:

```bash
npm test              # Run all tests
npm run test:watch    # Run tests in watch mode
npm run test:coverage # Run tests with coverage report
```

## Code Quality

- **Prettier**: Automatic code formatting
- **TypeScript**: Type safety
- **Husky**: Pre-commit hooks
- **Lint-staged**: Format staged files on commit

## Troubleshooting

### Clear Caches

```bash
# Metro cache
npx expo start --clear

# Android build cache
npm run rn:clean

# Complete clean (removes android/ios folders)
npm run prebuild:clean
```

### Common Issues

**Node.js version**: Ensure you're using Node.js v20.18.1 or higher
**Metro bundler**: If you see bundling issues, try `npx expo start --clear`
**Android builds**: Clean gradle cache with `npm run rn:clean`

## Development Workflow Comparison

| Feature        | Expo Go | Dev Client | RN CLI |
| -------------- | ------- | ---------- | ------ |
| Setup          | None    | Medium     | Medium |
| Build Speed    | N/A     | Medium     | Fast   |
| Native Modules | Limited | Full       | Full   |
| Debugging      | Basic   | Good       | Best   |
| Performance    | Basic   | Good       | Best   |

Choose the workflow that best fits your needs!
