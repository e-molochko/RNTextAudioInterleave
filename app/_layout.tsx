import { useEffect } from "react";

import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require("@assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    // Set the document title for web
    if (typeof document !== "undefined") {
      document.title = "RNTextAudioInterleave - Audio Player";
    }
  }, []);

  if (!loaded) {
    return null;
  }

  return (
    <SafeAreaProvider style={{ flex: 1, paddingBottom: 20 }}>
      <Stack
        screenOptions={{
          headerShown: true,
        }}
      >
        <Stack.Screen
          name="home/index"
          options={{
            title: "Home",
            headerLeft: () => null,
          }}
        />
        <Stack.Screen
          name="player/index"
          options={{
            title: "Player",
          }}
        />
      </Stack>
      <StatusBar style="auto" />
    </SafeAreaProvider>
  );
}
