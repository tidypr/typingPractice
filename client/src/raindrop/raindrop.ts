import * as El from "./getElement";
import { SETTINGS } from "./gameData";
import { getEnglishWords, saveData } from "../api/api";
import type { gameData, Raindrop, PlayTime } from "../type.d.ts";

const INITDATA: gameData = {
  level: 1,
  score: 0,
  life: 5,
  combo: 0,
  bomb: 3,
  dropSpeed: 100,
  wordCount: 0,
  startTime: null,
  endTime: null,
  words: [] as string[],
}

let gameData: gameData = {
  level: 1,
  score: 0,
  life: 5,
  combo: 0,
  bomb: 3,
  dropSpeed: 100,
  wordCount: 0,
  startTime: null,
  endTime: null,
  words: [] as string[],
}


for (let i = 0; i < 10; i++) {
  for (let j = 97; j <= 122; j++) {
    gameData.words.push(String.fromCharCode(j));
  }
}

// 단어장-표본
let activeRaindrops: Raindrop[] = [];

let gameInterval: number | null = null;
let moveInterval: number | null = null;
let gameItemInterval: number | null = null;
let userName: string = '';

// 기본 텍스트
let defaultClassName =
  "bg-gradient-to-r from-blue-500 to-indigo-500 text-white p-3 rounded-lg text-center shadow-xl w-fit absolute text-2xl font-medium tracking-wide flex items-center justify-center";

// 초기 설정
const initGame = () => {
  gameData = { ...INITDATA }
  El.levelEl.innerText = `${gameData.level}`;
  El.scoreEl.innerText = `${gameData.score}`;
  El.comboEl.innerText = `${gameData.combo}`;
  El.lifeEl.innerText = "❤️".repeat(gameData.life);
  El.bombEl.innerText = "💣".repeat(gameData.bomb);
  El.userNameEl.focus();

  // gameOverEl.classList.add("hidden");
  defaultClassName =
    "bg-gradient-to-r from-blue-500 to-indigo-500 text-white p-3 rounded-lg text-center shadow-xl w-fit absolute text-2xl font-medium tracking-wide flex items-center justify-center";

};

