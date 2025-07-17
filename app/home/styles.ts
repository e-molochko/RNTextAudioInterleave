import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  content: {
    flex: 1,
    padding: 20,
  },
  header: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 8,
    textAlign: "center",
    color: "#11181C",
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 24,
    textAlign: "center",
    opacity: 0.7,
    color: "#11181C",
  },
  list: {
    flex: 1,
  },
  fileItem: {
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    boxShadow: "0px 2px 4px rgba(0,0,0,0.1)",
    elevation: 3,
  },
  fileContent: {
    gap: 8,
  },
  fileTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#11181C",
  },
  fileDescription: {
    fontSize: 14,
    opacity: 0.8,
    color: "#11181C",
  },
  fileSpeakers: {
    fontSize: 13,
    fontWeight: "500",
    color: "#666666",
  },
  fileDuration: {
    fontSize: 13,
    fontWeight: "500",
    color: "#666666",
  },
  fileName: {
    fontSize: 12,
    fontFamily: "SpaceMono",
    opacity: 0.6,
    color: "#11181C",
  },
  card: {
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    alignItems: "center",
    boxShadow: "0px 2px 4px rgba(0,0,0,0.1)",
    elevation: 3,
  },
});
