export const useRouter = () => ({
  push: jest.fn(),
  back: jest.fn(),
});

export const useLocalSearchParams = () => ({
  filename: "test-file",
});
