/*
  Warnings:

  - You are about to drop the column `materia` on the `Nota` table. All the data in the column will be lost.
  - You are about to drop the column `resultado` on the `Nota` table. All the data in the column will be lost.
  - Added the required column `conteudo` to the `Nota` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Nota" DROP COLUMN "materia",
DROP COLUMN "resultado",
ADD COLUMN     "conteudo" TEXT NOT NULL;
