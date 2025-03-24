/*
  Warnings:

  - You are about to drop the column `email` on the `InterviewExperience` table. All the data in the column will be lost.
  - Added the required column `registrationNumber` to the `InterviewExperience` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "InterviewExperience" DROP COLUMN "email",
ADD COLUMN     "registrationNumber" BIGINT NOT NULL;
