import { useState, useEffect, useRef, useCallback, useMemo } from "react";

import {
  useAudioPlayer as useExpoAudioPlayer,
  AudioSource,
  useAudioPlayerStatus,
  useAudioSampleListener,
  AudioSample,
  AUDIO_SAMPLE_UPDATE,
} from "expo-audio";

import { AudioSubtitle, PlaybackPhrase } from "@models/audio";
import { useFocusEffect } from "@react-navigation/native";
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
  const playerStatus = useAudioPlayerStatus(player);

  const [currentPhraseIndex, setCurrentPhraseIndex] = useState<number | null>(null);
  const [hasEnded, setHasEnded] = useState(false);
  const [isRepeating, setIsRepeating] = useState(false);
  const [repeatPhraseIndex, setRepeatPhraseIndex] = useState<number | null>(null);

  // Use state instead of refs for UI updates
  const [phrases, setPhrases] = useState<PlaybackPhrase[]>([]);
  const [calculatedDuration, setCalculatedDuration] = useState(0);

  const positionUpdateInterval = useRef<ReturnType<typeof setInterval> | null>(null);
  const originalPlaybackRate = useRef<number>(1.0);

  useEffect(() => {
    if (!audioData) return;

    const { phrases: newPhrases, cumulativeTime } = formatAudioData(audioData);

    setPhrases(newPhrases);
    setCalculatedDuration(cumulativeTime);
  }, [audioData]);

  // Pause audio when leaving the screen
  useFocusEffect(
    useCallback(() => {
      return () => {
        // This runs when the screen loses focus
        if (playerStatus.playing) {
          player.pause();
        }
      };
    }, [player, playerStatus.playing])
  );
  const handleSample = (sample: AudioSample) => {
    console.log({ sample });
    const { currentTime } = sample;
    const position = currentTime * 1000; // Convert to milliseconds
    updateCurrentPhrase(position);

    // Handle repeat mode - stop at end of current phrase
    if (isRepeating && repeatPhraseIndex !== null) {
      const repeatPhrase = phrases[repeatPhraseIndex];
      const stopTime = repeatPhrase.endTime;
      if (position >= stopTime) {
        pause();
        setIsRepeating(false);
        setRepeatPhraseIndex(null);
        // Reset playback rate to normal
        player.setPlaybackRate?.(originalPlaybackRate.current);
      }
    } else {
      // Check if audio has ended
      const duration = playerStatus.duration ? playerStatus.duration * 1000 : calculatedDuration;
      if (position >= duration && duration > 0) {
        player.pause();
        setHasEnded(true);
      }
    }
  };
  useEffect(() => {
    const subscription = player.addListener(AUDIO_SAMPLE_UPDATE, handleSample);
    return () => subscription.remove();
  }, [phrases, calculatedDuration, hasEnded, playerStatus.playing, isRepeating, repeatPhraseIndex]);

  const updateCurrentPhrase = (position: number) => {
    console.log(position, phrases.length);
    const currentPhrase = phrases.findIndex(
      phrase => position >= phrase.startTime && position < phrase.endTime
    );

    if (currentPhrase !== -1 && currentPhrase !== currentPhraseIndex) {
      setCurrentPhraseIndex(currentPhrase);
    }
  };

  const play = async () => {
    player.play();
    setHasEnded(false);
  };

  const pause = async () => {
    player.pause();
  };

  const stop = async () => {
    player.pause();
    await player.seekTo(0);
    // setIsPlaying(false); // This line is removed as per the edit hint
    // setCurrentTime(0); // This line is removed as per the edit hint
    setCurrentPhraseIndex(0);
    setHasEnded(false);
    setIsRepeating(false);
    setRepeatPhraseIndex(null);
    // Reset playback rate to normal
    player.setPlaybackRate?.(originalPlaybackRate.current);
  };

  const restart = async () => {
    await player.seekTo(0);
    // setCurrentTime(0); // This line is removed as per the edit hint
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
    } else if (playerStatus.playing) {
      await pause();
    } else {
      await play();
    }
  };

  const seekToPhrase = async (phraseIndex: number) => {
    if (phraseIndex >= 0 && phraseIndex < phrases.length) {
      const phrase = phrases[phraseIndex];
      await player.seekTo(phrase.startTime / 1000); // Convert to seconds
      setCurrentPhraseIndex(phraseIndex);
      // setCurrentTime(phrase.startTime); // This line is removed as per the edit hint
      setHasEnded(false);
    }
  };

  const repeatLastPhrase = async () => {
    if (currentPhraseIndex !== null && currentPhraseIndex >= 0) {
      await repeatSpecificPhrase(currentPhraseIndex);
    }
  };

  const repeatSpecificPhrase = async (phraseIndex: number) => {
    if (phraseIndex >= 0 && phraseIndex < phrases.length) {
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
    const nextIndex = Math.min(phrases.length - 1, (currentPhraseIndex || 0) + 1);
    await seekToPhrase(nextIndex);
  };

  const formatTime = (milliseconds: number) => {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  const totalDuration = playerStatus.duration ? playerStatus.duration * 1000 : calculatedDuration;

  // Make progress reactive to player status changes
  const progress = useMemo(() => {
    const currentTimeMs = playerStatus.currentTime * 1000;
    return totalDuration > 0 ? currentTimeMs / totalDuration : 0;
  }, [playerStatus.currentTime, totalDuration]);

  // Check if audio has ended based on current position
  useEffect(() => {
    const currentTimeMs = playerStatus.currentTime * 1000;
    if (totalDuration > 0 && currentTimeMs >= totalDuration && playerStatus.playing) {
      setHasEnded(true);
    } else if (hasEnded && currentTimeMs < totalDuration) {
      setHasEnded(false);
    }
  }, [playerStatus.currentTime, totalDuration, playerStatus.playing, hasEnded]);

  return {
    isPlaying: playerStatus.playing,
    currentPhraseIndex,
    currentTime: playerStatus.currentTime * 1000, // Convert to milliseconds
    totalDuration,
    hasEnded,
    isRepeating,
    phrases,
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
    progress,
  };
};
