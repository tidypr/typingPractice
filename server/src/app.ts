import { Prisma, PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

import express, { Request, Response, NextFunction } from 'express';
import { fetchText, fetchText2, fetchWord } from './utils/fetch';
import { User } from './models/user';
import rankRoute from './routes/rankRoute';

const UESR: User[] = [];

const app = express();
app.use(express.json());

// cors
app.use((req: Request, res: Response, next: NextFunction) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
  // res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
})

app.get('/api/korean', async (req: Request, res: Response, next: NextFunction) => {
  const data = await fetchText()
  console.log(data)

  res.json({ message: 'Hello World!!!!!' });
});

// TODO: /api/sentences
app.get('/api/english', async (req: Request, res: Response, next: NextFunction) => {
  const data = await fetchText2()
  console.log(data.quote)

  res.json({ message: data.quote });
});

// TODO: /api/words
app.get('/api/englishWord', async (req: Request, res: Response, next: NextFunction) => {
  const data: string[] = await fetchWord()
  console.log(data)

  res.json({ data: data });
});

app.use('/api/rank', rankRoute);


export default app;