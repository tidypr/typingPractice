// Element references
const levelEl = document.querySelector("#level");
const lifeEl = document.querySelector("#life");
const scoreEl = document.querySelector("#score");
const comboEl = document.querySelector("#combo");

const gameAreaEl = document.querySelector("#displayWordArea");

const input = document.querySelector("#input");
const startDia = document.querySelector("#dia");
const gameStart = document.querySelector("#gameStart");
const userNameEl = document.querySelector("#userName");

// Game Over elements
const gameOver = document.querySelector("#gameOver");
const restartGame = document.querySelector("#restartGame");

const endText = document.querySelector("#endText");

const gameOverLevel = document.querySelector("#gameOverLevel");
const gameOverScore = document.querySelector("#gameOverScore");
const gameOverUserName = document.querySelector("#gameOverUserName");

// Game init
const speedIncrease = 0.95; // 레벨 증가 - 속도 증가 비율
const CLEARLEVEL = 20; // 클리어 레벨
const WORDCREATIONINTERVAL = 2000; // 단어 생성 주기

const INITDATA = {
  level: 1,
  score: 0,
  lives: 10,
};

// Game variables
let level = 1;
let score = 0;
let lives = 3;

// 단어장-모집단
let words = [];

// 단어장-표본
let activeRaindrops = [];

// level당 입력 단어
let wordsTyped = 0;

let gameInterval, moveInterval;
let userName = null;

// 기본속도
let dropSpeed = 100;

// 콤보
let combo = 0;

// 기본 텍스트
let defaultClassName =
  "bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-4 py-2 rounded-xl text-center shadow-xl w-fit absolute text-2xl font-semibold transition-transform transform hover:scale-105";

// 초기 설정
const initGame = (INITDATA) => {
  const { level, score, lives } = INITDATA;

  levelEl.innerText = `${level}`;
  scoreEl.innerText = `${score}`;
  comboEl.innerText = `${combe}`;
  lifeEl.innerText = "❤️".repeat(lives);
  userNameEl.focus();
};

// 게임 시작
function gameStartHandler() {
  if (userNameEl.value.trim() === "") {
    alert("이름");
    return;
  }
  userName = userNameEl.value.trim();
  getEnglishWords();
  startDia.style.display = "none";
  // scoreEl.innerText = `${score}`;
  // levelEl.innerText = `${level}`;
  // lifeEl.innerText = "❤️".repeat(lives);
  input.value = "";
  input.focus();
  activeRaindrops.forEach((drop) => gameAreaEl.removeChild(drop.element));
  activeRaindrops = [];

  gameOver.style.display = "hidden";

  gameInterval = setInterval(createRaindrop, WORDCREATIONINTERVAL);
  gameItemInterval = setInterval(createItemDrop, 10000 + Math.random() * 5000); // 10초 + 랜덤 0~5초
  moveInterval = setInterval(updateRaindrops, dropSpeed);
}

// 단어 입력
const checkInput = (event) => {
  // TODO: combo계산
  
  const value = input.value.trim().toLowerCase();
  // if (event.code === "Enter" || event.code === "Space") {
  if (event.code === "Enter") {
    // let found = false;
    activeRaindrops.forEach((drop, index) => {
      if (drop.word.toLowerCase() === value) {
        console.log(event.target.value);
        gameAreaEl.removeChild(drop.element);
        activeRaindrops.splice(index, 1);
        score += calScore(level, event.target.value.length);
        wordsTyped++;
        combo++;
        scoreEl.innerText = `${score}`;
        comboEl.innerText = `${combo}`;
        // found = true;
      } else {
        combo = 0;
        comboEl.innerText = `${combo}`;
      }
    });
    input.value = "";
    if (wordsTyped >= 15) {
      increaseLevel();
    }
  }
};

// 점수 계산
const calScore = (level, length) => {
  const baseScore = 50;
  const lengthScore = length * 10;
  const levelScore = level * 0.5 + 1;

  const tempScore = (baseScore + lengthScore) * levelScore + combo * 20;

  return tempScore;
};

