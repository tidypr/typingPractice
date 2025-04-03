const menuButton = document.querySelector("#menuButton");
const sideBar = document.querySelector("#sidebar");
const closeButton = document.getElementById("closeButton");

menuButton.addEventListener("click", () => {
  sideBar.classList.toggle("-translate-x-full");
});

closeButton.addEventListener("click", () => {
  sideBar.classList.add("-translate-x-full");
});
