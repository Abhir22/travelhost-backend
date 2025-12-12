/*
  Warnings:

  - You are about to drop the column `countryId` on the `hotel` table. All the data in the column will be lost.
  - You are about to drop the column `sightseeingId` on the `hotel` table. All the data in the column will be lost.
  - You are about to drop the column `stateId` on the `hotel` table. All the data in the column will be lost.
  - You are about to drop the column `countryId` on the `sightseeing` table. All the data in the column will be lost.
  - You are about to drop the column `stateId` on the `sightseeing` table. All the data in the column will be lost.
  - You are about to drop the column `countryId` on the `traveltype` table. All the data in the column will be lost.
  - You are about to drop the column `stateId` on the `traveltype` table. All the data in the column will be lost.
  - You are about to drop the `travelmode` table. If the table is not empty, all the data it contains will be lost.
  - Made the column `cityId` on table `destination` required. This step will fail if there are existing NULL values in that column.
  - Made the column `cityId` on table `sightseeing` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `destination` DROP FOREIGN KEY `Destination_cityId_fkey`;

-- DropForeignKey
ALTER TABLE `hotel` DROP FOREIGN KEY `Hotel_countryId_fkey`;

-- DropForeignKey
ALTER TABLE `hotel` DROP FOREIGN KEY `Hotel_sightseeingId_fkey`;

-- DropForeignKey
ALTER TABLE `hotel` DROP FOREIGN KEY `Hotel_stateId_fkey`;

-- DropForeignKey
ALTER TABLE `sightseeing` DROP FOREIGN KEY `Sightseeing_cityId_fkey`;

-- DropForeignKey
ALTER TABLE `sightseeing` DROP FOREIGN KEY `Sightseeing_countryId_fkey`;

-- DropForeignKey
ALTER TABLE `sightseeing` DROP FOREIGN KEY `Sightseeing_stateId_fkey`;

-- DropForeignKey
ALTER TABLE `travelmode` DROP FOREIGN KEY `TravelMode_cityId_fkey`;

-- DropForeignKey
ALTER TABLE `travelmode` DROP FOREIGN KEY `TravelMode_countryId_fkey`;

-- DropForeignKey
ALTER TABLE `travelmode` DROP FOREIGN KEY `TravelMode_sightseeingId_fkey`;

-- DropForeignKey
ALTER TABLE `travelmode` DROP FOREIGN KEY `TravelMode_stateId_fkey`;

-- DropForeignKey
ALTER TABLE `travelmode` DROP FOREIGN KEY `TravelMode_travelTypeId_fkey`;

-- DropForeignKey
ALTER TABLE `traveltype` DROP FOREIGN KEY `TravelType_countryId_fkey`;

-- DropForeignKey
ALTER TABLE `traveltype` DROP FOREIGN KEY `TravelType_stateId_fkey`;

-- DropIndex
DROP INDEX `Hotel_countryId_fkey` ON `hotel`;

-- DropIndex
DROP INDEX `Hotel_sightseeingId_fkey` ON `hotel`;

-- DropIndex
DROP INDEX `Hotel_stateId_fkey` ON `hotel`;

-- DropIndex
DROP INDEX `Sightseeing_countryId_fkey` ON `sightseeing`;

-- DropIndex
DROP INDEX `Sightseeing_stateId_fkey` ON `sightseeing`;

-- DropIndex
DROP INDEX `TravelType_countryId_fkey` ON `traveltype`;

-- DropIndex
DROP INDEX `TravelType_stateId_fkey` ON `traveltype`;

-- AlterTable
ALTER TABLE `destination` MODIFY `cityId` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `hotel` DROP COLUMN `countryId`,
    DROP COLUMN `sightseeingId`,
    DROP COLUMN `stateId`;

-- AlterTable
ALTER TABLE `sightseeing` DROP COLUMN `countryId`,
    DROP COLUMN `stateId`,
    MODIFY `cityId` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `traveltype` DROP COLUMN `countryId`,
    DROP COLUMN `stateId`;

-- DropTable
DROP TABLE `travelmode`;

-- CreateTable
CREATE TABLE `HotelSightseeing` (
    `id` VARCHAR(191) NOT NULL,
    `hotelId` VARCHAR(191) NOT NULL,
    `sightseeingId` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `HotelSightseeing_hotelId_idx`(`hotelId`),
    INDEX `HotelSightseeing_sightseeingId_idx`(`sightseeingId`),
    UNIQUE INDEX `HotelSightseeing_hotelId_sightseeingId_key`(`hotelId`, `sightseeingId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TransferMode` (
    `id` VARCHAR(191) NOT NULL,
    `cityId` VARCHAR(191) NOT NULL,
    `sightseeingId` VARCHAR(191) NULL,
    `travelTypeId` VARCHAR(191) NULL,
    `name` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `TransferMode_cityId_idx`(`cityId`),
    INDEX `TransferMode_sightseeingId_idx`(`sightseeingId`),
    INDEX `TransferMode_travelTypeId_idx`(`travelTypeId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE INDEX `City_name_idx` ON `City`(`name`);

-- CreateIndex
CREATE INDEX `Country_name_idx` ON `Country`(`name`);

-- CreateIndex
CREATE INDEX `Destination_destinationType_idx` ON `Destination`(`destinationType`);

-- CreateIndex
CREATE INDEX `Hotel_name_idx` ON `Hotel`(`name`);

-- CreateIndex
CREATE INDEX `Sightseeing_name_idx` ON `Sightseeing`(`name`);

-- CreateIndex
CREATE INDEX `State_name_idx` ON `State`(`name`);

-- AddForeignKey
ALTER TABLE `Sightseeing` ADD CONSTRAINT `Sightseeing_cityId_fkey` FOREIGN KEY (`cityId`) REFERENCES `City`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `HotelSightseeing` ADD CONSTRAINT `HotelSightseeing_hotelId_fkey` FOREIGN KEY (`hotelId`) REFERENCES `Hotel`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `HotelSightseeing` ADD CONSTRAINT `HotelSightseeing_sightseeingId_fkey` FOREIGN KEY (`sightseeingId`) REFERENCES `Sightseeing`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TransferMode` ADD CONSTRAINT `TransferMode_cityId_fkey` FOREIGN KEY (`cityId`) REFERENCES `City`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TransferMode` ADD CONSTRAINT `TransferMode_sightseeingId_fkey` FOREIGN KEY (`sightseeingId`) REFERENCES `Sightseeing`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TransferMode` ADD CONSTRAINT `TransferMode_travelTypeId_fkey` FOREIGN KEY (`travelTypeId`) REFERENCES `TravelType`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Destination` ADD CONSTRAINT `Destination_cityId_fkey` FOREIGN KEY (`cityId`) REFERENCES `City`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- RenameIndex
ALTER TABLE `city` RENAME INDEX `City_countryId_fkey` TO `City_countryId_idx`;

-- RenameIndex
ALTER TABLE `city` RENAME INDEX `City_stateId_fkey` TO `City_stateId_idx`;

-- RenameIndex
ALTER TABLE `destination` RENAME INDEX `Destination_cityId_fkey` TO `Destination_cityId_idx`;

-- RenameIndex
ALTER TABLE `hotel` RENAME INDEX `Hotel_cityId_fkey` TO `Hotel_cityId_idx`;

-- RenameIndex
ALTER TABLE `hotel` RENAME INDEX `Hotel_hotelTypeId_fkey` TO `Hotel_hotelTypeId_idx`;

-- RenameIndex
ALTER TABLE `sightseeing` RENAME INDEX `Sightseeing_cityId_fkey` TO `Sightseeing_cityId_idx`;

-- RenameIndex
ALTER TABLE `state` RENAME INDEX `State_countryId_fkey` TO `State_countryId_idx`;

-- RenameIndex
ALTER TABLE `traveltype` RENAME INDEX `TravelType_cityId_fkey` TO `TravelType_cityId_idx`;

-- RenameIndex
ALTER TABLE `traveltype` RENAME INDEX `TravelType_hotelId_fkey` TO `TravelType_hotelId_idx`;

-- RenameIndex
ALTER TABLE `traveltype` RENAME INDEX `TravelType_sightseeingId_fkey` TO `TravelType_sightseeingId_idx`;
