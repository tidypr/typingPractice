-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "level" INTEGER NOT NULL,
    "userName" TEXT NOT NULL,
    "playTime" TEXT NOT NULL,
    "score" INTEGER NOT NULL,
    "maxCombo" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);
