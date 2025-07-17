export const Audio = {
  Sound: {
    createAsync: jest.fn(() =>
      Promise.resolve({
        sound: {
          playAsync: jest.fn(),
          pauseAsync: jest.fn(),
          setPositionAsync: jest.fn(),
          getStatusAsync: jest.fn(() =>
            Promise.resolve({
              isLoaded: true,
              positionMillis: 0,
            })
          ),
          unloadAsync: jest.fn(),
        },
      })
    ),
  },
};
