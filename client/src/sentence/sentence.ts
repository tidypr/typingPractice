import { getEnglishSentences } from "../api/api.ts";
import * as El from "./getElement.ts";

let currentIndex = 0;
let typedInput = "";
let sentenceList: { quote: string }[] = [];
let isTestLoaded = false;

let startTime: number | null = null;
let endTime: number | null = null;

let cur: { quote: string };
let next: { quote: string } | undefined;



const initialize = async () => {
  const num = El.sentenceNumEl.value
  sentenceList = await getEnglishSentences(+num);
  // sentenceList = [{ quote: 'a' }, { quote: 'b' }, { quote: 'c' }, { quote: 'd' }, { quote: 'e' }, { quote: 'f' }]
  console.log(isTestLoaded)
  isTestLoaded = true;
  El.answerEl.classList.remove("hidden");
  El.answerEl.focus();

  loadQuestion(0);
};

const loadQuestion = (index: number) => {
  if (index >= sentenceList.length) {
    El.answerEl.classList.add("hidden");
    El.recordDialogEl.showModal();

    El.curEl.textContent = "";
    El.prevEl.textContent = "";
    El.nextEl.textContent = "";
    El.answerEl.value = "";
    return;
  }

  cur = sentenceList[index];
  next = sentenceList[index + 1];

  currentIndex = index;
  typedInput = "";
  startTime = null;
  endTime = null;

  El.prevEl.textContent = index > 0 ? sentenceList[index - 1].quote : "";
  El.curEl.textContent = cur.quote.trim();
  El.nextEl.textContent = next?.quote ?? "";
  El.answerEl.value = "";

};

const updateAnswerDisplay = () => {
  El.curEl.innerHTML = "";
  El.curEl.classList.add("whitespace-pre");

  const testText = cur.quote.split("");

  for (let i = 0; i < testText.length; i++) {
    const span = document.createElement("span");
    span.textContent = testText[i];
    if (i < typedInput.length) {
      span.classList.add(
        typedInput[i] === testText[i] ? "text-green-500" : "text-red-500"
      );
    }
    El.curEl.appendChild(span);
  }
};

El.answerEl.addEventListener("input", (e) => {
  const input = (e.target as HTMLInputElement).value;

  if (typedInput === "") {
    startTime = performance.now();
  }

  typedInput = input;
  updateAnswerDisplay();
  calculateAndLogStats();

  const currentQuestion = sentenceList[currentIndex]?.quote;

  if (typedInput.length >= currentQuestion.length) {
    endTime = performance.now();
    calculateAndLogStats(true);
    loadQuestion(currentIndex + 1)
    // setTimeout(() => loadQuestion(currentIndex + 1));
  }
});

const calculateAndLogStats = (isFinal = false) => {
  const currentQuote = sentenceList[currentIndex]?.quote;
  if (!currentQuote || typedInput.length === 0 || !startTime) return;

  let correct = 0;
  const len = Math.min(typedInput.length, currentQuote.length);
  for (let i = 0; i < len; i++) {
    if (typedInput[i] === currentQuote[i]) correct++;
  }

  const accuracy = (correct / typedInput.length) * 100;

  const now = performance.now();

  // WPM 계산
  const elapsedTime = (isFinal ? endTime! : now) - startTime;
  // const timeTaken = Math.max(elapsedTime / 1000 / 60, 0.01);
  // const wpm = (typedInput.length / 5) / timeTaken;

  // (타) 계산
  const elapsedTimeInSeconds = elapsedTime / 1000;
  const wpm = (typedInput.length / elapsedTimeInSeconds) * 60;


  // 값이 바뀔 때만 DOM 업데이트 (optional)
  El.curSpeedEl.innerText = (elapsedTime / 1000).toFixed(1) + 's';
  El.avgSpeedEl.innerText = wpm.toFixed(1) + ' WPM';
  El.accuracyEl.innerText = accuracy.toFixed(1) + ' %';
};


// const updateStatsDisplay = () => {
//   El.curSpeedEl.textContent = `${statTest}`;
//   El.avgSpeedEl.textContent = `${statTest}`;
//   El.maxSpeedEl.textContent = `${statTest}`;
//   El.accuracyEl.textContent = `${statTest}`;
//   statTest++;
// };

El.startButtonEl.addEventListener("click", initialize)
// 🔥 시작
// initialize();
