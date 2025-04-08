import { Prisma, PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

import express, { Request, Response, NextFunction } from 'express';
import { fetchSentence, fetchWord } from './utils/fetch';
import { User } from './models/user';
import rankRoute from './routes/rankRoute';

const UESR: User[] = [];

let count: number = 0;

const app = express();
app.use(express.json());

// cors
app.use((req: Request, res: Response, next: NextFunction) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  // res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
})

// app.get('/api/korean', async (req: Request, res: Response, next: NextFunction) => {
//   const data = await fetchText()
//   count += 1;
//   console.log(`요청횟수: ${count}`)
//   res.json({ message: 'Hello World!!!!!' });
// });

app.get('/api/sentences', async (req: Request, res: Response, next: NextFunction) => {
  const data = await fetchSentence()
  count += 1;
  console.log(`요청횟수: ${count}`)

  res.json({ data: data });
});

// TODO: /api/words
app.get('/api/words', async (req: Request, res: Response, next: NextFunction) => {
  const data: string[] = await fetchWord()
  count += 1;
  console.log(`요청횟수: ${count}`)

  res.json({ data: data });
});

app.use('/api/rank', rankRoute);


export default app;