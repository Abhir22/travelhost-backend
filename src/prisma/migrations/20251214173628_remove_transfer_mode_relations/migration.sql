/*
  Warnings:

  - You are about to drop the column `cityId` on the `transfermode` table. All the data in the column will be lost.
  - You are about to drop the column `sightseeingId` on the `transfermode` table. All the data in the column will be lost.
  - You are about to drop the column `travelTypeId` on the `transfermode` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `transfermode` DROP FOREIGN KEY `TransferMode_cityId_fkey`;

-- DropForeignKey
ALTER TABLE `transfermode` DROP FOREIGN KEY `TransferMode_sightseeingId_fkey`;

-- DropForeignKey
ALTER TABLE `transfermode` DROP FOREIGN KEY `TransferMode_travelTypeId_fkey`;

-- DropIndex
DROP INDEX `TransferMode_cityId_idx` ON `transfermode`;

-- DropIndex
DROP INDEX `TransferMode_sightseeingId_idx` ON `transfermode`;

-- DropIndex
DROP INDEX `TransferMode_travelTypeId_idx` ON `transfermode`;

-- AlterTable
ALTER TABLE `transfermode` DROP COLUMN `cityId`,
    DROP COLUMN `sightseeingId`,
    DROP COLUMN `travelTypeId`;
