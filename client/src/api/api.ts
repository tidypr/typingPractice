type gameData = {
  userName: string;
  level: number;
  score: number;
  playTime: string;
}

export const getEnglishSentences = async () => {
  try {
    const response = await fetch("https://typing-game-o1sn.vercel.app/api/sentences");
    const data = await response.json();
    return data.data

  } catch (error) {
    console.error("Failed to fetch words:", error);
  }
};

export const getEnglishWords = async () => {
  try {
    const response = await fetch("https://typing-game-o1sn.vercel.app/api/words");
    const data = await response.json();
    return data.data

  } catch (error) {
    console.error("Failed to fetch words:", error);
  }
};


export const saveData = async (gameData: gameData) => {
  const response = await fetch("https://typing-game-o1sn.vercel.app/api/rank", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(gameData),
  });
  const data = await response.json();
  return data;
};
