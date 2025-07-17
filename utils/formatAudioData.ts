import { AudioSubtitle, PlaybackPhrase } from "@models/audio";

export const formatAudioData = (audioData: AudioSubtitle) => {
  const phrases: PlaybackPhrase[] = [];
  let cumulativeTime = 0;
  let phraseId = 0;

  const maxPhrases = Math.max(...audioData.speakers.map(s => s.phrases.length));

  for (let i = 0; i < maxPhrases; i++) {
    audioData.speakers.forEach(speaker => {
      if (speaker.phrases[i]) {
        const phrase = speaker.phrases[i];
        const startTime = cumulativeTime;
        const endTime = cumulativeTime + phrase.time;

        phrases.push({
          id: `${phraseId++}`,
          speaker: speaker.name,
          text: phrase.words,
          duration: phrase.time,
          pauseAfter: audioData.pause,
          totalDuration: phrase.time + audioData.pause,
          startTime,
          endTime: endTime + audioData.pause, // Include pause in end time
        });

        cumulativeTime = endTime + audioData.pause;
      }
    });
  }
  return { phrases, cumulativeTime };
};
