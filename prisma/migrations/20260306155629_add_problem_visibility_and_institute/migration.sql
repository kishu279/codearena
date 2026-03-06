-- CreateEnum
CREATE TYPE "ProblemVisibility" AS ENUM ('PUBLIC', 'INSTITUTE_ONLY');

-- AlterTable
ALTER TABLE "Problem" ADD COLUMN     "instituteId" TEXT,
ADD COLUMN     "visibility" "ProblemVisibility" NOT NULL DEFAULT 'PUBLIC';

-- CreateIndex
CREATE INDEX "Problem_instituteId_idx" ON "Problem"("instituteId");

-- CreateIndex
CREATE INDEX "Problem_visibility_idx" ON "Problem"("visibility");

-- CreateIndex
CREATE INDEX "Resource_assignmentId_idx" ON "Resource"("assignmentId");

-- AddForeignKey
ALTER TABLE "Problem" ADD CONSTRAINT "Problem_instituteId_fkey" FOREIGN KEY ("instituteId") REFERENCES "Institute"("id") ON DELETE SET NULL ON UPDATE CASCADE;
