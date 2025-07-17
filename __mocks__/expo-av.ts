export const Audio = {
  requestPermissionsAsync: jest.fn(() => Promise.resolve({ status: "granted" })),
  setAudioModeAsync: jest.fn(() => Promise.resolve()),
  Sound: {
    createAsync: jest.fn(() =>
      Promise.resolve({
        sound: {
          playAsync: jest.fn(),
          pauseAsync: jest.fn(),
          setPositionAsync: jest.fn(),
          setRateAsync: jest.fn(),
          unloadAsync: jest.fn(),
        },
      })
    ),
  },
};
