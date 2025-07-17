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
├── assets/               # Audio files and transcripts
└── package.json
```

## Prerequisites

- **Node.js** (v18 or higher)
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
npx expo export --platform web
```

Output will be in `dist/` folder, ready for deployment to any static hosting service.

### Android Build

#### Using EAS Build (Recommended)

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

#### Local Build

```bash
# Build locally (requires Android Studio setup)
npx expo run:android --variant release
```

### iOS Build (macOS only)

#### Using EAS Build (Recommended)

```bash
# Build for iOS
eas build --platform ios --profile production
```

#### Local Build

```bash
# Build locally (requires Xcode)
npx expo run:ios --configuration Release
```

## Deployment

### Web Deployment

#### Vercel

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
npx expo export --platform web
vercel --prod
```

#### Netlify

```bash
# Build
npx expo export --platform web

# Deploy to Netlify (drag & drop dist folder)
# Or use Netlify CLI
npm install -g netlify-cli
netlify deploy --prod --dir dist
```

#### GitHub Pages

```bash
# Build
npx expo export --platform web

# Deploy to gh-pages branch
npm install -g gh-pages
gh-pages -d dist
```

### Mobile App Deployment

#### Android (Google Play Store)

1. Build production AAB using EAS Build
2. Upload to Google Play Console
3. Follow Play Store review process

#### iOS (App Store)

1. Build production IPA using EAS Build
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

```
__tests__/
├── components/        # Component tests
├── screens/          # Screen tests
├── utils/            # Utility function tests
└── __mocks__/        # Mock files
```

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

### Platform-Specific Issues

#### Android

- **USB Debugging**: Enable in Developer Options
- **Device not found**: Check ADB connection with `adb devices`
- **Build fails**: Ensure Android SDK and build tools are installed

#### iOS

- **Simulator not found**: Install iOS Simulator in Xcode
- **Code signing**: Configure Apple Developer account
- **Build fails**: Check Xcode version compatibility

#### Web

- **Audio not playing**: Check browser autoplay policies
- **CORS issues**: Ensure audio files are served correctly

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Run tests and ensure they pass
6. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For issues and questions:

- Create an issue on GitHub
- Check the troubleshooting section
- Review Expo documentation: https://docs.expo.dev/
