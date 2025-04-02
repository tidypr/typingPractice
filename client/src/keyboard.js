// 타이핑 시작 시간
// 타이핑 종료 시간

const questionEl = document.querySelector("#question");
const answerEl = document.querySelector("#answer");
const testBtn = document.querySelector("#clickTest");
const keysEl = document.querySelectorAll(".key");

let currentQuestion = ""; // Question
let typedInput = ""; // User input

const fetchQuestion = async () => {
  try {
    const response = await fetch("http://192.168.0.42:5000/api/english");
    const data = await response.json();
    currentQuestion = data.message;
    
    questionEl.innerText = currentQuestion;
    typedInput = "";
    answerEl.innerHTML = "";
  } catch (error) {
    console.error("Failed to fetch question:", error);
    questionEl.innerText = "Error fetching question";
  }
};

const toggleKeyPress = (key, isPressed) => {
  keysEl.forEach((el) => {
    if (el.dataset.key === key) {
      el.classList.toggle("pressed", isPressed);
    }
  });
};

const handleKeyInput = (e, isKeyDown) => {
  if (!isKeyDown) {
    toggleKeyPress(e.key, false);
    return;
  }

  if (!/^[a-zA-Z\s]$/.test(e.key) && e.key !== "Backspace") return;

  toggleKeyPress(e.key, true);

  if (e.key === "Backspace") {
    typedInput = typedInput.slice(0, -1);
  } else {
    typedInput += e.key;
  }

  updateAnswerDisplay();
};

// TODO: 정타/오타 => question에서 색상 변경 or answer에서 색상 변경 결정해야 함.
const updateAnswerDisplay = () => {
  answerEl.innerHTML = "";

  typedInput.split("").forEach((char, index) => {
    const span = document.createElement("span");
    span.innerText = char;

    if (currentQuestion[index] === char) {
      span.style.color = "#80b3ff"
    } else {
      span.style.color = "#ff8080";
    }

    answerEl.appendChild(span);
  });
};

document.addEventListener("keydown", (e) => handleKeyInput(e, true));
document.addEventListener("keyup", (e) => handleKeyInput(e, false));

testBtn.addEventListener("click", fetchQuestion);

fetchQuestion();
