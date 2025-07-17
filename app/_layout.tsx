import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { TouchableOpacity } from "react-native";
import "react-native-reanimated";

import { Ionicons } from "@expo/vector-icons";

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require("@assets/fonts/SpaceMono-Regular.ttf"),
  });

  if (!loaded) {
    return null;
  }

  return (
    <>
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
            headerLeft: () => (
              <TouchableOpacity
                onPress={() => router.navigate("/home")}
                style={{ marginHorizontal: 10, marginVertical: 3 }}
              >
                <Ionicons name="arrow-back" size={24} color="#111" />
              </TouchableOpacity>
            ),
          }}
        />
        <Stack.Screen
          name="+not-found"
          options={{
            title: "Not Found",
            headerShown: true,
          }}
        />
      </Stack>
      <StatusBar style="auto" />
    </>
  );
}
