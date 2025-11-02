/*
  Warnings:

  - The primary key for the `TimeDuration` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `TimeDuration` table. All the data in the column will be lost.
  - The required column `timeId` was added to the `TimeDuration` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- AlterTable
ALTER TABLE "TimeDuration" DROP CONSTRAINT "TimeDuration_pkey",
DROP COLUMN "id",
ADD COLUMN     "timeId" TEXT NOT NULL,
ADD CONSTRAINT "TimeDuration_pkey" PRIMARY KEY ("timeId");
