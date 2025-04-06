export class GameData {
  private level: number = 2;
  private score: number = 0;
  private life: number = 5;
  private combo: number = 0;
  private bomb: number = 3;
  private dropSpeed: number = 100;
  private wordCount: number = 0;
  private startTime: Date | null = null;
  private endTime: Date | null = null;
  private words: string[] = [];

  constructor() { }

  getField(field: string) {
    return this[field as keyof GameData];
  }

  setWords(words: string[]) {
    this.words = words;
  }
}


