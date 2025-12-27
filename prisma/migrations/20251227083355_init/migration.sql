-- CreateEnum
CREATE TYPE "PostStatus" AS ENUM ('DRAFT', 'ARCHIVED', 'PUBLISHED');

-- CreateEnum
CREATE TYPE "CommetStatus" AS ENUM ('APPROVED', 'REJECT');

-- CreateTable
CREATE TABLE "postes" (
    "id" UUID NOT NULL,
    "title" VARCHAR(150) NOT NULL,
    "content" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "isFeatured" BOOLEAN NOT NULL DEFAULT false,
    "authorId" TEXT NOT NULL,
    "thumbnail" TEXT,
    "status" "PostStatus" NOT NULL DEFAULT 'PUBLISHED',
    "tags" TEXT[],
    "views" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "postes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Comments" (
    "id" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "authorId" TEXT NOT NULL,
    "postId" TEXT NOT NULL,
    "parentId" TEXT,
    "stsus" "CommetStatus" NOT NULL DEFAULT 'APPROVED',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Comments_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "postes_authorId_idx" ON "postes"("authorId");

-- CreateIndex
CREATE INDEX "Comments_authorId_idx" ON "Comments"("authorId");

-- CreateIndex
CREATE INDEX "Comments_postId_idx" ON "Comments"("postId");

-- AddForeignKey
ALTER TABLE "Comments" ADD CONSTRAINT "Comments_postId_fkey" FOREIGN KEY ("postId") REFERENCES "postes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comments" ADD CONSTRAINT "Comments_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "Comments"("id") ON DELETE SET NULL ON UPDATE CASCADE;
