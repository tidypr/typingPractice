import type { PlayTime } from "../type.d.ts";

// 점수 계산
export const calScore = (level: number, length: number, combo: number) => {
  const baseScore = 50;
  const lengthScore = length * 10;
  const levelScore = level * 0.5 + 1;

  const tempScore =
    (baseScore + lengthScore) * levelScore + combo * 20;

  return tempScore;
};


// playTime 계산
export const calPlayTime = (gameData: PlayTime) => {
  const timeDiff = gameData.endTime - gameData.startTime;
  const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

  return `${minutes}분 ${seconds}초`;
};