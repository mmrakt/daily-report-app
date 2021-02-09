-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "profile" TEXT,
    "avatarUrl" TEXT
);

-- CreateIndex
CREATE UNIQUE INDEX "User.id_unique" ON "User"("id");
