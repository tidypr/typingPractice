export type gameData = {
  level: number;
  score: number;
  life: number;
  combo: number;
  maxCombo: number;
  bomb: number;
  dropSpeed: number;
  wordCount: number;
  startTime: Date | null;
  endTime: Date | null;
  words: string[];
}

export type Raindrop = {
  element: HTMLDivElement;
  word: string;
  y: number;
  type?: string;
}

export type PlayTime = {
  startTime: number;
  endTime: number;
}
