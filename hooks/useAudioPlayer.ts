import { useState, useEffect, useRef } from "react";

import { useAudioPlayer as useExpoAudioPlayer, AudioSource } from "expo-audio";

import { AudioSubtitle, PlaybackPhrase } from "@models/audio";
import { formatAudioData } from "@utils/formatAudioData";

// Function to load audio file dynamically
const loadAudioFile = (filename: string): AudioSource => {
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
  const audioSource = loadAudioFile(filename);
  const player = useExpoAudioPlayer(audioSource);

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState<number | null>(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [totalDuration, setTotalDuration] = useState(0);
  const [hasEnded, setHasEnded] = useState(false);

  const playbackPhrases = useRef<PlaybackPhrase[]>([]);
  const positionUpdateInterval = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (!audioData) return;

    const { phrases, cumulativeTime } = formatAudioData(audioData);

    playbackPhrases.current = phrases;
    setTotalDuration(cumulativeTime);
  }, [audioData]);

  // Sync with player state
  useEffect(() => {
    setIsPlaying(player.playing);
    setCurrentTime(player.currentTime * 1000); // Convert to milliseconds

    if (player.duration) {
      setTotalDuration(player.duration * 1000); // Convert to milliseconds
    }
  }, [player.playing, player.currentTime, player.duration]);

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
    if (isPlaying) {
      positionUpdateInterval.current = setInterval(() => {
        const position = player.currentTime * 1000; // Convert to milliseconds
        setCurrentTime(position);
        updateCurrentPhrase(position);

        // Check if audio has ended
        if (position >= totalDuration && totalDuration > 0) {
          setIsPlaying(false);
          setHasEnded(true);
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
  }, [isPlaying, player.currentTime, currentPhraseIndex, totalDuration]);

  const play = async () => {
    player.play();
    setIsPlaying(true);
    setHasEnded(false);
  };

  const pause = async () => {
    player.pause();
    setIsPlaying(false);
  };

  const stop = async () => {
    player.pause();
    await player.seekTo(0);
    setIsPlaying(false);
    setCurrentTime(0);
    setCurrentPhraseIndex(0);
    setHasEnded(false);
  };

  const restart = async () => {
    await player.seekTo(0);
    setCurrentTime(0);
    setCurrentPhraseIndex(0);
    setHasEnded(false);
    await play();
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
    if (phraseIndex >= 0 && phraseIndex < playbackPhrases.current.length) {
      const phrase = playbackPhrases.current[phraseIndex];
      await player.seekTo(phrase.startTime / 1000); // Convert to seconds
      setCurrentPhraseIndex(phraseIndex);
      setCurrentTime(phrase.startTime);
      setHasEnded(false);
    }
  };

  const goToPrevious = async () => {
    const prevIndex = Math.max(0, (currentPhraseIndex || 0) - 1);
    await seekToPhrase(prevIndex);
  };

  const goToNext = async () => {
    const nextIndex = Math.min(playbackPhrases.current.length - 1, (currentPhraseIndex || 0) + 1);
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
