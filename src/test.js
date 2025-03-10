const keytest = document.querySelector(".key");
const menuButton = document.querySelector("#menuButton");
const sideBar = document.querySelector("#sidebar");
const closeButton = document.getElementById("closeButton");

const handleDownKey = (e) => {
  console.log(e);
  if (keytest) {
    keytest.classList.add("pressed");
    keytest.classList.add("active");
  }
};

const handleUpKey = (e) => {
  if (keytest) {
    keytest.classList.remove("pressed");
    keytest.classList.remove("active");
    keytest.classList.remove("hover");
  }
};

document.addEventListener("keydown", handleDownKey);
document.addEventListener("keyup", handleUpKey);

menuButton.addEventListener("click", () => {
  sideBar.classList.toggle("-translate-x-full");
});

closeButton.addEventListener("click", () => {
  sideBar.classList.add("-translate-x-full");
});
