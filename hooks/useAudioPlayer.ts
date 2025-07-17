import { useState, useEffect, useRef } from "react";

import { Audio } from "expo-av";

import { AudioSubtitle, PlaybackPhrase } from "@models/audio";
import { formatAudioData } from "@utils/formatAudioData";

// Function to load audio file dynamically
const loadAudioFile = (filename: string) => {
  switch (filename) {
    case "example_audio":
      return require("@assets/example_audio.mp3");
    case "example_audio2":
      return require("@assets/example_audio2.mp3");
    default:
      return require("@assets/example_audio.mp3");
  }
};

export const useAudioPlayer = (audioData: AudioSubtitle | null, filename: string) => {
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState<number | null>(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [totalDuration, setTotalDuration] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasEnded, setHasEnded] = useState(false);

  const playbackPhrases = useRef<PlaybackPhrase[]>([]);
  const positionUpdateInterval = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (!audioData) return;

    const { phrases, cumulativeTime } = formatAudioData(audioData);

    playbackPhrases.current = phrases;
    setTotalDuration(cumulativeTime);
  }, [audioData]);

  // Load audio file
  useEffect(() => {
    const loadAudio = async () => {
      try {
        const audioFile = loadAudioFile(filename);
        const { sound: audioSound } = await Audio.Sound.createAsync(audioFile, {
          shouldPlay: false,
        });
        setSound(audioSound);
        setIsLoaded(true);
      } catch (error) {
        console.error("Error loading audio:", error);
      }
    };

    loadAudio();

    return () => {
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, [filename]);

  const updateCurrentPhrase = (position: number) => {
    const currentPhrase = playbackPhrases.current.findIndex(
      phrase => position >= phrase.startTime && position < phrase.endTime
    );

    if (currentPhrase !== -1 && currentPhrase !== currentPhraseIndex) {
      setCurrentPhraseIndex(currentPhrase);
    }
  };

  // Position tracking
  useEffect(() => {
    if (isPlaying && sound) {
      positionUpdateInterval.current = setInterval(async () => {
        const status = await sound.getStatusAsync();
        if (status.isLoaded) {
          const position = status.positionMillis || 0;
          setCurrentTime(position);
          updateCurrentPhrase(position);

          // Check if audio has ended
          if (status.didJustFinish || position >= totalDuration) {
            setIsPlaying(false);
            setHasEnded(true);
          }
        }
      }, 100);
    } else {
      if (positionUpdateInterval.current) {
        clearInterval(positionUpdateInterval.current);
      }
    }

    return () => {
      if (positionUpdateInterval.current) {
        clearInterval(positionUpdateInterval.current);
      }
    };
  }, [isPlaying, sound, currentPhraseIndex, totalDuration]);

  const play = async () => {
    if (sound && isLoaded) {
      await sound.playAsync();
      setIsPlaying(true);
      setHasEnded(false);
    }
  };

  const pause = async () => {
    if (sound) {
      await sound.pauseAsync();
      setIsPlaying(false);
    }
  };

  const stop = async () => {
    if (sound) {
      await sound.stopAsync();
      setIsPlaying(false);
      setCurrentTime(0);
      setCurrentPhraseIndex(0);
      setHasEnded(false);
    }
  };

  const restart = async () => {
    if (sound) {
      await sound.setPositionAsync(0);
      setCurrentTime(0);
      setCurrentPhraseIndex(0);
      setHasEnded(false);
      await play();
    }
  };

  const togglePlayPause = async () => {
    if (hasEnded) {
      await restart();
    } else if (isPlaying) {
      await pause();
    } else {
      await play();
    }
  };

  const seekToPhrase = async (phraseIndex: number) => {
    if (sound && phraseIndex >= 0 && phraseIndex < playbackPhrases.current.length) {
      const phrase = playbackPhrases.current[phraseIndex];
      await sound.setPositionAsync(phrase.startTime);
      setCurrentPhraseIndex(phraseIndex);
      setCurrentTime(phrase.startTime);
      setHasEnded(false);
    }
  };

  const goToPrevious = async () => {
    const prevIndex = Math.max(0, currentPhraseIndex || 0 - 1);
    await seekToPhrase(prevIndex);
  };

  const goToNext = async () => {
    const nextIndex = Math.min(playbackPhrases.current.length - 1, currentPhraseIndex || 0 + 1);
    await seekToPhrase(nextIndex);
  };

  const formatTime = (milliseconds: number) => {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  return {
    isPlaying,
    currentPhraseIndex,
    currentTime,
    totalDuration,
    hasEnded,
    phrases: playbackPhrases.current,
    togglePlayPause,
    goToPrevious,
    goToNext,
    seekToPhrase,
    play,
    pause,
    stop,
    restart,
    formatTime,
    progress: totalDuration > 0 ? currentTime / totalDuration : 0,
  };
};
