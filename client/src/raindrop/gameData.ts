type TSETTINGS = {
  readonly SPEEDRATIO: number;
  readonly CLEARLEVEL: number;
  readonly LEVELUPWORDS: number;
  readonly PLAINWORDTIME: number;
  readonly ITEMWORDTIME: number;
  readonly MAXLEVEL: number;
  readonly MAXLIFE: number;
  readonly MAXBOMB: number;
}

export const SETTINGS: TSETTINGS = {
  SPEEDRATIO: 0.975,  // 레벨 증가 비율, 최종 80정도.
  CLEARLEVEL: 10,  // 클리어 레벨
  LEVELUPWORDS: 15,  // Level Up 단어 수
  PLAINWORDTIME: 3000,  // 단어 생성 주기: 3초
  ITEMWORDTIME: 15000, // 아이템 단어 생성 주기: 15초
  MAXLEVEL: 10,  // 최대 레벨
  MAXLIFE: 5,  // 최대 생명
  MAXBOMB: 5,  // 최대 폭탄
}

