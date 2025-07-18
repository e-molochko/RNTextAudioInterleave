import { useState, useEffect, useRef, useCallback, useMemo } from "react";

import {
  useAudioPlayer as useExpoAudioPlayer,
  AudioSource,
  useAudioPlayerStatus,
  useAudioSampleListener,
  AudioSample,
  AUDIO_SAMPLE_UPDATE,
  PLAYBACK_STATUS_UPDATE,
  AudioStatus,
  AudioPlayer,
  createAudioPlayer,
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
  // const player = useExpoAudioPlayer(audioSource);
  const playerRef = useRef<AudioPlayer>(createAudioPlayer(audioSource));
  const playerStatus = useAudioPlayerStatus(playerRef.current);

  const [currentPhraseIndex, setCurrentPhraseIndex] = useState<number | null>(null);
  const [hasEnded, setHasEnded] = useState(false);
  const [isRepeating, setIsRepeating] = useState(false);
  const [repeatPhraseIndex, setRepeatPhraseIndex] = useState<number | null>(null);

  // Use state instead of refs for UI updates
  const [phrases, setPhrases] = useState<PlaybackPhrase[]>([]);
  const [calculatedDuration, setCalculatedDuration] = useState(0);

  const originalPlaybackRate = useRef<number>(1.0);
  const playbackListenerRef = useRef<ReturnType<typeof playerRef.current.addListener> | null>(null);

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
        playerRef.current.pause();
        playerRef.current.remove();
        if (playbackListenerRef.current) {
          playbackListenerRef.current.remove();
        }
      };
    }, [])
  );
  const handleSample = (status: AudioStatus) => {
    if (!status.playing) return;
    const { currentTime } = status;
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
        playerRef.current.setPlaybackRate?.(originalPlaybackRate.current);
      }
    } else {
      // Check if audio has ended
      const duration = status.duration ? status.duration * 1000 : calculatedDuration;
      if (position >= duration && duration > 0) {
        playerRef.current.pause();
        setHasEnded(true);
      }
    }
  };
  useEffect(() => {
    playbackListenerRef.current = playerRef.current.addListener(
      PLAYBACK_STATUS_UPDATE,
      handleSample
    );
    return () => {
      if (playbackListenerRef.current) {
        playbackListenerRef.current.remove();
      }
    };
  }, [phrases, calculatedDuration, hasEnded, playerStatus.playing, isRepeating, repeatPhraseIndex]);

  const updateCurrentPhrase = (position: number) => {
    const currentPhrase = phrases.findIndex(
      phrase => position >= phrase.startTime && position < phrase.endTime
    );

    if (currentPhrase !== -1 && currentPhrase !== currentPhraseIndex) {
      setCurrentPhraseIndex(currentPhrase);
    }
  };

  const play = async () => {
    playerRef.current.play();
    setHasEnded(false);
  };

  const pause = async () => {
    playerRef.current.pause();
  };

  const stop = async () => {
    playerRef.current.pause();
    await playerRef.current.seekTo(0);
    setCurrentPhraseIndex(0);
    setHasEnded(false);
    setIsRepeating(false);
    setRepeatPhraseIndex(null);
    // Reset playback rate to normal
    playerRef.current.setPlaybackRate?.(originalPlaybackRate.current);
  };

  const restart = async () => {
    await playerRef.current.seekTo(0);
    setCurrentPhraseIndex(0);
    setHasEnded(false);
    setIsRepeating(false);
    setRepeatPhraseIndex(null);
    // Reset playback rate to normal
    playerRef.current.setPlaybackRate?.(originalPlaybackRate.current);
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
      await playerRef.current.seekTo(phrase.startTime / 1000); // Convert to seconds
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
      playerRef.current.setPlaybackRate?.(0.75);

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
