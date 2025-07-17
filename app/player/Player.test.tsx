import React from "react";

import { render } from "@testing-library/react-native";

import Player from "./Player";

// Mock the search params for testing
let mockParams: { filename?: string } = { filename: "example_audio" };

// Mock the expo-router module
jest.mock("expo-router", () => ({
  useRouter: () => ({
    push: jest.fn(),
    back: jest.fn(),
  }),
  useLocalSearchParams: () => mockParams,
}));

// Mock the useAudioPlayer hook
const mockUseAudioPlayer = jest.fn();

jest.mock("@hooks/useAudioPlayer", () => ({
  useAudioPlayer: jest.fn(() => ({
    isPlaying: false,
    currentPhraseIndex: 0,
    currentTime: 83000, // 01:23 in milliseconds
    totalDuration: 360000, // 06:00 in milliseconds
    isLoaded: true,
    hasEnded: false,
    phrases: [
      {
        id: "0",
        speaker: "John",
        text: "this is one phrase.",
        duration: 1474,
        pauseAfter: 250,
        totalDuration: 1724,
        startTime: 0,
        endTime: 1724,
      },
      {
        id: "1",
        speaker: "Jack",
        text: "another speaker here.",
        duration: 1570,
        pauseAfter: 250,
        totalDuration: 1820,
        startTime: 1724,
        endTime: 3544,
      },
      {
        id: "2",
        speaker: "John",
        text: "now the second phrase.",
        duration: 1667,
        pauseAfter: 250,
        totalDuration: 1917,
        startTime: 3544,
        endTime: 5461,
      },
      {
        id: "3",
        speaker: "Jack",
        text: "saying her second phrase.",
        duration: 1989,
        pauseAfter: 250,
        totalDuration: 2239,
        startTime: 5461,
        endTime: 7700,
      },
    ],
    togglePlayPause: jest.fn(),
    goToPrevious: jest.fn(),
    goToNext: jest.fn(),
    formatTime: jest.fn((ms: number) => {
      const minutes = Math.floor(ms / 60000);
      const seconds = Math.floor((ms % 60000) / 1000);
      return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
    }),
    progress: 0.23,
  })),
}));

// Mock the audio data files
jest.mock(
  "@assets/example_audio.json",
  () => ({
    pause: 250,
    speakers: [
      {
        name: "John",
        phrases: [
          { words: "this is one phrase.", time: 1474 },
          { words: "now the second phrase.", time: 1667 },
        ],
      },
      {
        name: "Jack",
        phrases: [
          { words: "another speaker here.", time: 1570 },
          { words: "saying her second phrase.", time: 1989 },
        ],
      },
    ],
  }),
  { virtual: true }
);

jest.mock(
  "@assets/example_audio2.json",
  () => ({
    pause: 500,
    speakers: [
      {
        name: "Speaker A",
        phrases: [
          { words: "Are you almost ready?", time: 1800 },
          { words: "Okay, hurry up!", time: 1500 },
        ],
      },
      {
        name: "Speaker B",
        phrases: [
          { words: "Just about! Let me grab my keys.", time: 4500 },
          { words: "Coming down now!", time: 1100 },
        ],
      },
    ],
  }),
  { virtual: true }
);

describe("Player", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // Reset default params for each test
    mockParams = { filename: "example_audio" };
  });

  it("renders audio player with messages", () => {
    const { getByText } = render(<Player />);

    // Check for John's messages
    expect(getByText("this is one phrase.")).toBeTruthy();
    expect(getByText("now the second phrase.")).toBeTruthy();

    // Check for Jack's messages
    expect(getByText("another speaker here.")).toBeTruthy();
    expect(getByText("saying her second phrase.")).toBeTruthy();
  });

  it("displays speaker names", () => {
    const { getAllByText } = render(<Player />);

    // Use getAllByText since speaker names can appear multiple times
    expect(getAllByText("John").length).toBeGreaterThan(0);
    expect(getAllByText("Jack").length).toBeGreaterThan(0);
  });

  it("shows player controls", () => {
    const { getByTestId } = render(<Player />);

    // Check for control buttons
    expect(getByTestId("play-pause-button")).toBeTruthy();
    expect(getByTestId("previous-button")).toBeTruthy();
    expect(getByTestId("next-button")).toBeTruthy();
  });

  it("displays time information", () => {
    const { getAllByText } = render(<Player />);

    // Check for time display (formatted as MM:SS) - there should be 2 (current and total)
    const timeElements = getAllByText(/\d{2}:\d{2}/);
    expect(timeElements.length).toBe(2);
  });

  it("handles missing filename gracefully", () => {
    // Override the params for this specific test
    mockParams = {};

    const { getByText } = render(<Player />);

    // Should show loading state initially since filename is missing
    expect(getByText("Loading audio...")).toBeTruthy();
  });

  it("calls useAudioPlayer with correct parameters", () => {
    const { useAudioPlayer } = require("@hooks/useAudioPlayer");
    render(<Player />);

    // Check that useAudioPlayer was called with audioData and filename
    expect(useAudioPlayer).toHaveBeenCalledWith(
      expect.objectContaining({
        pause: 250,
        speakers: expect.any(Array),
      }),
      "example_audio"
    );
  });

  it("loads different audio file based on filename", () => {
    const { useAudioPlayer } = require("@hooks/useAudioPlayer");
    // Test with second audio file
    mockParams = { filename: "example_audio2" };

    render(<Player />);

    // Should call useAudioPlayer with the second audio file data
    expect(useAudioPlayer).toHaveBeenCalledWith(
      expect.objectContaining({
        pause: 500,
        speakers: expect.arrayContaining([
          expect.objectContaining({
            name: "Speaker A",
          }),
          expect.objectContaining({
            name: "Speaker B",
          }),
        ]),
      }),
      "example_audio2"
    );
  });

  it("defaults to example_audio for unknown filename", () => {
    const { useAudioPlayer } = require("@hooks/useAudioPlayer");
    mockParams = { filename: "unknown_file" };

    render(<Player />);

    // Should call useAudioPlayer with default audio data
    expect(useAudioPlayer).toHaveBeenCalledWith(
      expect.objectContaining({
        pause: 250,
        speakers: expect.any(Array),
      }),
      "unknown_file"
    );
  });
});
