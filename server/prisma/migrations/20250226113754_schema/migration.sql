/*
  Warnings:

  - The primary key for the `Post` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Added the required column `degree` to the `Post` table without a default value. This is not possible if the table is not empty.
  - The required column `id` was added to the `Post` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `name` to the `Post` table without a default value. This is not possible if the table is not empty.
  - Added the required column `year` to the `Post` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Post" DROP CONSTRAINT "Post_pkey",
ADD COLUMN     "degree" TEXT NOT NULL,
ADD COLUMN     "id" TEXT NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "year" INTEGER NOT NULL,
ADD CONSTRAINT "Post_pkey" PRIMARY KEY ("id");
