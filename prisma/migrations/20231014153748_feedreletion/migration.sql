-- AddForeignKey
ALTER TABLE "feedback" ADD CONSTRAINT "feedback_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "service"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
