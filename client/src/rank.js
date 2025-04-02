document.addEventListener("DOMContentLoaded", async () => {
  const API_URL = "http://192.168.0.42:5000/api/rank";
  const rankList = document.querySelector("#rank ul");

  try {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error("데이터를 불러오지 못했습니다.");
    
    const data = await response.json();
    console.log(data)
    rankList.innerHTML = "";

    data.data.forEach((item, index) => {
      const listItem = document.createElement("li");
      listItem.className =
        "bg-gray-200 w-full flex justify-between p-4 px-8 rounded-xl";
      listItem.innerHTML = `
        <span>${index + 1}</span>
        <span>${item.name}</span>
        <span>${item.score}</span>
        <span>${item.updatedAt}</span>
      `;
      rankList.appendChild(listItem);
    });
  } catch (error) {
    console.error(error);
    rankList.innerHTML = "<li class='text-center'>데이터를 불러올 수 없습니다.</li>";
  }
});
