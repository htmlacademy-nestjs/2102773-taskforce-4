/*
  Warnings:

  - You are about to drop the column `city` on the `tasks` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "tasks" DROP COLUMN "city";

-- CreateTable
CREATE TABLE "city" (
    "comment_id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "task_id" INTEGER NOT NULL,

    CONSTRAINT "city_pkey" PRIMARY KEY ("comment_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "city_task_id_key" ON "city"("task_id");

-- AddForeignKey
ALTER TABLE "city" ADD CONSTRAINT "city_task_id_fkey" FOREIGN KEY ("task_id") REFERENCES "tasks"("task_id") ON DELETE CASCADE ON UPDATE CASCADE;
