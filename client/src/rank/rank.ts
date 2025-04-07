const dateFormat = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  return `${year}/${month}/${day} ${hours}:${minutes}`;
};

document.addEventListener("DOMContentLoaded", async () => {
  const API_URL = "http://localhost:5000/api/rank";
  const rankList: HTMLUListElement = document.querySelector("#rank ul") as HTMLUListElement;

  try {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error("데이터를 불러오지 못했습니다.");

    const data = await response.json();
    rankList.innerHTML = "";

    data.data.forEach((item: { updatedAt: number, score: number, name: string }, index: number) => {
      const listItem = document.createElement("li");
      const newDate = dateFormat(new Date(item.updatedAt));

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
