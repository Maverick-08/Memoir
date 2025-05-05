/*
  Warnings:

  - You are about to drop the column `userIds` on the `PostImpression` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[postId,userId]` on the table `PostImpression` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userId` to the `PostImpression` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "PostImpression" DROP COLUMN "userIds",
ADD COLUMN     "userId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "PostImpression_postId_userId_key" ON "PostImpression"("postId", "userId");
