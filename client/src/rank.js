const dateFormat = (date) => {
  return date
    .toLocaleString("ko-KR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    })
    .replace(/\./g, "") // 마침표 제거
    .replace(/(\d{4}) (\d{2}) (\d{2}), (\d{2}):(\d{2})/, "$1-$2-$3 $4시 $5분");
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
        <span>${item.name}</span>
        <span>${item.score}</span>
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
