/*
  Warnings:

  - You are about to drop the `Tweet` table. If the table is not empty, all the data it contains will be lost.
  - The migration will add a unique constraint covering the columns `[customeId]` on the table `User`. If there are existing duplicate values, the migration will fail.
  - Added the required column `customeId` to the `User` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `id` on the `User` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "Tweet" DROP CONSTRAINT "Tweet_userId_fkey";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "customeId" TEXT NOT NULL,
DROP COLUMN "id",
ADD COLUMN     "id" INTEGER NOT NULL;

-- DropTable
DROP TABLE "Tweet";

-- CreateIndex
CREATE UNIQUE INDEX "User.customeId_unique" ON "User"("customeId");
