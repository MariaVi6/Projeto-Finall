/*
  Warnings:

  - You are about to drop the column `valor` on the `Nota` table. All the data in the column will be lost.
  - Added the required column `resultado` to the `Nota` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nome` to the `Usuario` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Nota" DROP COLUMN "valor",
ADD COLUMN     "resultado" DOUBLE PRECISION NOT NULL;

-- AlterTable
ALTER TABLE "public"."Usuario" ADD COLUMN     "nome" TEXT NOT NULL;
