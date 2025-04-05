const dateFormat = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  return `${year}/${month}/${day} ${hours}:${minutes}`;
};

document.addEventListener("DOMContentLoaded", async () => {
  const API_URL = "http://192.168.0.42:5000/api/rank";
  const rankList = document.querySelector("#rank ul");

  try {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error("데이터를 불러오지 못했습니다.");

    const data = await response.json();
    rankList.innerHTML = "";

    data.data.forEach((item, index) => {
      const listItem = document.createElement("li");
      const newDate = dateFormat(new Date(item.updatedAt));
      console.log(newDate);

      listItem.className =
        "bg-gray-200 w-full flex justify-between p-4 px-8 rounded-xl";
      listItem.innerHTML = `
        <span>${index + 1}</span>
        <span class='w-28'>${item.name}</span>
        <span class="font-bold w-16 text-right">${item.score.toLocaleString('ko-KR')}</span>
        <span>${newDate}</span>
      `;
      rankList.appendChild(listItem);
    });
  } catch (error) {
    console.error(error);
    rankList.innerHTML =
      "<li class='text-center'>데이터를 불러올 수 없습니다.</li>";
  }
});
