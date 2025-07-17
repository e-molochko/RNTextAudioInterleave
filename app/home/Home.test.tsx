import React from "react";

import { fireEvent, render } from "@testing-library/react-native";

import HomeScreen from "./Home";

// Use the global mocks from __mocks__ directory
// Get the mocked functions to track calls
const mockPush = jest.fn();
const mockBack = jest.fn();

// Mock the expo-router module
jest.mock("expo-router", () => ({
  useRouter: () => ({
    push: mockPush,
    back: mockBack,
  }),
  useLocalSearchParams: () => ({
    filename: "test-file",
  }),
}));

describe("HomeScreen", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders correctly", () => {
    const { getByText } = render(<HomeScreen />);

    expect(getByText("Select Audio File")).toBeTruthy();
    expect(getByText("Choose an audio file to play with synchronized transcript")).toBeTruthy();
  });

  it("displays audio file list", () => {
    const { getByText } = render(<HomeScreen />);

    expect(getByText("Sample Audio 1")).toBeTruthy();
    expect(getByText("Sample Audio 2")).toBeTruthy();
    expect(getByText("Sample Audio 3")).toBeTruthy();
  });

  it("shows file information", () => {
    const { getByText } = render(<HomeScreen />);

    expect(getByText("Files: sample1.mp3, sample1.json")).toBeTruthy();
    expect(getByText("Files: sample2.mp3, sample2.json")).toBeTruthy();
    expect(getByText("Files: sample3.mp3, sample3.json")).toBeTruthy();
  });

  it("navigates to player screen when file is pressed", () => {
    const { getByText } = render(<HomeScreen />);

    const firstFile = getByText("Sample Audio 1");
    fireEvent.press(firstFile);

    expect(mockPush).toHaveBeenCalledWith({
      pathname: "/player",
      params: { filename: "sample1" },
    });
  });

  it("navigates with correct filename for each file", () => {
    const { getByText } = render(<HomeScreen />);

    // Test second file
    const secondFile = getByText("Sample Audio 2");
    fireEvent.press(secondFile);

    expect(mockPush).toHaveBeenCalledWith({
      pathname: "/player",
      params: { filename: "sample2" },
    });
  });
});
