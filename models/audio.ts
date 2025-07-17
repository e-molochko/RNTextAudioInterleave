export interface AudioPhrase {
  words: string;
  time: number; // Duration in milliseconds of the phrase
}

export interface Speaker {
  name: string;
  phrases: AudioPhrase[];
}

export interface AudioSubtitle {
  pause: number; // Pause duration between phrases in milliseconds
  speakers: Speaker[];
}

export interface MessageData {
  id: string;
  speaker: string;
  text: string;
  duration: number;
  isActive?: boolean;
}

export interface PlaybackPhrase {
  id: string;
  speaker: string;
  text: string;
  duration: number; // Duration of the phrase
  pauseAfter: number; // Pause duration after this phrase
  totalDuration: number; // duration + pauseAfter
  startTime: number; // Cumulative start time in the audio
  endTime: number; // Cumulative end time in the audio
}
