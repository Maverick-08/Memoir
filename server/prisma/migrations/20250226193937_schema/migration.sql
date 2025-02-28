/*
  Warnings:

  - The primary key for the `InterviewExperience` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `roundDetails` on the `InterviewExperience` table. All the data in the column will be lost.
  - You are about to drop the column `year` on the `Post` table. All the data in the column will be lost.
  - Added the required column `experienceType` to the `InterviewExperience` table without a default value. This is not possible if the table is not empty.
  - The required column `id` was added to the `InterviewExperience` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `name` to the `InterviewExperience` table without a default value. This is not possible if the table is not empty.
  - Added the required column `branch` to the `Post` table without a default value. This is not possible if the table is not empty.
  - Added the required column `yearOfPassingOut` to the `Post` table without a default value. This is not possible if the table is not empty.
  - Made the column `createdAt` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "InterviewExperience" DROP CONSTRAINT "InterviewExperience_pkey",
DROP COLUMN "roundDetails",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "experienceType" TEXT NOT NULL,
ADD COLUMN     "id" TEXT NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL,
ALTER COLUMN "compensation" SET DATA TYPE DOUBLE PRECISION,
ADD CONSTRAINT "InterviewExperience_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Post" DROP COLUMN "year",
ADD COLUMN     "branch" TEXT NOT NULL,
ADD COLUMN     "yearOfPassingOut" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "createdAt" SET NOT NULL;

-- CreateTable
CREATE TABLE "RoundDetails" (
    "id" TEXT NOT NULL,
    "interviewExperienceId" TEXT NOT NULL,
    "roundName" TEXT NOT NULL,
    "roundType" TEXT NOT NULL,
    "note" TEXT,

    CONSTRAINT "RoundDetails_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Question" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "link" TEXT,
    "roundDetailsId" TEXT NOT NULL,

    CONSTRAINT "Question_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "RoundDetails" ADD CONSTRAINT "RoundDetails_interviewExperienceId_fkey" FOREIGN KEY ("interviewExperienceId") REFERENCES "InterviewExperience"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Question" ADD CONSTRAINT "Question_roundDetailsId_fkey" FOREIGN KEY ("roundDetailsId") REFERENCES "RoundDetails"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
