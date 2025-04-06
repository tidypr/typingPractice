export const fetchText = async () => {
  const resData = await fetch('https://korean-advice-open-api.vercel.app/api/advice')
  const data = await resData.json()
  return data
}

export const fetchText2 = async () => {
  const resData = await fetch('https://dummyjson.com/quotes/random')
  const data = await resData.json()
  // console.log(data)
  return data
}
export const fetchWord = async () => {
  const resData = await fetch('https://random-word-api.vercel.app/api?words=300')
  const data = await resData.json()
  // console.log(data)
  return data
}