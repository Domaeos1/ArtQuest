/*
  Warnings:

  - Added the required column `user` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `User` ADD COLUMN `user` VARCHAR(191) NOT NULL;
