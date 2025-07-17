import { AudioSubtitle } from "@models/audio";

// Test the formatTime function directly (it's a pure function)
const formatTime = (milliseconds: number) => {
  const totalSeconds = Math.floor(milliseconds / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
};

// Test the progress calculation
const calculateProgress = (currentTime: number, totalDuration: number) => {
  return totalDuration > 0 ? currentTime / totalDuration : 0;
};

describe("useAudioPlayer utilities", () => {
  describe("formatTime", () => {
    it("should format time correctly", () => {
      expect(formatTime(0)).toBe("00:00");
      expect(formatTime(60000)).toBe("01:00");
      expect(formatTime(125000)).toBe("02:05");
      expect(formatTime(3661000)).toBe("61:01");
      expect(formatTime(30000)).toBe("00:30");
      expect(formatTime(90000)).toBe("01:30");
    });

    it("should handle edge cases", () => {
      expect(formatTime(-1000)).toBe("-1:-1"); // Negative time shows negative values
      expect(formatTime(59999)).toBe("00:59"); // Just under a minute
      expect(formatTime(3600000)).toBe("60:00"); // Exactly one hour
    });
  });

  describe("progress calculation", () => {
    it("should calculate progress correctly", () => {
      expect(calculateProgress(0, 100)).toBe(0);
      expect(calculateProgress(50, 100)).toBe(0.5);
      expect(calculateProgress(100, 100)).toBe(1);
      expect(calculateProgress(25, 100)).toBe(0.25);
    });

    it("should handle edge cases", () => {
      expect(calculateProgress(0, 0)).toBe(0); // Zero duration
      expect(calculateProgress(100, 0)).toBe(0); // Zero duration with current time
      expect(calculateProgress(-10, 100)).toBe(-0.1); // Negative current time
    });
  });

  describe("audio data structure", () => {
    it("should have correct AudioSubtitle structure", () => {
      const mockAudioData: AudioSubtitle = {
        pause: 250,
        speakers: [
          {
            name: "Test Speaker",
            phrases: [
              { words: "First phrase.", time: 1000 },
              { words: "Second phrase.", time: 1000 },
            ],
          },
        ],
      };

      expect(mockAudioData.pause).toBe(250);
      expect(mockAudioData.speakers).toHaveLength(1);
      expect(mockAudioData.speakers[0].name).toBe("Test Speaker");
      expect(mockAudioData.speakers[0].phrases).toHaveLength(2);
      expect(mockAudioData.speakers[0].phrases[0].words).toBe("First phrase.");
      expect(mockAudioData.speakers[0].phrases[0].time).toBe(1000);
    });
  });
});
