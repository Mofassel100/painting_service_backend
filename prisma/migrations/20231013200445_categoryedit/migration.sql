/*
  Warnings:

  - Added the required column `name` to the `categorys` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "categorys" ADD COLUMN     "name" TEXT NOT NULL;
