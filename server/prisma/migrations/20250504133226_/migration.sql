/*
  Warnings:

  - You are about to drop the `UserStat` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "PostImpression" DROP CONSTRAINT "PostImpression_postId_fkey";

-- DropForeignKey
ALTER TABLE "UserStat" DROP CONSTRAINT "UserStat_userId_fkey";

-- DropIndex
DROP INDEX "PostImpression_postId_key";

-- DropIndex
DROP INDEX "SavedPost_postId_key";

-- AlterTable
ALTER TABLE "PostImpression" ALTER COLUMN "userIds" SET NOT NULL,
ALTER COLUMN "userIds" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "profileViews" INTEGER NOT NULL DEFAULT 0;

-- DropTable
DROP TABLE "UserStat";

-- AddForeignKey
ALTER TABLE "PostImpression" ADD CONSTRAINT "PostImpression_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SavedPost" ADD CONSTRAINT "SavedPost_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE CASCADE ON UPDATE CASCADE;
