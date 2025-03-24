/*
  Warnings:

  - Added the required column `email` to the `InterviewExperience` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "InterviewExperience" ADD COLUMN     "email" TEXT NOT NULL;
