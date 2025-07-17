import { useState, useEffect, useRef, useCallback } from "react";

import { useAudioPlayer as useExpoAudioPlayer, AudioSource } from "expo-audio";
import { useFocusEffect } from "expo-router";

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
  const [isRepeating, setIsRepeating] = useState(false);
  const [repeatPhraseIndex, setRepeatPhraseIndex] = useState<number | null>(null);

  const playbackPhrases = useRef<PlaybackPhrase[]>([]);
  const positionUpdateInterval = useRef<ReturnType<typeof setInterval> | null>(null);
  const originalPlaybackRate = useRef<number>(1.0);

  // Stop audio when screen loses focus (navigation back)
  useFocusEffect(
    useCallback(() => {
      return () => {
        if (positionUpdateInterval.current) {
          clearInterval(positionUpdateInterval.current);
        }
        if (stop) {
          stop();
        }
      };
    }, [])
  );

  useEffect(() => {
    if (!audioData) return;

    const { phrases, cumulativeTime } = formatAudioData(audioData);

    playbackPhrases.current = phrases;
    setTotalDuration(cumulativeTime);
  }, [audioData]);

  // Sync with player state
  useEffect(() => {
    setIsPlaying(player.playing);
    setCurrentTime(player.currentTime * 1000);

    if (player.duration) {
      setTotalDuration(player.duration * 1000);
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

  // Position tracking with repeat mode handling
  useEffect(() => {
    if (isPlaying) {
      positionUpdateInterval.current = setInterval(() => {
        const position = player.currentTime * 1000; // Convert to milliseconds
        setCurrentTime(position);
        updateCurrentPhrase(position);

        // Handle repeat mode - stop at end of current phrase
        if (isRepeating && repeatPhraseIndex !== null) {
          const repeatPhrase = playbackPhrases.current[repeatPhraseIndex];
          // Add a small buffer (50ms) to stop slightly before the actual end to avoid overlap
          const stopTime = repeatPhrase.endTime - 50;
          if (position >= stopTime) {
            pause();
            setIsRepeating(false);
            setRepeatPhraseIndex(null);
            // Reset playback rate to normal
            player.setPlaybackRate?.(originalPlaybackRate.current);
          }
        } else {
          // Check if audio has ended
          if (position >= totalDuration && totalDuration > 0) {
            setIsPlaying(false);
            setHasEnded(true);
          }
        }
      }, 50); // Reduced interval for better precision
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
  }, [
    isPlaying,
    player.currentTime,
    currentPhraseIndex,
    totalDuration,
    isRepeating,
    repeatPhraseIndex,
  ]);

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
    setIsRepeating(false);
    setRepeatPhraseIndex(null);
    // Reset playback rate to normal
    player.setPlaybackRate?.(originalPlaybackRate.current);
  };

  const restart = async () => {
    await player.seekTo(0);
    setCurrentTime(0);
    setCurrentPhraseIndex(0);
    setHasEnded(false);
    setIsRepeating(false);
    setRepeatPhraseIndex(null);
    // Reset playback rate to normal
    player.setPlaybackRate?.(originalPlaybackRate.current);
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

  const repeatLastPhrase = async () => {
    if (currentPhraseIndex !== null && currentPhraseIndex >= 0) {
      await repeatSpecificPhrase(currentPhraseIndex);
    }
  };

  const repeatSpecificPhrase = async (phraseIndex: number) => {
    if (phraseIndex >= 0 && phraseIndex < playbackPhrases.current.length) {
      // Stop current playback
      await pause();

      // Set repeat mode
      setIsRepeating(true);
      setRepeatPhraseIndex(phraseIndex);

      // Set slow playback rate (0.75x)
      player.setPlaybackRate?.(0.75);

      // Seek to phrase start
      await seekToPhrase(phraseIndex);

      // Start playing
      await play();
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
    isRepeating,
    phrases: playbackPhrases.current,
    togglePlayPause,
    goToPrevious,
    goToNext,
    seekToPhrase,
    repeatLastPhrase,
    repeatSpecificPhrase,
    play,
    pause,
    stop,
    restart,
    formatTime,
    progress: totalDuration > 0 ? currentTime / totalDuration : 0,
  };
};
