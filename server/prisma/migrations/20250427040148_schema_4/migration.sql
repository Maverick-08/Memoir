/*
  Warnings:

  - You are about to drop the column `email` on the `InterviewExperience` table. All the data in the column will be lost.
  - You are about to drop the column `experienceType` on the `InterviewExperience` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `InterviewExperience` table. All the data in the column will be lost.
  - You are about to drop the column `registrationNumber` on the `InterviewExperience` table. All the data in the column will be lost.
  - The primary key for the `OTP` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `email` on the `OTP` table. All the data in the column will be lost.
  - You are about to drop the column `isVerified` on the `OTP` table. All the data in the column will be lost.
  - You are about to drop the column `branch` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `degree` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `message` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `yearOfPassingOut` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `Reviews` table. All the data in the column will be lost.
  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `degree` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `registrationNumber` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `PersonalInterviews` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[userId]` on the table `OTP` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `branchTag` to the `InterviewExperience` table without a default value. This is not possible if the table is not empty.
  - Added the required column `creatorId` to the `InterviewExperience` table without a default value. This is not possible if the table is not empty.
  - Added the required column `creatorName` to the `InterviewExperience` table without a default value. This is not possible if the table is not empty.
  - Added the required column `offerType` to the `InterviewExperience` table without a default value. This is not possible if the table is not empty.
  - The required column `id` was added to the `OTP` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `userId` to the `OTP` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `otp` on the `OTP` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `authorId` to the `Post` table without a default value. This is not possible if the table is not empty.
  - Added the required column `content` to the `Post` table without a default value. This is not possible if the table is not empty.
  - Added the required column `reviewCategory` to the `Reviews` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userType` to the `Reviews` table without a default value. This is not possible if the table is not empty.
  - Added the required column `course` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `firstName` to the `User` table without a default value. This is not possible if the table is not empty.
  - The required column `id` was added to the `User` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `lastName` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_email_fkey";

-- DropIndex
DROP INDEX "OTP_email_key";

-- DropIndex
DROP INDEX "User_registrationNumber_key";

-- AlterTable
ALTER TABLE "InterviewExperience" DROP COLUMN "email",
DROP COLUMN "experienceType",
DROP COLUMN "name",
DROP COLUMN "registrationNumber",
ADD COLUMN     "branchTag" TEXT NOT NULL,
ADD COLUMN     "creatorId" TEXT NOT NULL,
ADD COLUMN     "creatorName" TEXT NOT NULL,
ADD COLUMN     "offerType" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "OTP" DROP CONSTRAINT "OTP_pkey",
DROP COLUMN "email",
DROP COLUMN "isVerified",
ADD COLUMN     "id" TEXT NOT NULL,
ADD COLUMN     "userId" TEXT NOT NULL,
DROP COLUMN "otp",
ADD COLUMN     "otp" INTEGER NOT NULL,
ADD CONSTRAINT "OTP_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Post" DROP COLUMN "branch",
DROP COLUMN "degree",
DROP COLUMN "email",
DROP COLUMN "message",
DROP COLUMN "name",
DROP COLUMN "title",
DROP COLUMN "yearOfPassingOut",
ADD COLUMN     "authorId" TEXT NOT NULL,
ADD COLUMN     "content" TEXT NOT NULL,
ADD COLUMN     "imageUrl" TEXT,
ADD COLUMN     "impressionCount" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "reportCount" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "saveCount" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "videoUrl" TEXT;

-- AlterTable
ALTER TABLE "Reviews" DROP COLUMN "email",
ADD COLUMN     "reviewCategory" TEXT NOT NULL,
ADD COLUMN     "userType" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
DROP COLUMN "degree",
DROP COLUMN "name",
DROP COLUMN "registrationNumber",
ADD COLUMN     "backgroundImageUrl" TEXT,
ADD COLUMN     "codeforces" TEXT,
ADD COLUMN     "course" TEXT NOT NULL,
ADD COLUMN     "firstName" TEXT NOT NULL,
ADD COLUMN     "gfg" TEXT,
ADD COLUMN     "github" TEXT,
ADD COLUMN     "id" TEXT NOT NULL,
ADD COLUMN     "lastName" TEXT NOT NULL,
ADD COLUMN     "leetcode" TEXT,
ADD COLUMN     "profileUrl" TEXT,
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("id");

-- DropTable
DROP TABLE "PersonalInterviews";

-- CreateTable
CREATE TABLE "UserStat" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "profileViews" INTEGER NOT NULL DEFAULT 0,
    "postImpressionCount" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "UserStat_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tags" (
    "id" TEXT NOT NULL,
    "postId" TEXT NOT NULL,
    "tagName" TEXT NOT NULL,

    CONSTRAINT "Tags_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SavedPost" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "postId" TEXT NOT NULL,

    CONSTRAINT "SavedPost_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AppliedOpenings" (
    "id" TEXT NOT NULL,
    "creatorId" TEXT NOT NULL,
    "companyName" TEXT NOT NULL,
    "offerType" TEXT NOT NULL,
    "interviewStatus" TEXT NOT NULL,
    "note" TEXT,
    "followUpData" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AppliedOpenings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Notifications" (
    "id" TEXT NOT NULL,
    "creatorName" TEXT NOT NULL,
    "receiverId" TEXT,
    "content" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Notifications_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WorkExperience" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "companyName" TEXT NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3),
    "position" TEXT NOT NULL,

    CONSTRAINT "WorkExperience_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserStat_userId_key" ON "UserStat"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "SavedPost_postId_key" ON "SavedPost"("postId");

-- CreateIndex
CREATE UNIQUE INDEX "OTP_userId_key" ON "OTP"("userId");

-- AddForeignKey
ALTER TABLE "OTP" ADD CONSTRAINT "OTP_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserStat" ADD CONSTRAINT "UserStat_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tags" ADD CONSTRAINT "Tags_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SavedPost" ADD CONSTRAINT "SavedPost_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InterviewExperience" ADD CONSTRAINT "InterviewExperience_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkExperience" ADD CONSTRAINT "WorkExperience_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
