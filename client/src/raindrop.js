// Element references
const levelEl = document.querySelector("#level");
const lifeEl = document.querySelector("#life");
const scoreEl = document.querySelector("#score");
const comboEl = document.querySelector("#combo");
const bombEl = document.querySelector("#bomb");
const printTextEl = document.querySelector("#printText");

const gameAreaEl = document.querySelector("#displayWordArea");

const input = document.querySelector("#input");

const startGameEl = document.querySelector("#startGameModal");
const gameStart = document.querySelector("#gameStart");
const userNameEl = document.querySelector("#userName");

// Game Over elements
const gameOverEl = document.querySelector("#gameOver");
const restartGame = document.querySelector("#restartGame");

const endText = document.querySelector("#endText");

const gameOverLevel = document.querySelector("#gameOverLevel");
const gameOverScore = document.querySelector("#gameOverScore");
const gameOverUserName = document.querySelector("#gameOverUserName");

// 상수
// const speedIncrease = 0.975; // 레벨 증가, 최종 80정도.
// const CLEARLEVEL = 10; // 클리어 레벨
// const LEVELUPWORDS = 15; // Level Up 단어 수

const PLAINWORDTIME = 3000; // 단어 생성 주기
const ITEMWORDTIME = 10000 + Math.random() * 5000 // 10초 + 랜덤 0~5초

// TEST
const CLEARLEVEL = 3; // 클리어 레벨
const LEVELUPWORDS = 3; // Level Up 단어 수
// const PLAINWORDTIME = 1000; // 단어 생성 주기
// const ITEMWORDTIME = 1000;



// Game init
const INITDATA = {
  level: 1,
  score: 0,
  life: 5,
  combo: 0,
  bomb: 3,
  dropSpeed: 100,
  startTime: null,
  endTime: null,
  wordCount: 0, // level 기준 단어 수
};

let gameData = {
  level: 1,
  score: 0,
  life: 5,
  combo: 0,
  bomb: 3,
  dropSpeed: 100, // 기본 드롭 속도도
  startTime: null,
  endTime: null,
};

// 단어 테스트셋
let words = [];
// for (let i = 0; i < 10; i++) {
//   for (let j = 97; j <= 122; j++) {
//     words.push(String.fromCharCode(j));
//   }
// }

// 단어장-표본
let activeRaindrops = [];

let gameInterval, moveInterval, gameItemInterval;
let userName = null;

// 기본 텍스트
let defaultClassName =
  "bg-gradient-to-r from-blue-500 to-indigo-500 text-white p-3 rounded-lg text-center shadow-xl w-fit absolute text-2xl font-medium tracking-wide flex items-center justify-center";

// 초기 설정
const initGame = (INITDATA) => {
  gameData = { ...INITDATA };
  const { level, score, life, combo, bomb } = INITDATA;

  levelEl.innerText = `${level}`;
  scoreEl.innerText = `${score}`;
  comboEl.innerText = `${combo}`;
  lifeEl.innerText = "❤️".repeat(life);
  bombEl.innerText = "💣".repeat(bomb);

  userNameEl.focus();

  // gameOverEl.classList.add("hidden");
  defaultClassName =
    "bg-gradient-to-r from-blue-500 to-indigo-500 text-white p-3 rounded-lg text-center shadow-xl w-fit absolute text-2xl font-medium tracking-wide flex items-center justify-center";

  // for (el in gameData) {
  //   console.log(el, gameData[el]);
  // }
};

