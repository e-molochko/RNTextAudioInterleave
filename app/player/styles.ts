import { Dimensions, StyleSheet, Platform } from "react-native";

import { Colors } from "@constants/Colors";

const { width: screenWidth } = Dimensions.get("window");

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },

  // Chat container
  chatContainer: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  webChatContainer: {
    maxWidth: Math.min(screenWidth * 0.7, 800), // 70% of screen width, max 800px
    alignSelf: "center",
    width: "100%",
  },
  messagesList: {
    paddingVertical: 20,
    paddingBottom: Platform.OS === "ios" ? 34 : 20, // Extra padding for home indicator on iOS
  },

  // Loading state
  loadingText: {
    fontSize: 16,
    color: Colors.black,
    opacity: 0.7,
    textAlign: "center",
    paddingVertical: 20,
  },

  // Controls wrapper
  controlsWrapper: {
    width: "100%",
    backgroundColor: Colors.white,
  },

  // Remove all legacy styles as they're not used anymore
});
