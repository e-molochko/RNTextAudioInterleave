import React from "react";

import { View, Text, StyleSheet } from "react-native";

import { Colors } from "@constants/Colors";

interface MessageProps {
  speaker: string;
  text: string;
  isActive?: boolean;
  isCurrentSpeaker?: boolean;
  isLeftSpeaker?: boolean;
}

export const Message: React.FC<MessageProps> = ({
  speaker,
  text,
  isActive = false,
  isLeftSpeaker = false,
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
      <View
        style={[
          styles.messageContainer,
          isLeftSpeaker ? styles.leftMessage : styles.rightMessage,
          isActive && styles.activeMessage,
        ]}
      >
        <Text style={[styles.messageText, isActive && styles.activeMessageText]}>{text}</Text>
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
  messageContainer: {
    padding: 12,
    borderRadius: 16,
    maxWidth: "80%",
    minWidth: 60,
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
  },
  activeMessageText: {
    color: Colors.progressBar,
    fontWeight: "500",
  },
});
