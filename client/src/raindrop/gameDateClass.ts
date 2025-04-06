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

  constructor() {
    this.level = 2;
    this.score = 0;
    this.life = 5;
    this.combo = 0;
    this.bomb = 3;
    this.dropSpeed = 100;
    this.wordCount = 0;
    this.startTime = null;
    this.endTime = null;
    this.words = [];
  }

  info(){
    return {
      level: this.level,
      score: this.score,
      life: this.life,
      combo: this.combo,
      bomb: this.bomb,
      dropSpeed: this.dropSpeed,
      wordCount: this.wordCount,
      startTime: this.startTime,
      endTime: this.endTime,
      words: this.words
    };
  }

  getField(field: string) {
    return this[field as keyof GameData];
  }

  setWords(words: string[]) {
    this.words = words;
  }
}


