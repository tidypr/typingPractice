import express, { Request, Response, NextFunction } from 'express';

const app = express();

// cors
app.use((req: Request, res: Response, next: NextFunction) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
})

const fetchText = async () => {
  const resData = await fetch('https://korean-advice-open-api.vercel.app/api/advice')
  const data = await resData.json()
  return data
}

const fetchText2 = async () => {
  const resData = await fetch('https://dummyjson.com/quotes/random')
  const data = await resData.json()
  console.log(data)
  return data
}

app.get('/api/korean', async (req: Request, res: Response, next: NextFunction) => {
  const data = await fetchText()
  console.log(data)

  res.json({ message: 'Hello World!!!!!' });
});
app.get('/api/english', async (req: Request, res: Response, next: NextFunction) => {
  const data = await fetchText2()
  console.log(data.quote)

  res.json({ message: data.quote });
});

export default app;