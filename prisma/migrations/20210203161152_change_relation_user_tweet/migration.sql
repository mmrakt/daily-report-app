/*
  Warnings:

  - You are about to drop the column `customeId` on the `User` table. All the data in the column will be lost.
  - The migration will add a unique constraint covering the columns `[id]` on the table `User`. If there are existing duplicate values, the migration will fail.
  - The migration will add a unique constraint covering the columns `[customId]` on the table `User`. If there are existing duplicate values, the migration will fail.
  - Added the required column `customId` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "User.customeId_unique";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "customeId",
ADD COLUMN     "customId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Tweet" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "content" TEXT NOT NULL,
    "userId" TEXT,

    PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User.id_unique" ON "User"("id");

-- CreateIndex
CREATE UNIQUE INDEX "User.customId_unique" ON "User"("customId");

-- AddForeignKey
ALTER TABLE "Tweet" ADD FOREIGN KEY ("userId") REFERENCES "User"("customId") ON DELETE SET NULL ON UPDATE CASCADE;
