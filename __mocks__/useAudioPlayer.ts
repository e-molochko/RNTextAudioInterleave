export const useAudioPlayer = jest.fn(() => ({
  isPlaying: false,
  currentPhraseIndex: 0,
  currentTime: 83000, // 01:23 in milliseconds
  totalDuration: 360000, // 06:00 in milliseconds
  isLoaded: true,
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
  seekToPhrase: jest.fn(),
  formatTime: jest.fn(ms => {
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  }),
  progress: 0.23,
}));
