//
const questionEl = document.querySelector("#question");
const answerEl = document.querySelector("#answer");

//
const keysEl = document.querySelectorAll(".key");
const inputEl = document.querySelector("#input");

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
};

const handleUpKey = (e) => {
  keysEl.forEach((key) => {
    if (key.dataset.key === e.key) {
      key.classList.remove("pressed");
    }
  });
};

document.addEventListener("keydown", handleDownKey);
document.addEventListener("keyup", handleUpKey);
