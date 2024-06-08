/*
  Warnings:

  - Added the required column `ownerID` to the `Exhibit` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Exhibit` ADD COLUMN `ownerID` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `Exhibit` ADD CONSTRAINT `Exhibit_ownerID_fkey` FOREIGN KEY (`ownerID`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
