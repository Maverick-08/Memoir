-- CreateTable
CREATE TABLE "PersonalInterviews" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "email" TEXT NOT NULL,
    "companyName" TEXT NOT NULL,
    "experienceType" TEXT NOT NULL,
    "interviewStatus" TEXT NOT NULL,
    "interviewExperienceId" TEXT,

    CONSTRAINT "PersonalInterviews_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Reviews" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "message" TEXT NOT NULL,

    CONSTRAINT "Reviews_pkey" PRIMARY KEY ("id")
);
