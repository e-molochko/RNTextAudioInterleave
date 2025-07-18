import React from "react";

import { View, Text, TouchableOpacity, StyleSheet, Platform, Dimensions } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

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
  onRepeat: () => void;
  hasEnded?: boolean;
  isRepeating?: boolean;
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
  onRepeat,
  hasEnded = false,
  isRepeating = false,
}) => {
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.outerContainer}>
      <View
        style={[
          styles.container,
          Platform.OS === "web" && styles.webContainer,
          { paddingBottom: Math.max(insets.bottom, 20) }, // Use safe area bottom or minimum 20
        ]}
      >
        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: `${progress * 100}%` }]} />
          </View>
          <View style={styles.timeContainer}>
            <Text style={styles.timeText}>{formatTime(currentTime)}</Text>
            <Text style={styles.timeText}>{formatTime(totalDuration)}</Text>
          </View>
        </View>

        <View style={styles.controlsContainer}>
          <TouchableOpacity
            onPress={onRepeat}
            style={[styles.controlButton, isRepeating && styles.repeatButtonActive]}
            testID="repeat-button"
          >
            <Ionicons
              name="repeat"
              size={20}
              color={isRepeating ? Colors.progressBar : Colors.controlButton}
            />
          </TouchableOpacity>

          <View style={styles.mainControls}>
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
    </View>
  );
};

const styles = StyleSheet.create({
  outerContainer: {
    backgroundColor: Colors.white,
    borderTopWidth: 1,
    borderTopColor: Colors.progressBackground,
    width: "100%",
  },
  container: {
    backgroundColor: Colors.white,
    paddingHorizontal: 20,
    paddingTop: 16,
    width: "100%",
    maxWidth: "100%",
  },
  webContainer: {
    maxWidth: Math.min(screenWidth * 0.7, 800), // 70% of screen width, max 800px
    alignSelf: "center",
    width: "100%",
  },

  // Progress bar
  progressContainer: {
    marginBottom: 2,
    width: "100%",
  },
  progressBar: {
    height: 4,
    backgroundColor: Colors.progressBackground,
    borderRadius: 2,
    overflow: "hidden",
    width: "100%",
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
    width: "100%",
  },
  timeText: {
    fontSize: 14,
    color: Colors.timeText,
    fontWeight: "500",
  },

  // Controls
  controlsContainer: {
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
  },
  mainControls: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: Platform.OS === "web" ? 30 : 20,
    width: "100%",
  },
  controlButton: {
    width: 44,
    height: 44,
    justifyContent: "center",
    alignItems: "center",
  },
  repeatButtonActive: {
    backgroundColor: Colors.progressBackground,
    borderRadius: 22,
  },
  playButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: Colors.playButton,
    justifyContent: "center",
    alignItems: "center",
    ...Platform.select({
      web: {
        boxShadow: "0px 2px 4px rgba(0,0,0,0.2)",
      },
      default: {
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 3,
      },
    }),
  },
  playButtonEnded: {
    backgroundColor: Colors.controlButton,
  },
});
