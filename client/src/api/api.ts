type gameData = {
  userName: string;
  level: number;
  score: number;
  playTime: string;
}

// const url = 'http://localhost:5000'
// const url = 'http://192.168.123.161:5000'
const url = 'http://192.168.0.42:5000'

export const getEnglishSentences = async () => {
  try {
    const response = await fetch(`${url}/api/sentences`);
    const data = await response.json();
    return data.data

  } catch (error) {
    console.error("Failed to fetch words:", error);
  }
};

export const getEnglishWords = async () => {
  try {
    const response = await fetch(`${url}/api/words`);
    const data = await response.json();
    return data.data

  } catch (error) {
    console.error("Failed to fetch words:", error);
  }
};


export const saveData = async (gameData: gameData) => {
  console.log(gameData)
  const response = await fetch(`${url}/api/rank`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(gameData),
  });
  const data = await response.json();
  return data;
};
