-- CreateTable
CREATE TABLE "User" (
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT,
    "degree" TEXT,
    "branch" TEXT,
    "yearOfPassingOut" INTEGER,
    "isVerified" BOOLEAN NOT NULL,
    "linkedIn" TEXT,
    "xHandle" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("email")
);

-- CreateTable
CREATE TABLE "Post" (
    "email" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "message" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Post_pkey" PRIMARY KEY ("email")
);

-- CreateTable
CREATE TABLE "InterviewExperience" (
    "email" TEXT NOT NULL,
    "companyName" TEXT NOT NULL,
    "compensation" INTEGER NOT NULL,
    "interviewStatus" TEXT NOT NULL,
    "year" TIMESTAMP(3) NOT NULL,
    "roundDetails" JSONB[],

    CONSTRAINT "InterviewExperience_pkey" PRIMARY KEY ("email")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_email_fkey" FOREIGN KEY ("email") REFERENCES "User"("email") ON DELETE RESTRICT ON UPDATE CASCADE;
