# RNTextAudioInterleave

A React Native audio player app that synchronizes audio playback with transcript highlighting. The app supports Android, iOS, and Web platforms.

## Features

- **Audio Playback**: Play audio files with synchronized transcript
- **Interactive Controls**: Play, Pause, Rewind, Forward, and Repeat functionality
- **Transcript Highlighting**: Real-time highlighting of current spoken phrase
- **Cross-Platform**: Works on Android, iOS, and Web

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
└── package.json
```

## Prerequisites

- **Node.js** (v20.18.1 or higher - required for undici package)
- **npm** or **yarn**
- **Expo CLI**: `npm install -g @expo/cli`

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

```bash
# Start development server for Android
npm run android
# or
yarn android
```

**Note**: Make sure Android emulator is running or device is connected

#### iOS (macOS only)

```bash
# Start development server for iOS
npm run ios
# or
yarn ios
```

**Note**: Make sure iOS Simulator is available

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

```bash
# Build locally (requires Android Studio setup)
npm run build:android
# or
npx expo run:android --variant release
```

**Note**: For CI/CD builds, use EAS Build:

```bash
# Install EAS CLI
npm install -g eas-cli

# Configure EAS
eas build:configure

# Build APK for testing
eas build --platform android --profile preview

# Build AAB for Play Store
eas build --platform android --profile production
```

### iOS Build (macOS only)

```bash
# Build locally (requires Xcode)
npm run build:ios
# or
npx expo run:ios --configuration Release
```

**Note**: For CI/CD builds, use EAS Build:

```bash
# Build for iOS
eas build --platform ios --profile production
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

1. Build production AAB using local build or EAS Build
2. Upload to Google Play Console
3. Follow Play Store review process

#### iOS (App Store)

1. Build production IPA using local build or EAS Build
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
```

#### Android build issues

```bash
# Clean Android build
cd android && ./gradlew clean && cd ..
```

#### iOS build issues

```bash
# Clean iOS build
cd ios && xcodebuild clean && cd ..
```

#### Web build issues

```bash
# Clear web cache
rm -rf .expo && npm start
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
