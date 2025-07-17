import React from "react";

import { useLocalSearchParams } from "expo-router";
import { SafeAreaView, ScrollView, Text, View } from "react-native";

import { styles } from "./styles";

const ACTIONS = [
  {
    label: "Play/Pause",
    icon: "play-circle",
  },
  { label: "Rewind", icon: "rewind" },
  { label: "Forward", icon: "forward" },
  { label: "Repeat", icon: "repeat" },
];
export default function Player() {
  const { filename } = useLocalSearchParams<{ filename: string }>();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.header}>Audio Player</Text>

        <Text style={styles.subtitle}>Playing: {filename || "No file selected"}</Text>

        <View style={styles.placeholder}>
          <Text style={styles.fileName}>• {filename}.mp3</Text>
          <Text style={styles.fileName}>• {filename}.json</Text>
        </View>

        <View style={styles.controlsPlaceholder}>
          <Text style={styles.sectionTitle}>Controls Placeholder</Text>
          <View style={styles.controlsList}>
            {ACTIONS.map(action => (
              <Text key={action.label} style={styles.control}>
                • {action.label}
              </Text>
            ))}
          </View>
        </View>

        <View style={styles.transcriptPlaceholder}>
          <Text style={styles.sectionTitle}>Transcript Placeholder</Text>
          <Text style={styles.transcriptText}>
            Synchronized transcript will appear here with highlighting
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
