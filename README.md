# RNTextAudioInterleave

A React Native audio player app that synchronizes audio playback with transcript highlighting. The app supports Android, iOS, and Web platforms.

## Features

- **Audio Playback**: Play audio files with synchronized transcript
- **Interactive Controls**: Play, Pause, Rewind, Forward, and Repeat functionality
- **Transcript Highlighting**: Real-time highlighting of current spoken phrase
- **Cross-Platform**: Works on Android, iOS, and Web
- **Development Flexibility**: Support for both Expo Go and traditional React Native development

## Project Structure

```
RNTextAudioInterleave/
├── app/
│   ├── index.tsx          # Screen 1: Audio file list
│   ├── player.tsx         # Screen 2: Audio player with transcript
│   └── _layout.tsx        # Navigation layout
├── components/            # Reusable UI components
├── hooks/                 # Custom React hooks
├── constants/             # App constants and colors
├── assets/               # Audio files and transcripts
├── plugins/              # Custom native modules (if any)
├── android/              # Generated native Android project (after prebuild)
├── ios/                  # Generated native iOS project (after prebuild)
├── web/                  # Web-specific files (index.html for custom title)
├── eas.json              # EAS Build configuration
└── package.json
```

## Prerequisites

- **Node.js** (v20.18.1 or higher - required for undici package)
- **npm** or **yarn**
- **Expo CLI**: `npm install -g @expo/cli`
- **EAS CLI**: `npm install -g eas-cli`

### Platform-Specific Requirements

#### Android

- **Android Studio** with Android SDK
- **Java Development Kit (JDK)** 11 or higher
- Enable **Developer Options** and **USB Debugging** on your device

#### iOS

- **Xcode** (macOS only)
- **iOS Simulator** or physical iOS device
- **Apple Developer Account** (for device testing)

#### Web

- Modern web browser (Chrome, Firefox, Safari, Edge)

## Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/e-molochko/RNTextAudioInterleave.git
   cd RNTextAudioInterleave
   ```

2. **Install dependencies:**
   ```bash
   npm install
   # or
   yarn install
   ```

## Development

This project supports multiple development workflows. Choose the one that best fits your needs:

### Development Options

#### Option 1: Expo Go (Simplest)

- ✅ No setup required
- ❌ Limited native module support
- ❌ Performance limitations

#### Option 2: Development Client (Recommended for most cases)

- ✅ Better performance than Expo Go
- ✅ Full native module support
- ✅ Cloud builds (no local setup)
- ❌ Requires cloud build time

#### Option 3: Bare Workflow (Traditional React Native)

- ✅ Full React Native CLI experience
- ✅ Fastest development cycles
- ✅ Direct native debugging
- ❌ Requires local build environment

### Setup for Different Development Modes

#### Expo Go Development

```bash
# Start with Expo Go
npm run start:expo-go
# or
npx expo start
```

#### Development Client Setup

1. **Build development client:**

   ```bash
   # For Android
   npm run build:dev-android

   # For iOS
   npm run build:dev-ios

   # For both platforms
   npm run build:dev-all
   ```

2. **Install the development build on your device**

3. **Start development server:**
   ```bash
   npm start
   # or
   npx expo start --dev-client
   ```

#### Bare Workflow Setup (Traditional React Native)

1. **Generate native projects:**

   ```bash
   npx expo prebuild
   ```

2. **Install platform-specific dependencies:**

   ```bash
   # For Android
   cd android && ./gradlew installDebug && cd ..

   # For iOS (macOS only)
   cd ios && pod install && cd ..
   ```

3. **Start development:**

   ```bash
   # Start Metro bundler
   npx react-native start

   # In another terminal, run on device/emulator
   npx react-native run android
   npx react-native run ios
   ```

### Running the App

#### Web (Local Development)

```bash
# Start development server for web
npm run web
# or
yarn web
```

The app will open in your browser at `http://localhost:8081`

#### Android

**Expo Go:**

```bash
npm run start:expo-go
# Then scan QR code with Expo Go app
```

**Development Client:**

```bash
npm start
# Then open development build app
```

**Bare Workflow:**

```bash
npx react-native start
npx react-native run android
```

#### iOS (macOS only)

**Expo Go:**

```bash
npm run start:expo-go
# Then scan QR code with Expo Go app
```

**Development Client:**

```bash
npm start
# Then open development build app
```

**Bare Workflow:**

```bash
npx react-native start
npx react-native run ios
```

#### All Platforms

```bash
# Start Expo development server (choose platform)
npm start
# or
yarn start
```

Then press:

- `w` for web
- `a` for Android
- `i` for iOS

## Custom Native Modules

### Creating Custom Plugins

If you need custom native functionality, create plugins in the `plugins/` directory:

```
plugins/
├── custom-audio-plugin/
│   ├── package.json
│   ├── app.plugin.js
│   └── android/
│       └── src/main/java/com/yourapp/customaudio/
│           └── CustomAudioModule.java
```

