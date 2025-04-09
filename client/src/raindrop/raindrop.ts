import * as El from "./getElement";
import SETTINGS from "./SettingClass";
import { getEnglishWords, saveData } from "../api/api";
import { calScore, calPlayTime } from "../utils/utills.ts";
import type { gameData, Raindrop } from "../type.d.ts";

// import { CreateWord } from "./createWordClass";

const INITDATA: gameData = {
  level: 1,
  score: 0,
  life: 5,
  combo: 0,
  maxCombo: 0,
  bomb: 3,
  dropSpeed: 50,
  wordCount: 0,
  startTime: null,
  endTime: null,
  words: [],
}

let gameData: gameData = { ...INITDATA };

// 단어장-표본
let activeRaindrops: Record<string, Raindrop> = {};

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

  if (localStorage.getItem("userName")) {
    El.userNameEl.value = localStorage.getItem("userName") || "";
    userName = localStorage.getItem("userName") || "";
    localStorage.removeItem("userName");
  }
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

  localStorage.setItem("userName", El.userNameEl.value.trim());
  userName = El.userNameEl.value.trim();

  const fetchData = await getEnglishWords();
  gameData.words = [...fetchData]
  El.startGameEl.classList.add("hidden");

  El.inputEl.value = "";
  El.inputEl.focus();

  Object.values(activeRaindrops).forEach((drop) =>
    El.gameAreaEl.removeChild(drop.element)
  );
  activeRaindrops = {};

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

  Object.values(activeRaindrops).forEach((drop) =>
    El.gameAreaEl.removeChild(drop.element)
  );
  activeRaindrops = {};

  El.gameOverEl.classList.add("hidden");
  initGame();
};

// 단어 입력
const checkInput = (event: KeyboardEvent) => {
  const value = El.inputEl.value.trim().toLowerCase();

  if (event.code === "Enter") {
    let matched = false;

    for (const id in activeRaindrops) {
      const drop = activeRaindrops[id];
      if (drop.word.toLowerCase() === value) {
        itemTextHandler(drop.type!);

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
        }, 100);

        delete activeRaindrops[id];

        if (event.target && "value" in event.target) {
          gameData.score += calScore(
            gameData.level,
            value.length,
            gameData.combo
          );
        }

        gameData.wordCount++;
        matched = true;
        break;
      }
    }


    gameData.maxCombo = Math.max(gameData.maxCombo, gameData.combo);
    gameData.combo = matched ? gameData.combo + 1 : 0;

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
  const id = Math.random().toString(36).substring(2, 9);
  drop.dataset.id = id;

  drop.textContent = randomItem.concat(" ", word);
  drop.className = defaultClassName;

  drop.style.left = `${Math.random() * 85}%`;
  El.gameAreaEl.appendChild(drop);
  activeRaindrops[id] = { element: drop, word, y: 0, type: randomItem };

};

const createPlainWord = () => {
  // 레벨 변화
  // TODO: 확률 출현

  if (Object.keys(activeRaindrops).length >= 20) return;


  const word = gameData.words.pop() || "ERROR";
  const drop: HTMLDivElement = document.createElement("div");

  drop.textContent = word;
  drop.className = defaultClassName;
  drop.style.left = `${Math.random() * 85}%`;
  const id = Math.random().toString(36).substring(2, 9);
  drop.dataset.id = id;

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



  El.gameAreaEl.appendChild(drop);
  activeRaindrops[id] = { element: drop, word, y: 0 };

};

const updateRaindrops = () => {
  const gameAreaHeight = El.gameAreaEl.clientHeight;

  for (const id in activeRaindrops) {
    const drop = activeRaindrops[id];
    drop.y += 1 * gameData.level;
    drop.element.style.top = `${drop.y}px`;

    if (drop.y > gameAreaHeight) {
      if (El.gameAreaEl.contains(drop.element)) {
        El.gameAreaEl.removeChild(drop.element);
      }
      delete activeRaindrops[id];
      gameData.combo = 0
      El.comboEl.innerText = `${gameData.combo}`;
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
  El.gameOverUserNameEl.innerHTML = localStorage.getItem("userName") || "";
  El.endTextEl.innerHTML = clear ? "Game Clear" : "Game Over";
  if (clear) {
    El.endTextEl.classList.add("text-3xl", "font-bold", "text-green-600", "mb-4");
  } else {
    El.endTextEl.classList.remove("text-3xl", "font-bold", "text-red-600", "mb-4");
  }

  const gameRecord = {
    userName: userName,
    level: gameData.level,
    score: gameData.score,
    maxCombo: gameData.maxCombo,
    playTime: calPlayTime({
      startTime: gameData.startTime ? gameData.startTime.getTime() : 0,
      endTime: gameData.endTime ? gameData.endTime.getTime() : 0,
    }),
  };

  await saveData(gameRecord);
};

// 레벨 증가: 속도 증가
const increaseLevel = () => {
  if (gameData.level >= SETTINGS.CLEARLEVEL) {
    endGameHandler(true);
    return;
  }

  gameData.wordCount = 0;
  gameData.level++;
  El.levelEl.innerText = `${gameData.level}`;
  gameData.dropSpeed *= SETTINGS.SPEEDRATIO;

  // 기존 인터벌 제거, 새로운 인터벌 생성
  if (moveInterval) clearInterval(moveInterval);
  moveInterval = setInterval(updateRaindrops, gameData.dropSpeed);
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
  if (gameData.bomb >= SETTINGS.MAXBOMB) {
    gameData.score += 10000;
    El.scoreEl.innerText = `${gameData.score}`;
    return;
  };
  gameData.bomb++;
  El.bombEl.innerText = "💣".repeat(gameData.bomb);
}

const addLife = () => {
  if (gameData.life >= SETTINGS.MAXLIFE) {
    gameData.score += 10000;
    El.scoreEl.innerText = `${gameData.score}`;
    return;
  };
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

  Object.values(activeRaindrops).forEach((drop) => {
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
    }, 500);
  });
  gameData.bomb--;
  El.bombEl.innerText = "💣".repeat(gameData.bomb);

  activeRaindrops = {};
};

const itemTextHandler = (type: string) => {
  // 아이템 텍스트 처리
  if (type === "💣") {
    addBomb();
  } else if (type === "💖") {
    addLife();
  }
};