/*
  Warnings:

  - You are about to drop the `city` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "city" DROP CONSTRAINT "city_task_id_fkey";

-- AlterTable
ALTER TABLE "tasks" ADD COLUMN     "city" TEXT NOT NULL DEFAULT 'Санкт-Петербург';

-- DropTable
DROP TABLE "city";
