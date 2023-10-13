/*
  Warnings:

  - A unique constraint covering the columns `[title]` on the table `categorys` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "categorys_title_key" ON "categorys"("title");
