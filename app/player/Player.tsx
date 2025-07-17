import React, { useEffect, useRef, useState } from "react";

import { useLocalSearchParams, useFocusEffect } from "expo-router";
import { SafeAreaView, Text, View, FlatList, Platform } from "react-native";

import { AudioControls } from "@components/AudioControls";
import { Message } from "@components/Message";
import { useAudioPlayer } from "@hooks/useAudioPlayer";
import { AudioSubtitle } from "@models/audio";

import { styles } from "./styles";

// Function to load audio data dynamically
const loadAudioData = (filename: string): AudioSubtitle => {
  switch (filename) {
    case "example_audio":
      return require("@assets/example_audio.json");
    case "example_audio2":
      return require("@assets/example_audio2.json");
    default:
      return require("@assets/example_audio.json");
  }
};

export default function Player() {
  const { filename } = useLocalSearchParams<{ filename: string }>();
  const flatListRef = useRef<FlatList>(null);
  const [audioData, setAudioData] = useState<AudioSubtitle | null>(null);

  // Load audio data when filename changes
  useEffect(() => {
    if (filename) {
      const data = loadAudioData(filename);
      setAudioData(data);
    }
  }, [filename]);

  const {
    isPlaying,
    currentPhraseIndex,
    currentTime,
    totalDuration,
    hasEnded,
    isRepeating,
    phrases,
    togglePlayPause,
    goToPrevious,
    goToNext,
    repeatLastPhrase,
    repeatSpecificPhrase,
    formatTime,
    progress,
  } = useAudioPlayer(audioData, filename || "example_audio");

  // Auto-scroll to current phrase
  useEffect(() => {
    if (flatListRef.current && phrases.length > 0 && currentPhraseIndex !== null) {
      flatListRef.current.scrollToIndex({
        index: currentPhraseIndex,
        animated: true,
        viewPosition: 0.5, // Center the item
      });
    }
  }, [currentPhraseIndex, phrases.length]);

  const handleRepeatMessage = (index: number) => {
    repeatSpecificPhrase(index);
  };

  const renderMessage = ({ item, index }: { item: any; index: number }) => {
    const isActive = index === currentPhraseIndex;
    const onRepeat = () => handleRepeatMessage(index);
    return (
      <Message
        isLeftSpeaker={index % 2 === 0}
        speaker={item.speaker}
        text={item.text}
        isActive={isActive}
        onRepeat={onRepeat}
        index={index}
      />
    );
  };

  // Don't render until audio data is loaded
  if (!audioData) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.loadingText}>Loading audio...</Text>
        </View>
      </SafeAreaView>
    );
  }

  const onScrollToIndexFailed = (info: { index: number }) => {
    const t = setTimeout(() => {
      if (flatListRef.current) {
        flatListRef.current.scrollToIndex({
          index: Math.min(info.index, phrases.length - 1),
          animated: true,
          viewPosition: 0.5,
        });
      }
      clearTimeout(t);
    }, 100);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={[styles.chatContainer, Platform.OS === "web" && styles.webChatContainer]}>
        <FlatList
          ref={flatListRef}
          data={phrases}
          renderItem={renderMessage}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.messagesList}
          onScrollToIndexFailed={onScrollToIndexFailed}
        />
      </View>

      <View style={styles.controlsWrapper}>
        <AudioControls
          isPlaying={isPlaying}
          currentTime={currentTime}
          totalDuration={totalDuration}
          progress={progress}
          formatTime={formatTime}
          onPlayPause={togglePlayPause}
          onPrevious={goToPrevious}
          onNext={goToNext}
          onRepeat={repeatLastPhrase}
          hasEnded={hasEnded}
          isRepeating={isRepeating}
        />
      </View>
    </SafeAreaView>
  );
}