### Plugin Configuration

```javascript
// plugins/custom-audio-plugin/app.plugin.js
module.exports = function (config, { projectRoot }) {
  return {
    name: "custom-audio-plugin",
    android: {
      package: "com.yourapp.customaudio",
      permissions: ["android.permission.RECORD_AUDIO"],
      sourceFiles: ["android/src/main/java/com/yourapp/customaudio/CustomAudioModule.java"],
    },
  };
};
```

### Using Custom Plugins

```json
// app.json
{
  "expo": {
    "plugins": [
      "expo-dev-client",
      "expo-router",
      [
        "./plugins/custom-audio-plugin",
        {
          "androidPackage": "com.yourapp.customaudio"
        }
      ]
    ]
  }
}
```

### Development Workflow with Custom Plugins

```bash
# 1. Create your custom plugin
mkdir -p plugins/custom-audio-plugin/android/src/main/java/com/yourapp/customaudio

# 2. Add your native code
# Edit plugins/custom-audio-plugin/android/src/main/java/com/yourapp/customaudio/CustomAudioModule.java

# 3. Configure in app.json
# Add your plugin to the plugins array

# 4. Generate native projects
npx expo prebuild

# 5. Your custom code is now integrated into android/ and ios/
# But the source stays in plugins/
```

## Building for Production

### Web Build

```bash
# Build for web production
npm run build:web
# or
npx expo export --platform web
```

Output will be in `dist/` folder, ready for deployment to any static hosting service.

### Android Build

#### Local Build (Bare Workflow)

```bash
# Build locally (requires Android Studio setup)
npm run build:android
# or
npx expo run:android --variant release
```

#### EAS Build (Recommended)

```bash
# Development builds (with dev client)
npm run build:dev-android

# Preview builds (internal testing)
npm run build:preview-android
```

### iOS Build (macOS only)

#### Local Build (Bare Workflow)

```bash
# Build locally (requires Xcode)
npm run build:ios
# or
npx expo run:ios --configuration Release
```

#### EAS Build (Recommended)

```bash
# Development builds (with dev client)
npm run build:dev-ios

# Preview builds (internal testing)
npm run build:preview-ios
```

## Development Scripts

### Available Scripts

```bash
# Development
npm start                    # Start with dev client
npm run start:expo-go       # Start with Expo Go
npm run android             # Start Android with dev client
npm run ios                 # Start iOS with dev client
npm run web                 # Start web development

# React Native CLI (Bare Workflow)
npm run rn:start            # Start Metro bundler
npm run rn:android          # Run Android (debug)
npm run rn:ios              # Run iOS (debug)
npm run rn:android:debug    # Run Android debug build
npm run rn:android:release  # Run Android release build
npm run rn:ios:debug        # Run iOS debug build
npm run rn:ios:release      # Run iOS release build

# Building
npm run build:web           # Build for web
npm run build:android       # Local Android build
npm run build:ios           # Local iOS build
npm run build:dev-android   # EAS dev build for Android
npm run build:dev-ios       # EAS dev build for iOS
npm run build:preview-android # EAS preview build for Android
npm run build:preview-ios   # EAS preview build for iOS
npm run build:dev-all       # EAS dev build for all platforms
npm run build:preview-all   # EAS preview build for all platforms

# Prebuild
npm run prebuild            # Generate native projects for all platforms
npm run prebuild:clean      # Remove existing native folders and regenerate
npm run prebuild:android    # Generate only Android native project
npm run prebuild:ios        # Generate only iOS native project

# Setup & Maintenance
npm run rn:clean            # Clean Android build
npm run rn:install          # Install Android debug build
npm run rn:install:release  # Install Android release build
npm run rn:setup            # Complete setup (prebuild + install)

# Testing
npm test                    # Run tests
npm run test:watch          # Run tests in watch mode
npm run test:coverage       # Run tests with coverage

# Code Quality
npm run format              # Format code
npm run format:check        # Check code formatting
```

## Configuration Files

### app.json

```json
{
  "expo": {
    "name": "RNTextAudioInterleave",
    "slug": "RNTextAudioInterleave",
    "version": "1.0.0",
    "ios": {
      "bundleIdentifier": "com.egormolochko.RNTextAudioInterleave",
      "buildNumber": "1"
    },
    "android": {
      "package": "com.egormolochko.RNTextAudioInterleave",
      "versionCode": 1,
      "permissions": ["android.permission.MODIFY_AUDIO_SETTINGS", "android.permission.RECORD_AUDIO"]
    },
    "web": {
      "title": "RNTextAudioInterleave - Audio Player",
      "description": "Audio player with synchronized transcript highlighting"
    }
  }
}
```

### eas.json

