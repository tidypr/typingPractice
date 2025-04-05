type gameData = {
  userName: string;
  level: number;
  score: number;
  playTime: string;
}

export const getEnglishWords = async () => {
  try {
    const response = await fetch("http://localhost:5000/api/englishWord");
    const data = await response.json();
    return data.data

  } catch (error) {
    console.error("Failed to fetch words:", error);
  }
};


export const saveData = async (gameData: gameData) => {
  const response = await fetch("http://localhost:5000/api/rank", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(gameData),
  });
  const data = await response.json();
  return data;
};
