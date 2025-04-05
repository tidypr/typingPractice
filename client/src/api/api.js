const getEnglishWords = async () => {
  try {
    const response = await fetch("http://192.168.0.42:5000/api/englishWord");
    const data = await response.json();
    words = [...words, ...data.data];

    return data

  } catch (error) {
    console.error("Failed to fetch words:", error);
  }
};


const saveData = async (gameData) => {
  console.log(gameData);
  const response = await fetch("http://192.168.0.42:5000/api/rank", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(gameData),
  });
  const data = await response.json();
  return data;
};