```json
{
  "build": {
    "development": {
      "developmentClient": true,
      "distribution": "internal",
      "ios": {
        "resourceClass": "m1-medium",
        "buildConfiguration": "Debug"
      },
      "android": {
        "buildType": "apk",
        "gradleCommand": ":app:assembleDebug"
      }
    },
    "preview": {
      "distribution": "internal",
      "ios": {
        "resourceClass": "m1-medium",
        "buildConfiguration": "Release"
      },
      "android": {
        "buildType": "apk",
        "gradleCommand": ":app:assembleRelease"
      }
    }
  }
}
```

## Deployment

### Web Deployment

#### Netlify (Recommended)

1. **Connect your repository to Netlify**
2. **Configure build settings:**
   - Build command: `npm run build:web`
   - Publish directory: `dist`
   - Node version: `20.18.1` or higher

3. **Automatic deployment**: Netlify will automatically deploy on every push to your main branch

#### Manual Deployment

```bash
# Build
npm run build:web

# Deploy to Netlify (drag & drop dist folder)
# Or use Netlify CLI
npm install -g netlify-cli
netlify deploy --prod --dir dist
```

#### Other Platforms

- **Vercel**: Connect repository and set build command to `npm run build:web`
- **GitHub Pages**: Use GitHub Actions with the same build command

### Mobile App Deployment

#### Android (Google Play Store)

1. Build preview APK using EAS Build: `npm run build:preview-android`
2. Upload to Google Play Console
3. Follow Play Store review process

#### iOS (App Store)

1. Build preview IPA using EAS Build: `npm run build:preview-ios`
2. Upload to App Store Connect
3. Follow App Store review process

## Testing

### Running Tests

```bash
# Run all tests
npm test
# or
yarn test

# Run tests in watch mode
npm run test:watch
# or
yarn test:watch

# Run tests with coverage
npm run test:coverage
# or
yarn test:coverage
```

### Test Structure

Tests are placed next to the components they test:

```
components/
├── ComponentName.tsx
└── ComponentName.test.tsx

app/
├── screen-name/
│   ├── index.tsx
│   └── index.test.tsx
```

## Code Formatting

This project uses Prettier for code formatting with automatic formatting on commit.

### Pre-commit Hook

The project includes a pre-commit hook that automatically formats staged files:

```bash
# Format all files
npm run format

# Check formatting
npm run format:check
```

### VS Code Setup

For the best development experience:

1. Install the Prettier extension
2. Set Prettier as the default formatter for TypeScript/TSX files
3. Enable "Format on Save" and "Format on Paste"

## Audio Files Format

### Audio File (.mp3)

- Standard MP3 format
- Phrases should be interleaved between speakers
- Include silence pauses between phrases

### Transcript File (.json)

```json
{
  "pause": 500,
  "speakers": [
    {
      "name": "Speaker 1",
      "phrases": [
        { "words": "Hello, how are you?", "time": 2000 },
        { "words": "I'm doing great!", "time": 1500 }
      ]
    },
    {
      "name": "Speaker 2",
      "phrases": [
        { "words": "Hi there! I'm good.", "time": 2200 },
        { "words": "That's wonderful!", "time": 1800 }
      ]
    }
  ]
}
```

## Troubleshooting

### Common Issues

#### Metro bundler issues

```bash
# Clear Metro cache
npx expo start --clear
# or
npx react-native start --reset-cache
```

#### Android build issues

```bash
# Clean Android build (bare workflow)
cd android && ./gradlew clean && cd ..

# Clean Android build (managed workflow)
npx expo run:android --clear
```

#### iOS build issues

```bash
# Clean iOS build (bare workflow)
cd ios && xcodebuild clean && cd ..

# Clean iOS build (managed workflow)
npx expo run:ios --clear
```

#### Web build issues

```bash
# Clear web cache
rm -rf .expo && npm start
```

#### Development Client Issues

```bash
# Rebuild development client
npm run build:dev-android
# or
npm run build:dev-ios
```

#### Prebuild Issues

```bash
# Clean and regenerate native projects
rm -rf android ios
npx expo prebuild
```

#### Node.js version issues

If you encounter `undici` package errors, ensure you're using Node.js v20.18.1 or higher:

```bash
# Check Node version
node --version

# Update Node.js (recommended: use nvm)
nvm install 20.18.1
nvm use 20.18.1
```

## Development Workflow Comparison

| Feature            | Expo Go | Development Client | Bare Workflow |
| ------------------ | ------- | ------------------ | ------------- |
| Setup Complexity   | None    | Medium             | High          |
| Build Time         | None    | 10-20 min          | 2-5 min       |
| Native Modules     | Limited | Full               | Full          |
| Performance        | Basic   | Good               | Best          |
| Debugging          | Basic   | Good               | Best          |
| Custom Native Code | No      | Via plugins        | Direct        |
| `react-native run` | No      | No                 | Yes           |

Choose the workflow that best fits your development needs and team expertise.
