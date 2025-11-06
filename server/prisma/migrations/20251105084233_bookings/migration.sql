/*
  Warnings:

  - The primary key for the `TimeDuration` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `timeId` on the `TimeDuration` table. All the data in the column will be lost.
  - You are about to drop the column `timeIs` on the `TimeDuration` table. All the data in the column will be lost.
  - Added the required column `pricing` to the `Location` table without a default value. This is not possible if the table is not empty.
  - Added the required column `endTime` to the `TimeDuration` table without a default value. This is not possible if the table is not empty.
  - The required column `id` was added to the `TimeDuration` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `startTime` to the `TimeDuration` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "PaymentStatus" AS ENUM ('PENDING', 'SUCCESS', 'FAILED', 'REFUNDED');

-- AlterTable
ALTER TABLE "Location" ADD COLUMN     "pricing" DOUBLE PRECISION NOT NULL;

-- AlterTable
ALTER TABLE "TimeDuration" DROP CONSTRAINT "TimeDuration_pkey",
DROP COLUMN "timeId",
DROP COLUMN "timeIs",
ADD COLUMN     "endTime" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "id" TEXT NOT NULL,
ADD COLUMN     "startTime" TIMESTAMP(3) NOT NULL,
ADD CONSTRAINT "TimeDuration_pkey" PRIMARY KEY ("id");

-- CreateTable
CREATE TABLE "Booking" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "locationId" TEXT NOT NULL,
    "timeSlotId" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "paymentStatus" "PaymentStatus" NOT NULL DEFAULT 'PENDING',
    "razorpayOrderId" TEXT,
    "razorpayPaymentId" TEXT,
    "isBooked" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Booking_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "Location"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_timeSlotId_fkey" FOREIGN KEY ("timeSlotId") REFERENCES "TimeDuration"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
