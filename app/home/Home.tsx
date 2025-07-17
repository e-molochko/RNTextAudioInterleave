import React from "react";

import { useRouter } from "expo-router";
import { FlatList, SafeAreaView, Text, TouchableOpacity, View } from "react-native";

import { styles } from "./styles";

// Available audio files - based on actual files in assets folder
const audioFiles = [
  {
    id: "1",
    filename: "example_audio",
    title: "Example Audio Conversation",
    description: "A conversation between John and Jack with synchronized subtitles",
    speakers: ["John", "Jack"],
    duration: "~15 seconds",
  },
  {
    id: "2",
    filename: "example_audio2",
    title: "Quick Chat",
    description: "A brief conversation between Speaker A and Speaker B",
    speakers: ["Speaker A", "Speaker B"],
    duration: "~11 seconds",
  },
];

export default function HomeScreen() {
  const router = useRouter();

  const handleFilePress = (filename: string) => {
    router.navigate({
      pathname: "/player",
      params: { filename },
    });
  };

  const renderAudioFile = ({ item }: { item: (typeof audioFiles)[0] }) => (
    <TouchableOpacity style={styles.fileItem} onPress={() => handleFilePress(item.filename)}>
      <View style={styles.fileContent}>
        <Text style={styles.fileTitle}>{item.title}</Text>
        <Text style={styles.fileDescription}>{item.description}</Text>
        <Text style={styles.fileSpeakers}>Speakers: {item.speakers.join(", ")}</Text>
        <Text style={styles.fileDuration}>Duration: {item.duration}</Text>
        <Text style={styles.fileName}>
          Files: {item.filename}.mp3, {item.filename}.json
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.header}>Audio Files</Text>
        <Text style={styles.subtitle}>
          Select an audio file to play with synchronized transcript
        </Text>

        <FlatList
          data={audioFiles}
          renderItem={renderAudioFile}
          keyExtractor={item => item.id}
          style={styles.list}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </SafeAreaView>
  );
}
