import React from "react";

import { render } from "@testing-library/react-native";

import Player from "./Player";

// Mock the search params for testing
let mockParams: { filename?: string } = { filename: "test-audio" };

// Mock the expo-router module
jest.mock("expo-router", () => ({
  useRouter: () => ({
    push: jest.fn(),
    back: jest.fn(),
  }),
  useLocalSearchParams: () => mockParams,
}));

describe("Player", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // Reset default params for each test
    mockParams = { filename: "test-audio" };
  });

  it("renders correctly", () => {
    const { getByText } = render(<Player />);

    expect(getByText("Audio Player")).toBeTruthy();
  });

  it("displays filename from params", () => {
    const { getByText } = render(<Player />);

    expect(getByText("Playing: test-audio")).toBeTruthy();
  });

  it("shows file information", () => {
    const { getByText } = render(<Player />);

    expect(getByText("• test-audio.mp3")).toBeTruthy();
    expect(getByText("• test-audio.json")).toBeTruthy();
  });

  it("displays placeholder sections", () => {
    const { getByText } = render(<Player />);

    expect(getByText("Controls Placeholder")).toBeTruthy();
    expect(getByText("Transcript Placeholder")).toBeTruthy();
  });

  it("shows control buttons list", () => {
    const { getByText } = render(<Player />);

    expect(getByText(/Play\/Pause/)).toBeTruthy();
    expect(getByText(/Rewind/)).toBeTruthy();
    expect(getByText(/Forward/)).toBeTruthy();
    expect(getByText(/Repeat/)).toBeTruthy();
  });

  it("handles missing filename gracefully", () => {
    // Override the params for this specific test
    mockParams = {};

    const { getByText } = render(<Player />);

    expect(getByText("Playing: No file selected")).toBeTruthy();
  });
});
