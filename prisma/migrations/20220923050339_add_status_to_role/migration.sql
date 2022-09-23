/*
  Warnings:

  - The `status` column on the `Category` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `status` column on the `Project` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "Status" AS ENUM ('enable', 'disable');

-- DropIndex
-- DROP INDEX "Category_id_key";

-- -- DropIndex
-- DROP INDEX "Project_id_key";

-- -- DropIndex
-- DROP INDEX "Role_id_key";

-- -- DropIndex
-- DROP INDEX "User_id_key";

-- AlterTable
ALTER TABLE "Category" DROP COLUMN "status",
ADD COLUMN     "status" "Status" NOT NULL DEFAULT 'enable';

-- AlterTable
ALTER TABLE "Project" DROP COLUMN "status",
ADD COLUMN     "status" "Status" NOT NULL DEFAULT 'enable';

-- AlterTable
ALTER TABLE "Role" ADD COLUMN     "status" "Status" NOT NULL DEFAULT 'enable';

-- DropEnum
DROP TYPE "STATUS";
