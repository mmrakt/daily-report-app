-- CreateEnum
CREATE TYPE "Privilege" AS ENUM ('admin', 'user');

-- AlterTable
ALTER TABLE "Role" ADD COLUMN     "privilege" "Privilege" NOT NULL DEFAULT 'user';
