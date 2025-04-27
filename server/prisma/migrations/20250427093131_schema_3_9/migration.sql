/*
  Warnings:

  - You are about to drop the column `followUpData` on the `AppliedOpenings` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "AppliedOpenings" DROP COLUMN "followUpData",
ADD COLUMN     "followUpDate" TIMESTAMP(3);
