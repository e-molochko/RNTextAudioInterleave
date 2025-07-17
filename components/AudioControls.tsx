import React from "react";

import { View, Text, TouchableOpacity, StyleSheet, Platform, Dimensions } from "react-native";

import { Colors } from "@constants/Colors";
import { Ionicons } from "@expo/vector-icons";

const { width: screenWidth } = Dimensions.get("window");

interface AudioControlsProps {
  isPlaying: boolean;
  currentTime: number;
  totalDuration: number;
  progress: number;
  formatTime: (milliseconds: number) => string;
  onPlayPause: () => void;
  onPrevious: () => void;
  onNext: () => void;
  hasEnded?: boolean;
}

export const AudioControls: React.FC<AudioControlsProps> = ({
  isPlaying,
  currentTime,
  totalDuration,
  progress,
  formatTime,
  onPlayPause,
  onPrevious,
  onNext,
  hasEnded = false,
}) => {
  return (
    <View style={styles.outerContainer}>
      <View style={[styles.container, Platform.OS === "web" && styles.webContainer]}>
        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: `${progress * 100}%` }]} />
          </View>
        </View>

        <View style={styles.timeContainer}>
          <Text style={styles.timeText}>{formatTime(currentTime)}</Text>
          <Text style={styles.timeText}>{formatTime(totalDuration)}</Text>
        </View>

        <View style={styles.controlsContainer}>
          <TouchableOpacity
            onPress={onPrevious}
            style={styles.controlButton}
            testID="previous-button"
          >
            <Ionicons name="play-skip-back" size={24} color={Colors.controlButton} />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={onPlayPause}
            style={[styles.playButton, hasEnded && styles.playButtonEnded]}
            testID="play-pause-button"
          >
            <Ionicons
              name={hasEnded ? "refresh" : isPlaying ? "pause" : "play"}
              size={hasEnded ? 28 : 24}
              color={Colors.white}
            />
          </TouchableOpacity>

          <TouchableOpacity onPress={onNext} style={styles.controlButton} testID="next-button">
            <Ionicons name="play-skip-forward" size={24} color={Colors.controlButton} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  outerContainer: {
    backgroundColor: Colors.white,
    borderTopWidth: 1,
    borderTopColor: Colors.progressBackground,
  },
  container: {
    backgroundColor: Colors.white,
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 34, // Extra padding for home indicator
  },
  webContainer: {
    maxWidth: Math.min(screenWidth * 0.7, 800), // 70% of screen width, max 800px
    alignSelf: "center",
    width: "100%",
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
  playButtonEnded: {
    backgroundColor: Colors.controlButton,
  },
});
