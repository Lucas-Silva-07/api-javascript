/*
  Warnings:

  - You are about to drop the column `scheduledAt` on the `Clients` table. All the data in the column will be lost.
  - Added the required column `date` to the `Clients` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hour` to the `Clients` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Clients" DROP COLUMN "scheduledAt",
ADD COLUMN     "date" DATE NOT NULL,
ADD COLUMN     "hour" TEXT NOT NULL;
