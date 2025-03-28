//
const questionEl = document.querySelector("#question");
const answerEl = document.querySelector("#answer");
const testBtn = document.querySelector("#clickTest");


//
const keysEl = document.querySelectorAll(".key");
const inputEl = document.querySelector("#input");

const fetchQuestion = async () => {
  const response = await fetch("http://localhost:5000/api/english");
  const data = await response.json();
  return data;
};


//
const question = "Hello World";
let inputValue = "";

questionEl.innerText = question;  

const handleDownKey = (e) => {
  console.log(e)
  keysEl.forEach((key) => {
    if (key.dataset.key === e.key) {
      key.classList.add("pressed");
    }
  });
  answerEl.innerText = e.key;
  inputValue += e.key;
  answerEl.innerText = inputValue;
};

const handleUpKey = (e) => {
  keysEl.forEach((key) => {
    if (key.dataset.key === e.key) {
      key.classList.remove("pressed");
    }
  });
  answerEl.innerText = e.key;
  inputValue += e.key;
  answerEl.innerText = inputValue;
};

document.addEventListener("keydown", handleDownKey);
document.addEventListener("keyup", handleUpKey);

testBtn.addEventListener("click", async () => {
  const data = await fetchQuestion();
  console.log(data.message)
  questionEl.innerText = data.message; 
})