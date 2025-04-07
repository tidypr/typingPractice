import { getEnglishSentences } from "../api/api.ts";

const answerEl = document.querySelector("#answer") as HTMLInputElement;
const prevEl = document.querySelector("#prevSentence") as HTMLElement;
const curEl = document.querySelector("#curSentence") as HTMLElement;
const nextEl = document.querySelector("#nextSentence") as HTMLElement;

let test: { quote: string }[] = [];
let currentIndex = 0;
let typedInput = "";

let startTime: number | null = null;
let endTime: number | null = null;

let cur: { quote: string };
let next: { quote: string } | undefined;

const fetchQuestion = async (index: number) => {
  test = await getEnglishSentences(); // [{ id: "...", quote: "..." }, ...]
  if (index >= test.length) {
    curEl.textContent = "🎉 End";
    prevEl.textContent = "";
    nextEl.textContent = "";
    answerEl.value = "";
    return;
  }

  cur = test[index];
  next = test[index + 1];

  currentIndex = index;
  typedInput = "";
  startTime = null;
  endTime = null;

  prevEl.textContent = index > 0 ? test[index - 1].quote : "";
  curEl.textContent = cur.quote.trim();
  nextEl.textContent = next?.quote ?? "";
  answerEl.value = "";
};

const updateAnswerDisplay = () => {
  curEl.innerHTML = ""; // 기존 내용 제거
  curEl.classList.add('whitespace-pre'); // 줄바꿈을 위한 클래스 추가
  // curEl.style.whiteSpace = "pre"; // 여기서 스타일 설정

  const testText = cur.quote.split("");

  
  for (let i = 0; i < testText.length; i++) {
    const span = document.createElement("span");
    span.textContent = testText[i];
    if (i < typedInput.length) {
      // console.log(testText[i], typedInput[i])
      // console.log(testText[i] == typedInput[i])
      span.classList.add(
        typedInput[i] === testText[i] ? "text-green-500" : "text-red-500"
      );
      console.log(span)
    }
    curEl.appendChild(span);
  }
};


answerEl.addEventListener("input", (e) => {
  const input = (e.target as HTMLInputElement).value;

  if (typedInput === "") {
    startTime = performance.now(); // 타이핑 시작 시간
  }

  typedInput = input;
  updateAnswerDisplay();

  const currentQuestion = test[currentIndex]?.quote;

  if (typedInput.length >= currentQuestion.length) {
    endTime = performance.now();
    calculateAndLogStats();
    setTimeout(() => fetchQuestion(currentIndex + 1), 500);
  }
});

const calculateAndLogStats = () => {
  const currentQuestion = test[currentIndex]?.quote;
  const totalTyped = typedInput.length;
  const correctChars = [...typedInput].filter(
    (char, i) => char === currentQuestion[i]
  ).length;

  const accuracy = totalTyped === 0 ? 0 : (correctChars / totalTyped) * 100;

  let wpm = 0;
  if (startTime && totalTyped > 0) {
    const elapsedMinutes =
      ((endTime || performance.now()) - startTime) / 1000 / 60;
    wpm = totalTyped / 5 / elapsedMinutes;
  }

  console.log(`Accuracy: ${accuracy.toFixed(2)}%, WPM: ${wpm.toFixed(2)}`);
};

// 초기 문장 로딩
fetchQuestion(0);
