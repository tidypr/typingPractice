const dateFormat = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  return `${year}/${month}/${day} ${hours}:${minutes}`;
};

const url = 'http://localhost:5000'

document.addEventListener("DOMContentLoaded", async () => {
  const API_URL = `${url}/api/rank`;
  const rankList: HTMLUListElement = document.querySelector("#rank ul") as HTMLUListElement;

  try {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error("데이터를 불러오지 못했습니다.");

    const data = await response.json();
    console.log(data);
    rankList.innerHTML = "";

    const listHeader = document.createElement("li");
    listHeader.className = "bg-gray-100 w-full flex text-center justify-between items-center p-4 px-6 rounded-2xl text-sm text-gray-600 font-semibold tracking-wide border-b border-gray-300";
    listHeader.innerHTML = `
  <span class="w-8 text-left">#</span>
  <span class="w-20">이름</span>
  <span class="w-12">레벨</span>
  <span class="w-20">최대콤보</span>
  <span class="w-24">플레이타임</span>
  <span class="w-24">점수</span>
  <span class="w-40">날짜</span>
`;
    rankList.appendChild(listHeader);

    data.data.forEach((item: { updatedAt: number, score: number, userName: string, level: number, playTime: string, maxCombo: number }, index: number) => {
      const listItem = document.createElement("li");
      const newDate = dateFormat(new Date(item.updatedAt));

      listItem.className =
        "bg-white w-full flex justify-between items-center text-center p-4 px-6 rounded-xl text-sm text-gray-700 hover:bg-gray-50 transition shadow-sm mb-2";
      listItem.innerHTML = `
    <span class="w-8 text-left font-bold font-medium  ${index === 0 ? "text-yellow-700": "text-gray-500"}">${index + 1}</span>
    <span class="w-20 truncate">${item.userName}</span>
    <span class="w-12">${item.level}</span>
    <span class="w-20">${item.maxCombo}</span>
    <span class="w-24">${item.playTime}</span>
    <span class="w-24 text-right font-bold text-blue-600">${item.score.toLocaleString('ko-KR')}</span>
    <span class="w-40 text-gray-400">${newDate}</span>
  `;
      rankList.appendChild(listItem);
    });

  } catch (error) {
    console.error(error);
    rankList.innerHTML =
      "<li class='text-center'>데이터를 불러올 수 없습니다.</li>";
  }
});
