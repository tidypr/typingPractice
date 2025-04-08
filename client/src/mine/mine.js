const words = [
  "apple",
  "banana",
  "cherry",
  "date",
  "elderberry",
  "fig",
  "grape",
  "honeydew",
  "kiwi",
  "lemon",
  "mango",
  "nectarine",
  "orange",
  "papaya",
  "quince",
  "raspberry",
  "strawberry",
  "tangerine",
  "ugli",
  "vanilla",
  "watermelon",
  "xigua",
  "yellowfruit",
  "zucchini",
  "apricot",
  "blackberry",
  "blueberry",
  "cantaloupe",
  "dragonfruit",
  "guava",
  "jackfruit",
  "kumquat",
  "lime",
  "mulberry",
  "olive",
  "peach",
];

const gameBoardEl = document.getElementById("gameBoard");
const wordInput = document.getElementById("wordInput");
const messageElement = document.getElementById("message");

// Create the 6x6 word grid
let toShuffle = [...words];

// Shuffle words
for (let i = toShuffle.length - 1; i > 0; i--) {
  const j = Math.floor(Math.random() * (i + 1));
  [toShuffle[i], toShuffle[j]] = [toShuffle[j], toShuffle[i]];
}

// Pick 36 words
toShuffle = toShuffle.slice(0, 36);

const wordElements = []; // 단어 요소 저장용 배열

toShuffle.forEach((word, index) => {
  const wordElement = document.createElement("div");
  wordElement.textContent = word;
  wordElement.className = "min-w-32 min-h-12 p-2 border text-center bg-white";
  wordElement.dataset.id = index; // Assign a unique ID
  gameBoardEl.appendChild(wordElement);
  wordElements.push(wordElement); // 배열에 저장
});

// Replace a random word every second
const replaceWordInterval = setInterval(() => {
  const remainingWords = wordElements.filter((el) => el.textContent !== ""); // 남아있는 단어만 필터링

  if (remainingWords.length > 0) {
    const randomIndex = Math.floor(Math.random() * remainingWords.length);
    const targetWordEl = remainingWords[randomIndex];

    targetWordEl.textContent = ""; // 단어 삭제 대신 빈 문자열
    targetWordEl.style.backgroundColor = "#ddd"; // 배경을 흐리게
    targetWordEl.style.opacity = "0.5"; // 투명도 적용
  } else {
    clearInterval(replaceWordInterval);
    messageElement.textContent = "Game Over!";
    messageElement.className = "text-red-500";
  }
}, 3000);

// Check user input
wordInput.addEventListener("input", () => {
  const inputValue = wordInput.value.trim().toLowerCase();
  const matchedWord = wordElements.find((el) => el.textContent === inputValue);

  if (matchedWord) {
    messageElement.textContent = "Correct!";
    messageElement.className = "text-green-500";
  } else {
    messageElement.textContent = "Wrong! Try again.";
    messageElement.className = "text-red-500";
  }
});
