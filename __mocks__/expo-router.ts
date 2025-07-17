export const useRouter = () => ({
  push: jest.fn(),
  back: jest.fn(),
});

export const useLocalSearchParams = () => ({
  filename: "test-file",
});

export const useFocusEffect = jest.fn(callback => {
  // Mock implementation that calls the cleanup function when component unmounts
  return callback();
});

export const router = {
  navigate: jest.fn(),
  push: jest.fn(),
  back: jest.fn(),
};
