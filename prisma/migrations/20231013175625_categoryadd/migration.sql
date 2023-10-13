-- CreateTable
CREATE TABLE "categorys" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "image" TEXT,
    "userId" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "categorys_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "categorys" ADD CONSTRAINT "categorys_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
