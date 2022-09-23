/*
  Warnings:

  - You are about to drop the `_CategoryToRole` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_ProjectToRole` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "STATUS" AS ENUM ('enable', 'disable');

-- DropForeignKey
ALTER TABLE "_CategoryToRole" DROP CONSTRAINT "_CategoryToRole_A_fkey";

-- DropForeignKey
ALTER TABLE "_CategoryToRole" DROP CONSTRAINT "_CategoryToRole_B_fkey";

-- DropForeignKey
ALTER TABLE "_ProjectToRole" DROP CONSTRAINT "_ProjectToRole_A_fkey";

-- DropForeignKey
ALTER TABLE "_ProjectToRole" DROP CONSTRAINT "_ProjectToRole_B_fkey";

-- DropIndex
-- DROP INDEX "Category_id_key";

-- -- DropIndex
-- DROP INDEX "Project_id_key";

-- -- DropIndex
-- DROP INDEX "Role_id_key";

-- -- DropIndex
-- DROP INDEX "User_id_key";

-- AlterTable
ALTER TABLE "Category" ADD COLUMN     "status" "STATUS" NOT NULL DEFAULT 'enable';

-- AlterTable
ALTER TABLE "Project" ADD COLUMN     "status" "STATUS" NOT NULL DEFAULT 'enable';

-- DropTable
DROP TABLE "_CategoryToRole";

-- DropTable
DROP TABLE "_ProjectToRole";
