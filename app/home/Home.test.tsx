import React from "react";

import { fireEvent, render } from "@testing-library/react-native";

import HomeScreen from "./Home";

// Mock the router
const mockPush = jest.fn();

jest.mock("expo-router", () => ({
  useRouter: () => ({
    push: mockPush,
    back: jest.fn(),
  }),
}));

describe("HomeScreen", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders correctly", () => {
    const { getByText } = render(<HomeScreen />);

    expect(getByText("Audio Files")).toBeTruthy();
    expect(getByText("Select an audio file to play with synchronized transcript")).toBeTruthy();
  });

  it("displays audio file list", () => {
    const { getByText } = render(<HomeScreen />);

    // First audio file
    expect(getByText("Example Audio Conversation")).toBeTruthy();
    expect(
      getByText("A conversation between John and Jack with synchronized subtitles")
    ).toBeTruthy();
    expect(getByText("Speakers: John, Jack")).toBeTruthy();
    expect(getByText("Duration: ~15 seconds")).toBeTruthy();

    // Second audio file
    expect(getByText("Quick Chat")).toBeTruthy();
    expect(getByText("A brief conversation between Speaker A and Speaker B")).toBeTruthy();
    expect(getByText("Speakers: Speaker A, Speaker B")).toBeTruthy();
    expect(getByText("Duration: ~6 seconds")).toBeTruthy();
  });

  it("shows file information", () => {
    const { getByText } = render(<HomeScreen />);

    expect(getByText("Files: example_audio.mp3, example_audio.json")).toBeTruthy();
    expect(getByText("Files: example_audio2.mp3, example_audio2.json")).toBeTruthy();
  });

  it("navigates to player screen when file is pressed", () => {
    const { getByText } = render(<HomeScreen />);

    const audioFile = getByText("Example Audio Conversation");
    fireEvent.press(audioFile);

    expect(mockPush).toHaveBeenCalledWith({
      pathname: "/player",
      params: { filename: "example_audio" },
    });
  });

  it("navigates with correct filename for different files", () => {
    const { getByText } = render(<HomeScreen />);

    // Test first file
    const firstAudioFile = getByText("Example Audio Conversation");
    fireEvent.press(firstAudioFile);

    expect(mockPush).toHaveBeenCalledWith({
      pathname: "/player",
      params: { filename: "example_audio" },
    });

    // Clear previous calls
    mockPush.mockClear();

    // Test second file
    const secondAudioFile = getByText("Quick Chat");
    fireEvent.press(secondAudioFile);

    expect(mockPush).toHaveBeenCalledWith({
      pathname: "/player",
      params: { filename: "example_audio2" },
    });
  });
});
