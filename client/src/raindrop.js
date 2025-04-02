// Element references
const levelEl = document.querySelector("#level");
const lifeEl = document.querySelector("#life");
const scoreEl = document.querySelector("#score");

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

// 기본속도
let dropSpeed = 100;

// 증가속도
const speedIncrease = 0.95;

let userName = null;

// 클리어 레벨
const CLEARLEVEL = 20;

// 기본 텍스트 
let defaultClassName =
  "bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-4 py-2 rounded-xl text-center shadow-xl w-fit absolute text-2xl font-semibold transition-transform transform hover:scale-105";



// 초기 설정
const initGame = (INITDATA) => {
  const { level, score, lives } = INITDATA;

  levelEl.innerText = `${level}`;
  scoreEl.innerText = `${score}`;
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

  gameInterval = setInterval(createRaindrop, 2000);
  moveInterval = setInterval(updateRaindrops, dropSpeed);
}

// 단어 입력
const checkInput = (event) => {
  const value = input.value.trim().toLowerCase();
  // if (event.code === "Enter" || event.code === "Space") {
  if (event.code === "Enter") {
    // let found = false;
    activeRaindrops.forEach((drop, index) => {
      if (drop.word.toLowerCase() === value) {
        gameAreaEl.removeChild(drop.element);
        activeRaindrops.splice(index, 1);
        score += calScore(level, event.target.value.length);
        wordsTyped++;
        scoreEl.innerText = `${score}`;
        // found = true;
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
  const baseScore = 100;
  const lengthScore = length * 10;
  const levelScore = level / 10;

  const tempScore = (baseScore + lengthScore) * levelScore;

  return tempScore;
};

// ITEM
// - 단어 전부 삭제
// - 드롭 일시 정지
// - 드롭 속도 감소

const createRaindrop = () => {
  // 레벨 변화
  // TODO: 확률 출현
  if (level > 2) {
    defaultClassName = defaultClassName.concat(" animate-spin");
  }

  if (activeRaindrops.length >= 20) return;
  // TODO
  // 단어가져오기: 랜덤 => POP()
  // POP시 배열길이 0이면 RETURN  
  const word = words[Math.floor(Math.random() * words.length)];
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