// 게임 시작
const gameStartHandler = () => {
  // 초기화
  initGame(INITDATA);

  if (userNameEl.value.trim() === "") {
    alert("이름을 입력해주세요.");
    return;
  }

  const specialCharRegex = /[~`!@#$%^&*()_\-+={}[\]|\\:;"'<>,.?/]/;

  if (specialCharRegex.test(userNameEl.value)) {
    alert("특수문자를 사용할 수 없습니다.");
    return;
  }

  userName = userNameEl.value.trim();
  getEnglishWords();
  startGameEl.classList.add("hidden");

  input.value = "";
  input.focus();
  activeRaindrops.forEach((drop) => gameAreaEl.removeChild(drop.element));
  activeRaindrops = [];

  gameOverEl.classList.add("hidden");

  gameInterval = setInterval(createPlainWord, PLAINWORDTIME);
  gameItemInterval = setInterval(createItemWord, ITEMWORDTIME);
  moveInterval = setInterval(updateRaindrops, gameData.dropSpeed);

  gameData.startTime = new Date();
};

// 게임 재시작
const gameRestartHandler = () => {
  userName = userNameEl.value.trim();
  getEnglishWords();
  startGameEl.classList.remove("hidden");
  input.value = "";
  userNameEl.focus();
  console.log(activeRaindrops);
  activeRaindrops.forEach((drop) => gameAreaEl.removeChild(drop.element));
  activeRaindrops = [];

  gameOverEl.classList.add("hidden");
  initGame(INITDATA);
};

// 단어 입력
const checkInput = (event) => {
  console.log(gameData);
  const value = input.value.trim().toLowerCase();

  if (event.code === "Enter") {
    let matched = false;

    activeRaindrops.forEach((drop, index) => {
      if (drop.word.toLowerCase() === value) {
        itemTextHandler(drop); // 아이템 텍스트 처리

        drop.element.classList.add(
          "opacity-0",
          "scale-0",
          "transition-all",
          "duration-500"
        );

        setTimeout(() => {
          if (gameAreaEl.contains(drop.element)) {
            gameAreaEl.removeChild(drop.element);
          }
          activeRaindrops.splice(index, 1);
        }, 100);

        gameData.score += calScore(gameData.level, event.target.value.length);
        gameData.wordCount++;
        matched = true;
      }
    });

    calCombo(matched);

    scoreEl.innerText = `${gameData.score}`;
    comboEl.innerText = `${gameData.combo}`;

    input.value = "";
    if (gameData.wordCount >= LEVELUPWORDS) {
      increaseLevel();
    }
  }
};

const createItemWord = () => {
  const items = ["💣", "💖"];

  const randomItem = items[Math.floor(Math.random() * items.length)];

  const word = words.pop();
  const drop = document.createElement("div");

  drop.textContent = randomItem.concat(" ", word);
  drop.className = defaultClassName;

  drop.style.left = `${Math.random() * 90}%`;
  gameAreaEl.appendChild(drop);
  activeRaindrops.push({ element: drop, word, y: 0, type: randomItem });
};

const createPlainWord = () => {
  // 레벨 변화
  // TODO: 확률 출현

  if (activeRaindrops.length >= 20) return;

  const word = words.pop();
  const drop = document.createElement("div");

  drop.textContent = word;
  drop.className = defaultClassName;

  if (gameData.level > 2) {
    // if (true) {
    const randomNum = Math.random();
    // console.log(randomNum)
    if (randomNum < 0.4) {
      drop.className = defaultClassName.concat(
        " animate-[spin_3s_ease-in-out_infinite]"
      );
    } else {
      drop.className = defaultClassName;
    }
  } else {
    drop.className = defaultClassName;
  }

  drop.style.left = `${Math.random() * 90}%`;
  gameAreaEl.appendChild(drop);
  activeRaindrops.push({ element: drop, word, y: 0 });
};

const updateRaindrops = () => {
  const gameAreaHeight = gameAreaEl.clientHeight;

  for (let i = activeRaindrops.length - 1; i >= 0; i--) {
    const drop = activeRaindrops[i];
    drop.y += 2 * gameData.level;
    drop.element.style.top = `${drop.y}px`;

    if (drop.y > gameAreaHeight) {
      if (gameAreaEl.contains(drop.element)) {
        gameAreaEl.removeChild(drop.element);
      }
      activeRaindrops.splice(i, 1);
      loseLife();
    }
  }
};

// gameOver
const endGameHandler = async (clear) => {
  clearInterval(gameInterval);
  clearInterval(moveInterval);
  clearInterval(gameItemInterval);
  console.log(gameOverEl);

  // gameOverEl.classList.add("hidden");
  // gameOverEl.classList.add("inline-block");
  gameOverEl.classList.remove("hidden");
  // gameOverEl.classList.add("block");

  gameOverLevel.innerHTML = gameData.level;
  gameOverScore.innerHTML = gameData.score;
  gameOverUserName.innerHTML = userName;
  // console.log(clear)
  endText.innerHTML = clear ? "Game Clear" : "Game Over";
  endText.classList.remove("text-3xl", "font-bold", "text-red-600", "mb-4");
  endText.classList.add("text-3xl", "font-bold", "text-green-600", "mb-4");

  const gameRecord = {
    userName: userName,
    level: gameData.level,
    score: gameData.score,
    // playTime: calPlayTime(gameData)
  };
  console.log(gameData);

  gameData.endTime = new Date();

  calPlayTime(gameData);
  await saveData(gameRecord);
};

// 레벨 증가: 레벨벨속도 증가, 단어 추가
const increaseLevel = () => {
  console.log(`${gameData.level}${gameData.level >= CLEARLEVEL} ${CLEARLEVEL}`);
  console.log(gameOverEl);
  if (gameData.level >= CLEARLEVEL) {
    endGameHandler(true);
    return;
  }

  gameData.wordCount = 0;
  gameData.level++;
  levelEl.innerText = `${gameData.level}`;
  gameData.dropSpeed *= speedIncrease;
  // getEnglishWords();
  clearInterval(moveInterval);
  moveInterval = setInterval(updateRaindrops, gameData.dropSpeed);

  printTextEl.innerText = `Level Up! - ${gameData.level}`;
  // printTextEl.classList.remove("hidden"); // 보이게
  printTextEl.classList.add("opacity-0", "transition-all", "duration-2000");

  setTimeout(() => {
    printTextEl.classList.remove("opacity-0");
    printTextEl.classList.add("opacity-100");
  }, 2000);
};

document.addEventListener("keydown", (event) => {
  if (event.code === "Slash") {
    event.preventDefault();
    input.focus();
  }
});

document.addEventListener("keydown", (event) => {
  // console.log(event)
  if (event.code === "Escape") {
    useBomb();
  }
});

gameStart.addEventListener("click", gameStartHandler);
restartGame.addEventListener("click", gameRestartHandler);
input.addEventListener("keydown", checkInput);

initGame(INITDATA);
