/*
  Warnings:

  - You are about to drop the column `endTime` on the `TimeDuration` table. All the data in the column will be lost.
  - You are about to drop the column `startTime` on the `TimeDuration` table. All the data in the column will be lost.
  - Added the required column `timeIs` to the `TimeDuration` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "TimeDuration" DROP COLUMN "endTime",
DROP COLUMN "startTime",
ADD COLUMN     "timeIs" TIMESTAMP(3) NOT NULL;
