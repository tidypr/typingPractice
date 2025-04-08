type TSETTINGS = {
  readonly SPEEDRATIO: number;
  readonly CLEARLEVEL: number;
  readonly LEVELUPWORDS: number;
  readonly PLAINWORDTIME: number;
  readonly ITEMWORDTIME: number;
  readonly MAXLEVEL: number;
  readonly MAXLIFE: number;
  readonly MAXBOMB: number;
};

class Settings implements TSETTINGS {
  public readonly SPEEDRATIO = 0.975;    // 레벨 증가 비율, 최종 80정도.
  public readonly CLEARLEVEL = 10;       // 클리어 레벨
  public readonly LEVELUPWORDS = 15;     // Level Up 단어 수
  public readonly PLAINWORDTIME = 2500;  // 단어 생성 주기: 3초
  public readonly ITEMWORDTIME = 17000;  // 아이템 단어 생성 주기: 15초
  public readonly MAXLEVEL = 10;         // 최대 레벨
  public readonly MAXLIFE = 5;           // 최대 생명
  public readonly MAXBOMB = 5;           // 최대 폭탄

  private static instance: Settings;

  private constructor() { }

  public static getInstance(): Settings {
    if (!Settings.instance) {
      Settings.instance = new Settings();
    }
    return Settings.instance;
  }
}

const SETTINGS = Settings.getInstance();
console.log(SETTINGS)

export default SETTINGS;
