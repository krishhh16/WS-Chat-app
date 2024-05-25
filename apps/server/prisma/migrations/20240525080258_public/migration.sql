/*
  Warnings:

  - Added the required column `followUserId` to the `UserDetails` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "UserDetails" DROP CONSTRAINT "UserDetails_userId_fkey";

-- AlterTable
ALTER TABLE "UserDetails" ADD COLUMN     "followUserId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "UserDetails" ADD CONSTRAINT "UserDetails_followUserId_fkey" FOREIGN KEY ("followUserId") REFERENCES "User"("userID") ON DELETE RESTRICT ON UPDATE CASCADE;