// 게임 시작
const gameStartHandler = async () => {
  initGame(); // 초기화

  if (El.userNameEl.value.trim() === "") {
    alert("이름을 입력해주세요.");
    return;
  }

  const specialCharRegex = /[~`!@#$%^&*()_\-+={}[\]|\\:;"'<>,.?/]/;

  if (specialCharRegex.test(El.userNameEl.value)) {
    alert("특수문자를 사용할 수 없습니다.");
    return;
  }

  userName = El.userNameEl.value.trim();
  const fetchData = await getEnglishWords();
  gameData.words = [...fetchData]
  El.startGameEl.classList.add("hidden");

  El.inputEl.value = "";
  El.inputEl.focus();
  activeRaindrops.forEach((drop) => El.gameAreaEl.removeChild(drop.element));
  activeRaindrops = [];

  El.gameOverEl.classList.add("hidden");

  gameInterval = setInterval(createPlainWord, SETTINGS.PLAINWORDTIME);
  gameItemInterval = setInterval(createItemWord, SETTINGS.ITEMWORDTIME);
  moveInterval = setInterval(updateRaindrops, gameData.dropSpeed);

  gameData.startTime = new Date();
};

// 게임 재시작
const gameRestartHandler = () => {
  userName = El.userNameEl.value.trim();
  getEnglishWords();
  El.startGameEl.classList.remove("hidden");
  El.inputEl.value = "";
  El.userNameEl.focus();
  activeRaindrops.forEach((drop) => El.gameAreaEl.removeChild(drop.element));
  activeRaindrops = [];

  El.gameOverEl.classList.add("hidden");
  initGame();
};

// 단어 입력
const checkInput = (event: KeyboardEvent) => {
  const value = El.inputEl.value.trim().toLowerCase();

  if (event.code === "Enter") {
    let matched = false;

    activeRaindrops.forEach((drop, index) => {
      if (drop.word.toLowerCase() === value) {
        itemTextHandler(drop.type!); // 아이템 텍스트 처리

        drop.element.classList.add(
          "opacity-0",
          "scale-0",
          "transition-all",
          "duration-500"
        );

        setTimeout(() => {
          if (El.gameAreaEl.contains(drop.element)) {
            El.gameAreaEl.removeChild(drop.element);
          }
          activeRaindrops.splice(index, 1);
        }, 100);

        if (event.target && 'value' in event.target) {
          gameData.score += calScore(gameData.level, (event.target as HTMLInputElement).value.length);
        }
        gameData.wordCount++;
        matched = true;
      }
    });

    matched ? gameData.combo++ : gameData.combo = 0;

    El.scoreEl.innerText = `${gameData.score}`;
    El.comboEl.innerText = `${gameData.combo}`;

    El.inputEl.value = "";
    if (gameData.wordCount >= SETTINGS.LEVELUPWORDS) {
      increaseLevel();
    }
  }
};

const createItemWord = () => {
  const items = ["💣", "💖"];

  const randomItem = items[Math.floor(Math.random() * items.length)];

  const word = gameData.words.pop() || "ERROR";;
  const drop = document.createElement("div");

  drop.textContent = randomItem.concat(" ", word);
  drop.className = defaultClassName;

  drop.style.left = `${Math.random() * 85}%`;
  El.gameAreaEl.appendChild(drop);
  activeRaindrops.push({ element: drop, word, y: 0, type: randomItem });
};

const createPlainWord = () => {
  // 레벨 변화
  // TODO: 확률 출현

  if (activeRaindrops.length >= 20) return;

  const word = gameData.words.pop() || "ERROR";
  const drop: HTMLDivElement = document.createElement("div");

  drop.textContent = word;
  drop.className = defaultClassName;

  let extraClass = "";

  // TODO: 별도로 분리
  if (gameData.level >= 3) {
    const rand = Math.random();
    if (rand < 0.3) {
      extraClass = " animate-pulse";
    }
  }
  
  if (gameData.level >= 6) {
    const rand = Math.random();
    if (rand < 0.6) {
      extraClass = Math.random() < 0.5 ? " animate-pulse" : " animate-[spin_3s_ease-in-out_infinite]";
    }
  }

  drop.className = defaultClassName + extraClass;


  drop.style.left = `${Math.random() * 85}%`;
  El.gameAreaEl.appendChild(drop);
  activeRaindrops.push({ element: drop, word, y: 0 });
};

const updateRaindrops = () => {
  const gameAreaHeight = El.gameAreaEl.clientHeight;

  for (let i = activeRaindrops.length - 1; i >= 0; i--) {
    const drop = activeRaindrops[i];
    drop.y += 2 * gameData.level;
    drop.element.style.top = `${drop.y}px`;

    if (drop.y > gameAreaHeight) {
      if (El.gameAreaEl.contains(drop.element)) {
        El.gameAreaEl.removeChild(drop.element);
      }
      activeRaindrops.splice(i, 1);
      loseLife();
    }
  }
};

// gameOver
const endGameHandler = async (clear: boolean) => {
  gameData.endTime = new Date();

  if (gameInterval) clearInterval(gameInterval);
  if (moveInterval) clearInterval(moveInterval);
  if (gameItemInterval) clearInterval(gameItemInterval);

  El.gameOverEl.classList.remove("hidden");

  El.gameOverLevelEl.innerHTML = `${gameData.level}`;
  El.gameOverScoreEl.innerHTML = `${gameData.score}`;
  El.gameOverUserNameEl.innerHTML = `${userName}`;
  El.endTextEl.innerHTML = clear ? "Game Clear" : "Game Over";
  El.endTextEl.classList.remove("text-3xl", "font-bold", "text-red-600", "mb-4");
  El.endTextEl.classList.add("text-3xl", "font-bold", "text-green-600", "mb-4");

  const gameRecord = {
    userName: userName,
    level: gameData.level,
    score: gameData.score,
    playTime: calPlayTime({
      startTime: gameData.startTime ? gameData.startTime.getTime() : 0,
      endTime: gameData.endTime ? gameData.endTime.getTime() : 0,
    }),
  };

  await saveData(gameRecord);
};

// 레벨 증가: 레벨벨속도 증가, 단어 추가
const increaseLevel = () => {
  if (gameData.level >= SETTINGS.CLEARLEVEL) {
    endGameHandler(true);
    return;
  }

  gameData.wordCount = 0;
  gameData.level++;
  El.levelEl.innerText = `${gameData.level}`;
  gameData.dropSpeed *= SETTINGS.SPEEDRATIO;
  // getEnglishWords();

  // 기존 인터벌 제거, 새로운 인터벌 생성
  if (moveInterval) clearInterval(moveInterval);
  moveInterval = setInterval(updateRaindrops, gameData.dropSpeed);

  // 함수 분리
  // El.printTextEl.innerText = `Level Up! - ${gameData.level}`;
  // printTextEl.classList.remove("hidden"); // 보이게
  // El.printTextEl.classList.add("opacity-0", "transition-all", "duration-2000");
  // setTimeout(() => {
  //   El.printTextEl.classList.remove("opacity-0");
  //   El.printTextEl.classList.add("opacity-100");
  // }, 2000);
};

document.addEventListener("keydown", (event) => {
  if (event.code === "Slash") {
    event.preventDefault();
    El.inputEl.focus();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.code === "Escape") {
    useBomb();
  }
});

El.gameStartEl.addEventListener("click", gameStartHandler);
El.restartGameEl.addEventListener("click", gameRestartHandler);
El.inputEl.addEventListener("keydown", checkInput);

initGame();

const addBomb = () => {
  if (gameData.bomb >= SETTINGS.MAXBOMB) return;
  gameData.bomb++;
  El.bombEl.innerText = "💣".repeat(gameData.bomb);
}

const addLife = () => {
  if (gameData.life >= SETTINGS.MAXLIFE) return;
  gameData.life++;
  El.lifeEl.innerText = "❤️".repeat(gameData.life);
}

const loseLife = () => {
  gameData.life--;
  gameData.combo = 0;
  El.lifeEl.innerText = "❤️".repeat(gameData.life);

  if (gameData.life <= 0) {
    endGameHandler(false);
    return;
  }
}

const useBomb = () => {
  if (gameData.bomb <= 0) return;

  gameData.bomb--;
  El.bombEl.innerText = "💣".repeat(gameData.bomb);
  activeRaindrops.forEach((drop) => {
    // 아이템 텍스트 처리 => 제거, 폭탄은 처리한 아이템은 얻지 못하게 처리
    // itemTextHandler(drop);

    drop.element.classList.add(
      "opacity-0",
      "scale-0",
      "transition-all",
      "duration-500"
    );
    setTimeout(() => El.gameAreaEl.removeChild(drop.element), 500);
  });
  activeRaindrops = [];
};

const itemTextHandler = (type: string) => {
  // 아이템 텍스트 처리
  if (type === "💣") {
    addBomb();
  } else if (type === "💖") {
    addLife();
  }
};


// 점수 계산
const calScore = (level: number, length: number) => {
  const baseScore = 50;
  const lengthScore = length * 10;
  const levelScore = level * 0.5 + 1;


  const tempScore =
    (baseScore + lengthScore) * levelScore + gameData.combo * 20;


  return tempScore;
};


// playTime 계산
const calPlayTime = (gameData: PlayTime) => {
  const timeDiff = gameData.endTime - gameData.startTime;
  const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

  return `${minutes}분 ${seconds}초`;
};