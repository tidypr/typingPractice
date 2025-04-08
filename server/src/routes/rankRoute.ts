import { Router } from "express";
import { Request, Response, NextFunction } from "express";
import { Prisma, PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

const router = Router();

// TODO: /api/records
router.post('/', async (req: Request, res: Response, next: NextFunction) => {
  console.log(req.body)
  const { userName, score, level, playTime, maxCombo } = await req.body;

  // 유효성 검사 추가 => Joi or Zod

  const result = await prisma.user.create({
    data: {
      userName,
      score,
      level,
      playTime,
      maxCombo,
      // ip: req.ip,
    }
  })


  // 현재 점수에 대한 랭킹 추가
  const curRank = 1;

  res.json({ message: curRank });
});

router.get('/', async (req: Request, res: Response, next: NextFunction) => {
  const result = await prisma.user.findMany({
    take: 20,
    orderBy: {
      score: 'desc'
    }
  })

  res.json({ data: result });
})

export default router;