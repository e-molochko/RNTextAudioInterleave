import { Dimensions, StyleSheet } from "react-native";

import { Colors } from "@constants/Colors";

const { width: screenWidth } = Dimensions.get("window");

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },

  // Loading state
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    fontSize: 16,
    color: Colors.black,
    opacity: 0.7,
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
    paddingBottom: 100, // Extra space for player controls
  },

  // Controls wrapper
  controlsWrapper: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },

  // Legacy styles (kept for backward compatibility)
  messagesContainer: {
    flex: 1,
    backgroundColor: Colors.white,
  },

  // Player controls
  playerControls: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: Colors.white,
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 34, // Extra padding for home indicator
    borderTopWidth: 1,
    borderTopColor: Colors.progressBackground,
  },

  // Progress bar
  progressContainer: {
    marginBottom: 12,
  },
  progressBar: {
    height: 4,
    backgroundColor: Colors.progressBackground,
    borderRadius: 2,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    backgroundColor: Colors.progressBar,
    borderRadius: 2,
  },

  // Time display
  timeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  timeText: {
    fontSize: 14,
    color: Colors.timeText,
    fontWeight: "500",
  },

  // Controls
  controlsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 40,
  },
  controlButton: {
    width: 44,
    height: 44,
    justifyContent: "center",
    alignItems: "center",
  },
  playButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: Colors.playButton,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },

  // Legacy styles (can be removed later)
  content: {
    padding: 20,
    minHeight: Dimensions.get("window").height - 100,
  },
  header: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 8,
    textAlign: "center",
    color: Colors.black,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 24,
    textAlign: "center",
    opacity: 0.7,
    color: Colors.black,
  },
  placeholder: {
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    alignItems: "center",
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  placeholderIcon: {
    fontSize: 20,
    fontWeight: "bold",
    color: Colors.black,
  },
  placeholderText: {
    marginTop: 8,
    textAlign: "center",
    opacity: 0.6,
    color: Colors.black,
  },
  fileInfo: {
    marginTop: 16,
    fontWeight: "600",
    color: Colors.black,
  },
  fileName: {
    fontFamily: "SpaceMono",
    fontSize: 12,
    opacity: 0.8,
    marginTop: 4,
    color: Colors.black,
  },
  controlsPlaceholder: {
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: Colors.black,
  },
  controlsList: {
    gap: 4,
  },
  control: {
    opacity: 0.7,
    color: Colors.black,
  },
  transcriptPlaceholder: {
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: 20,
    flex: 1,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  transcriptText: {
    marginTop: 8,
    opacity: 0.7,
    lineHeight: 20,
    color: Colors.black,
  },
});
