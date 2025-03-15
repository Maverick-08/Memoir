/*
  Warnings:

  - Made the column `degree` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `branch` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "User" ALTER COLUMN "degree" SET NOT NULL,
ALTER COLUMN "branch" SET NOT NULL;
