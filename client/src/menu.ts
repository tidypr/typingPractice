const menuButton = document.querySelector("#menuButton") as HTMLButtonElement;
const sideBar = document.querySelector("#sidebar") as HTMLButtonElement;
const closeButton = document.getElementById("closeButton") as HTMLButtonElement;

menuButton.addEventListener("click", () => {
  sideBar.classList.toggle("-translate-x-full");
});

closeButton.addEventListener("click", () => {
  sideBar.classList.add("-translate-x-full");
});
