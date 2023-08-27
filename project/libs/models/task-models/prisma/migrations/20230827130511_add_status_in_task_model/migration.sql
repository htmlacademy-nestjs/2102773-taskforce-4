-- AlterTable
ALTER TABLE "tasks" ADD COLUMN     "contractor_id" TEXT,
ADD COLUMN     "status" TEXT NOT NULL DEFAULT 'Новое',
ADD COLUMN     "users_response_id" TEXT[] DEFAULT ARRAY[]::TEXT[];
