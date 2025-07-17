import React from "react";

import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

import { Colors } from "@constants/Colors";
import { Ionicons } from "@expo/vector-icons";

interface MessageProps {
  speaker: string;
  text: string;
  isActive?: boolean;
  isCurrentSpeaker?: boolean;
  isLeftSpeaker?: boolean;
  onRepeat?: () => void;
  index?: number;
}

export const Message: React.FC<MessageProps> = ({
  speaker,
  text,
  isActive = false,
  isLeftSpeaker = false,
  onRepeat,
}) => {
  return (
    <View style={[styles.container, isLeftSpeaker ? styles.leftContainer : styles.rightContainer]}>
      <Text
        style={[
          styles.speakerName,
          isLeftSpeaker ? styles.leftSpeakerName : styles.rightSpeakerName,
          isActive && styles.activeMessageText,
        ]}
      >
        {speaker}
      </Text>
      <View style={[styles.messageRow, !isLeftSpeaker && { flexDirection: "row-reverse" }]}>
        <View
          style={[
            styles.messageContainer,
            isLeftSpeaker ? styles.leftMessage : styles.rightMessage,
            isActive && styles.activeMessage,
          ]}
        >
          <Text style={[styles.messageText, isActive && styles.activeMessageText]}>{text}</Text>
        </View>
        {onRepeat && (
          <TouchableOpacity
            onPress={onRepeat}
            style={[
              styles.repeatButton,
              isLeftSpeaker ? styles.repeatButtonLeft : styles.repeatButtonRight,
            ]}
            testID="message-repeat-button"
          >
            <Ionicons name="repeat" size={16} color={Colors.controlButton} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 4,
    paddingHorizontal: 16,
  },
  leftContainer: {
    alignItems: "flex-start",
  },
  rightContainer: {
    alignItems: "flex-end",
  },
  speakerName: {
    fontSize: 14,
    fontWeight: "600",
    color: Colors.speakerName,
    marginBottom: 4,
  },
  leftSpeakerName: {
    alignSelf: "flex-start",
  },
  rightSpeakerName: {
    alignSelf: "flex-end",
  },
  messageRow: {
    flexDirection: "row",
    alignItems: "center",
    maxWidth: "90%",
  },
  messageContainer: {
    padding: 12,
    borderRadius: 16,
    maxWidth: "85%",
    minWidth: 60,
    flex: 1,
  },
  message: {
    borderWidth: 2,
    borderColor: Colors.transparent,
  },
  leftMessage: {
    backgroundColor: Colors.messageBackground,
    borderBottomLeftRadius: 4,
  },
  rightMessage: {
    backgroundColor: Colors.messageActiveBackground,
    borderBottomRightRadius: 4,
  },
  activeMessage: {
    backgroundColor: Colors.messageActiveBackground,
    borderColor: Colors.progressBar,
  },
  messageText: {
    fontSize: 16,
    lineHeight: 22,
    color: Colors.messageText,
    fontWeight: "400", // Consistent font weight to prevent layout shifts
    minHeight: 22, // Ensure consistent height
  },
  activeMessageText: {
    color: Colors.progressBar,
    fontWeight: "600", // Slightly bolder but not too much to cause shifts
  },
  repeatButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.progressBackground,
    opacity: 0.8,
  },
  repeatButtonLeft: {
    marginLeft: 8,
  },
  repeatButtonRight: {
    marginRight: 8,
  },
});