const createItemDrop = () => {
  // ITEM
  // - ⏸️ 단어 정지
  // - 💣 단어 전부 삭제
  // - ⏱️ 드롭 속도 감소
  // - 💎 점수 2배
  // - 💰 점수 1.5배
  // - 💖 목숨 1개 증가

  // 아이템 배열 별도로 ???
  const items = ["⏸️", "💣", "⏱️", "💎", "💰", "💖"];

  const randomItem = items[Math.floor(Math.random() * items.length)];

  const word = words.pop();
  const drop = document.createElement("div");

  drop.textContent = randomItem.concat(" ", word);
  drop.className = defaultClassName;

  drop.style.left = `${Math.random() * 90}%`;
  gameAreaEl.appendChild(drop);
  activeRaindrops.push({ element: drop, word, y: 0 });
};

const createRaindrop = () => {
  // 레벨 변화
  // TODO: 확률 출현
  if (level > 2) {
    defaultClassName = defaultClassName.concat(" animate-spin");
  }

  if (activeRaindrops.length >= 20) return;

  const word = words.pop();
  const drop = document.createElement("div");

  drop.textContent = word;
  drop.className = defaultClassName;

  drop.style.left = `${Math.random() * 90}%`;
  gameAreaEl.appendChild(drop);
  activeRaindrops.push({ element: drop, word, y: 0 });
};

const updateRaindrops = () => {
  const gameAreaHeight = gameAreaEl.clientHeight;
  activeRaindrops.forEach((drop, index) => {
    drop.y += 2 * level;
    drop.element.style.top = `${drop.y}px`;
    if (drop.y > gameAreaHeight) {
      gameAreaEl.removeChild(drop.element);
      activeRaindrops.splice(index, 1);
      loseLife();
    }
  });
};

// gameOver
const gameOverHandler = async (clear) => {
  clearInterval(gameInterval);
  clearInterval(moveInterval);

  gameOver.style.display = "block";
  gameOverLevel.innerHTML = level;
  gameOverScore.innerHTML = score;
  gameOverUserName.innerHTML = userName;
  // console.log(clear)
  // endText.innerHTML = clear ? "Game Clear" : "Game Over";

  const gameData = {
    userName: userName,
    level: level,
    score: score,
  };
  console.log(gameData);
  const result = await saveData(gameData);
};

const loseLife = () => {
  lives--;
  lifeEl.innerText = "❤️".repeat(lives);
  if (lives <= 0) {
    gameOverHandler();
    // gameRestartHandler();
  }
};

const clearGame = () => {
  gameOverHandler(true);
};

// 레벨 증가: 레벨벨속도 증가, 단어 추가
const increaseLevel = () => {
  wordsTyped = 0;
  level++;
  levelEl.innerText = `${level}`;
  dropSpeed *= speedIncrease;
  // getEnglishWords();
  clearInterval(moveInterval);
  moveInterval = setInterval(updateRaindrops, dropSpeed);

  if (level > CLEARLEVEL) {
    clearGame();
  }
};

function gameRestartHandler() {
  userName = userNameEl.value.trim();
  // getEnglishWords();
  startDia.style.display = "block";
  input.value = "";
  userNameEl.focus();
  activeRaindrops.forEach((drop) => gameAreaEl.removeChild(drop.element));
  activeRaindrops = [];

  gameOver.style.display = "none";
  initGame(INITDATA);

  let defaultClassName =
    "bg-blue-500 text-white p-2 rounded text-center shadow-lg w-fit absolute text-2xl rounded-lg";

  // gameInterval = setInterval(createRaindrop, 2000 / level);
  // moveInterval = setInterval(updateRaindrops, dropSpeed);
}

document.addEventListener("keydown", (event) => {
  if (event.key === "/") {
    event.preventDefault();
    input.focus();
  }
});

gameStart.addEventListener("click", gameStartHandler);
restartGame.addEventListener("click", gameRestartHandler);
input.addEventListener("keydown", checkInput);

initGame(INITDATA);
