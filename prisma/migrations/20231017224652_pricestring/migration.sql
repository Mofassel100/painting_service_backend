-- AlterTable
ALTER TABLE "service" ALTER COLUMN "price" DROP NOT NULL,
ALTER COLUMN "price" SET DATA TYPE TEXT,
ALTER COLUMN "oldPrice" DROP NOT NULL,
ALTER COLUMN "oldPrice" SET DATA TYPE TEXT;