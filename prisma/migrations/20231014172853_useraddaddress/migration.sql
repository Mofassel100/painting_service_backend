-- AlterTable
ALTER TABLE "users" ADD COLUMN     "address" TEXT,
ADD COLUMN     "dateOfBirth" TEXT,
ALTER COLUMN "name" DROP NOT NULL;
