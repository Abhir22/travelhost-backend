/*
  Warnings:

  - You are about to drop the column `cityId` on the `traveltype` table. All the data in the column will be lost.
  - You are about to drop the column `hotelId` on the `traveltype` table. All the data in the column will be lost.
  - You are about to drop the column `sightseeingId` on the `traveltype` table. All the data in the column will be lost.
  - You are about to drop the `packagemealtype` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `packagemealtype` DROP FOREIGN KEY `PackageMealType_mealTypeId_fkey`;

-- DropForeignKey
ALTER TABLE `packagemealtype` DROP FOREIGN KEY `PackageMealType_packageId_fkey`;

-- DropForeignKey
ALTER TABLE `traveltype` DROP FOREIGN KEY `TravelType_cityId_fkey`;

-- DropForeignKey
ALTER TABLE `traveltype` DROP FOREIGN KEY `TravelType_hotelId_fkey`;

-- DropForeignKey
ALTER TABLE `traveltype` DROP FOREIGN KEY `TravelType_sightseeingId_fkey`;

-- DropIndex
DROP INDEX `TravelType_cityId_idx` ON `traveltype`;

-- DropIndex
DROP INDEX `TravelType_hotelId_idx` ON `traveltype`;

-- DropIndex
DROP INDEX `TravelType_sightseeingId_idx` ON `traveltype`;

-- AlterTable
ALTER TABLE `traveltype` DROP COLUMN `cityId`,
    DROP COLUMN `hotelId`,
    DROP COLUMN `sightseeingId`;

-- DropTable
DROP TABLE `packagemealtype`;

-- CreateTable
CREATE TABLE `VehicleType` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `vehicleCategory` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
