import { AudioSubtitle } from "@models/audio";

import { formatAudioData } from "./formatAudioData";

describe("formatAudioData", () => {
  const mockAudioData: AudioSubtitle = {
    pause: 250, // 250ms pause between phrases
    speakers: [
      {
        name: "John",
        phrases: [
          { words: "Hello there.", time: 1000 },
          { words: "How are you?", time: 1200 },
        ],
      },
      {
        name: "Jane",
        phrases: [
          { words: "I'm doing well.", time: 1100 },
          { words: "Thanks for asking.", time: 900 },
        ],
      },
    ],
  };

  it("should format audio data with correct timing and pause handling", () => {
    const result = formatAudioData(mockAudioData);

    expect(result.phrases).toHaveLength(4);
    expect(result.cumulativeTime).toBe(5200); // Total time including pauses

    // First phrase (John)
    expect(result.phrases[0]).toEqual({
      id: "0",
      speaker: "John",
      text: "Hello there.",
      duration: 1000,
      pauseAfter: 250,
      totalDuration: 1250, // duration + pause
      startTime: 0,
      endTime: 1000, // Phrase ends here, pause is after
    });

    // Second phrase (Jane)
    expect(result.phrases[1]).toEqual({
      id: "1",
      speaker: "Jane",
      text: "I'm doing well.",
      duration: 1100,
      pauseAfter: 250,
      totalDuration: 1350,
      startTime: 1250, // Previous phrase end (1000) + pause (250)
      endTime: 2350, // startTime + duration
    });

    // Third phrase (John)
    expect(result.phrases[2]).toEqual({
      id: "2",
      speaker: "John",
      text: "How are you?",
      duration: 1200,
      pauseAfter: 250,
      totalDuration: 1450,
      startTime: 2600, // Previous phrase end (2350) + pause (250)
      endTime: 3800, // startTime + duration
    });

    // Fourth phrase (Jane)
    expect(result.phrases[3]).toEqual({
      id: "3",
      speaker: "Jane",
      text: "Thanks for asking.",
      duration: 900,
      pauseAfter: 250,
      totalDuration: 1150,
      startTime: 4050, // Previous phrase end (3800) + pause (250)
      endTime: 4950, // startTime + duration
    });
  });

  it("should handle different pause durations", () => {
    const audioDataWithDifferentPause: AudioSubtitle = {
      pause: 500, // 500ms pause
      speakers: [
        {
          name: "Speaker1",
          phrases: [{ words: "Test phrase.", time: 1000 }],
        },
      ],
    };

    const result = formatAudioData(audioDataWithDifferentPause);

    expect(result.phrases[0].pauseAfter).toBe(500);
    expect(result.phrases[0].totalDuration).toBe(1500); // 1000 + 500
    expect(result.cumulativeTime).toBe(1500); // 1000 + 500
  });

  it("should handle zero pause duration", () => {
    const audioDataWithNoPause: AudioSubtitle = {
      pause: 0,
      speakers: [
        {
          name: "Speaker1",
          phrases: [{ words: "Test phrase.", time: 1000 }],
        },
      ],
    };

    const result = formatAudioData(audioDataWithNoPause);

    expect(result.phrases[0].pauseAfter).toBe(0);
    expect(result.phrases[0].totalDuration).toBe(1000); // duration only
    expect(result.cumulativeTime).toBe(1000);
  });

  it("should handle speakers with different numbers of phrases", () => {
    const unevenAudioData: AudioSubtitle = {
      pause: 100,
      speakers: [
        {
          name: "Speaker1",
          phrases: [
            { words: "First phrase.", time: 1000 },
            { words: "Second phrase.", time: 800 },
          ],
        },
        {
          name: "Speaker2",
          phrases: [{ words: "Only one phrase.", time: 1200 }],
        },
      ],
    };

    const result = formatAudioData(unevenAudioData);

    expect(result.phrases).toHaveLength(3); // All available phrases
    expect(result.phrases[0].speaker).toBe("Speaker1");
    expect(result.phrases[1].speaker).toBe("Speaker2");
    expect(result.phrases[2].speaker).toBe("Speaker1");
    expect(result.cumulativeTime).toBe(3300); // 1000 + 100 + 1200 + 100 + 800 + 100
  });

  it("should handle single speaker", () => {
    const singleSpeakerData: AudioSubtitle = {
      pause: 200,
      speakers: [
        {
          name: "Solo",
          phrases: [
            { words: "First.", time: 500 },
            { words: "Second.", time: 600 },
            { words: "Third.", time: 400 },
          ],
        },
      ],
    };

    const result = formatAudioData(singleSpeakerData);

    expect(result.phrases).toHaveLength(3);
    expect(result.phrases[0].startTime).toBe(0);
    expect(result.phrases[1].startTime).toBe(700); // 500 + 200
    expect(result.phrases[2].startTime).toBe(1500); // 700 + 600 + 200
    expect(result.cumulativeTime).toBe(2100); // 1500 + 400 + 200
  });

  it("should handle empty phrases array", () => {
    const emptyAudioData: AudioSubtitle = {
      pause: 100,
      speakers: [
        {
          name: "EmptySpeaker",
          phrases: [],
        },
      ],
    };

    const result = formatAudioData(emptyAudioData);

    expect(result.phrases).toHaveLength(0);
    expect(result.cumulativeTime).toBe(0);
  });

  it("should handle multiple speakers with same number of phrases", () => {
    const multiSpeakerData: AudioSubtitle = {
      pause: 150,
      speakers: [
        {
          name: "Alice",
          phrases: [
            { words: "Hi Bob.", time: 800 },
            { words: "How's work?", time: 900 },
          ],
        },
        {
          name: "Bob",
          phrases: [
            { words: "Hi Alice.", time: 700 },
            { words: "It's going well.", time: 1000 },
          ],
        },
        {
          name: "Charlie",
          phrases: [
            { words: "Hello everyone.", time: 600 },
            { words: "Nice to meet you.", time: 800 },
          ],
        },
      ],
    };

    const result = formatAudioData(multiSpeakerData);

    expect(result.phrases).toHaveLength(6);
    expect(result.cumulativeTime).toBe(5700); // Total time with pauses

    // Verify timing sequence - speakers are processed in parallel for each phrase index
    const expectedStartTimes = [0, 950, 1800, 2550, 3600, 4750];
    result.phrases.forEach((phrase, index) => {
      expect(phrase.startTime).toBe(expectedStartTimes[index]);
    });
  });

  it("should ensure endTime does not include pause duration", () => {
    const testData: AudioSubtitle = {
      pause: 300,
      speakers: [
        {
          name: "TestSpeaker",
          phrases: [{ words: "Test phrase.", time: 1000 }],
        },
      ],
    };

    const result = formatAudioData(testData);

    // endTime should be exactly startTime + duration (no pause included)
    expect(result.phrases[0].endTime).toBe(1000);
    expect(result.phrases[0].endTime).toBe(
      result.phrases[0].startTime + result.phrases[0].duration
    );

    // totalDuration should include pause
    expect(result.phrases[0].totalDuration).toBe(1300); // 1000 + 300
  });
});
