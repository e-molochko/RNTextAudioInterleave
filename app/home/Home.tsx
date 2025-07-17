import React from "react";

import { useRouter } from "expo-router";
import { FlatList, SafeAreaView, Text, TouchableOpacity, View } from "react-native";

import { styles } from "./styles";

// Sample audio files - in production, this would be dynamically loaded
const audioFiles = [
  {
    id: "1",
    filename: "sample1",
    title: "Sample Audio 1",
    description: "First audio file with transcript",
  },
  {
    id: "2",
    filename: "sample2",
    title: "Sample Audio 2",
    description: "Second audio file with transcript",
  },
  {
    id: "3",
    filename: "sample3",
    title: "Sample Audio 3",
    description: "Third audio file with transcript",
  },
];

export default function HomeScreen() {
  const router = useRouter();

  const handleFilePress = (filename: string) => {
    router.push({
      pathname: "/player",
      params: { filename },
    });
  };

  const renderAudioFile = ({ item }: { item: (typeof audioFiles)[0] }) => (
    <TouchableOpacity style={styles.fileItem} onPress={() => handleFilePress(item.filename)}>
      <View style={styles.fileContent}>
        <Text style={styles.fileTitle}>{item.title}</Text>
        <Text style={styles.fileDescription}>{item.description}</Text>
        <Text style={styles.fileName}>
          Files: {item.filename}.mp3, {item.filename}.json
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.header}>Select Audio File</Text>
        <Text style={styles.subtitle}>
          Choose an audio file to play with synchronized transcript
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
