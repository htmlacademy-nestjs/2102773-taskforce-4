/*
  Warnings:

  - You are about to drop the column `city` on the `tasks` table. All the data in the column will be lost.
  - Added the required column `city_id` to the `tasks` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "tasks" DROP COLUMN "city",
ADD COLUMN     "city_id" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "City" (
    "city_id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "City_pkey" PRIMARY KEY ("city_id")
);

-- AddForeignKey
ALTER TABLE "tasks" ADD CONSTRAINT "tasks_city_id_fkey" FOREIGN KEY ("city_id") REFERENCES "City"("city_id") ON DELETE RESTRICT ON UPDATE CASCADE;
