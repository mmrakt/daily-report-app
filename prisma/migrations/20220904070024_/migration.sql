/*
  Warnings:

  - You are about to drop the column `hourId` on the `Task` table. All the data in the column will be lost.
  - You are about to drop the `Hour` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `hours` to the `Task` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Task" DROP CONSTRAINT "Task_hourId_fkey";

-- AlterTable
ALTER TABLE "Task" DROP COLUMN "hourId",
ADD COLUMN     "hours" DOUBLE PRECISION NOT NULL;

-- DropTable
DROP TABLE "Hour";
