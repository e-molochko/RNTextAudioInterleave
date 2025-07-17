import { Dimensions, StyleSheet } from "react-native";

import { Colors } from "@/constants/Colors";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
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
