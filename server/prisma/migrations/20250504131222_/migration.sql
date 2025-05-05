-- AlterTable
ALTER TABLE "UserStat" ADD COLUMN     "savedPostCount" INTEGER NOT NULL DEFAULT 0;

-- CreateTable
CREATE TABLE "PostImpression" (
    "id" TEXT NOT NULL,
    "postId" TEXT NOT NULL,
    "userIds" TEXT[],

    CONSTRAINT "PostImpression_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "PostImpression_postId_key" ON "PostImpression"("postId");

-- AddForeignKey
ALTER TABLE "PostImpression" ADD CONSTRAINT "PostImpression_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
