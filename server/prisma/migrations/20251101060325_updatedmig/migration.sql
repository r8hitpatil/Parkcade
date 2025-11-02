-- CreateTable
CREATE TABLE "TimeDuration" (
    "id" TEXT NOT NULL,
    "locationId" TEXT NOT NULL,
    "timeIs" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TimeDuration_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "TimeDuration" ADD CONSTRAINT "TimeDuration_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "Location"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
