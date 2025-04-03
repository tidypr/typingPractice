import { Prisma, PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

import express, { Request, Response, NextFunction } from 'express';
import { User } from './models/user';

const UESR: User[] = [];

const app = express();
app.use(express.json());

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
const fetchWord = async () => {
  const resData = await fetch('https://random-word-api.vercel.app/api?words=300')
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

app.get('/api/englishWord', async (req: Request, res: Response, next: NextFunction) => {
  const data: string[] = await fetchWord()
  console.log(data)

  res.json({ data: data });
});

app.post('/api/rank', async (req: Request, res: Response, next: NextFunction) => {
  const { userName: name, score } = await req.body;

  // 유효성 검사 추가 => Joi or Zod

  const result = await prisma.user.create({
    data: {
      name,
      score,
      // ip: req.ip,
    }
  })

  // 현재 점수에 대한 랭킹 추가
  const curRank = 1;

  res.json({ message: curRank });
});

app.get('/api/rank', async (req: Request, res: Response, next: NextFunction) => {
  const result = await prisma.user.findMany({
    take: 10,
    orderBy: {
      score: 'desc'
    }
  })
  res.json({ data: result });
})


export default app;