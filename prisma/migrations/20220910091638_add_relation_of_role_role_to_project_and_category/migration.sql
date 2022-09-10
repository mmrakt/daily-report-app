-- AlterTable
ALTER TABLE "Category" ADD CONSTRAINT "Category_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Project" ADD CONSTRAINT "Project_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Role" ADD CONSTRAINT "Role_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "User" ADD CONSTRAINT "User_pkey" PRIMARY KEY ("id");

-- CreateTable
CREATE TABLE "CategoriesOnRoles" (
    "categoryId" INTEGER NOT NULL,
    "roleId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CategoriesOnRoles_pkey" PRIMARY KEY ("categoryId","roleId")
);

-- CreateTable
CREATE TABLE "ProjectsOnRoles" (
    "projectId" INTEGER NOT NULL,
    "roleId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ProjectsOnRoles_pkey" PRIMARY KEY ("projectId","roleId")
);

-- CreateTable
CREATE TABLE "_CategoryToRole" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_ProjectToRole" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_CategoryToRole_AB_unique" ON "_CategoryToRole"("A", "B");

-- CreateIndex
CREATE INDEX "_CategoryToRole_B_index" ON "_CategoryToRole"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_ProjectToRole_AB_unique" ON "_ProjectToRole"("A", "B");

-- CreateIndex
CREATE INDEX "_ProjectToRole_B_index" ON "_ProjectToRole"("B");

-- AddForeignKey
ALTER TABLE "CategoriesOnRoles" ADD CONSTRAINT "CategoriesOnRoles_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CategoriesOnRoles" ADD CONSTRAINT "CategoriesOnRoles_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "Role"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProjectsOnRoles" ADD CONSTRAINT "ProjectsOnRoles_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProjectsOnRoles" ADD CONSTRAINT "ProjectsOnRoles_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "Role"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CategoryToRole" ADD CONSTRAINT "_CategoryToRole_A_fkey" FOREIGN KEY ("A") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CategoryToRole" ADD CONSTRAINT "_CategoryToRole_B_fkey" FOREIGN KEY ("B") REFERENCES "Role"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProjectToRole" ADD CONSTRAINT "_ProjectToRole_A_fkey" FOREIGN KEY ("A") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProjectToRole" ADD CONSTRAINT "_ProjectToRole_B_fkey" FOREIGN KEY ("B") REFERENCES "Role"("id") ON DELETE CASCADE ON UPDATE CASCADE;
