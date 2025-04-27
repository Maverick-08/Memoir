/*
  Warnings:

  - Added the required column `interviewDate` to the `InterviewExperience` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "InterviewExperience" ADD COLUMN     "interviewDate" TIMESTAMP(3) NOT NULL;
