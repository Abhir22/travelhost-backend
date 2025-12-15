/*
  Warnings:

  - You are about to drop the column `packageTypeId` on the `package` table. All the data in the column will be lost.
  - You are about to drop the column `packageTypeId` on the `packagecountry` table. All the data in the column will be lost.
  - You are about to drop the column `packageTypeId` on the `packagestate` table. All the data in the column will be lost.
  - Added the required column `packageType` to the `Package` table without a default value. This is not possible if the table is not empty.
  - Added the required column `packageType` to the `PackageCountry` table without a default value. This is not possible if the table is not empty.
  - Added the required column `packageType` to the `PackageState` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `destinationcity` DROP FOREIGN KEY `DestinationCity_destinationId_fkey`;

-- DropForeignKey
ALTER TABLE `destinationcountry` DROP FOREIGN KEY `DestinationCountry_destinationId_fkey`;

-- DropForeignKey
ALTER TABLE `destinationpackage` DROP FOREIGN KEY `DestinationPackage_destinationId_fkey`;

-- DropForeignKey
ALTER TABLE `destinationpackagetype` DROP FOREIGN KEY `DestinationPackageType_destinationId_fkey`;

-- DropForeignKey
ALTER TABLE `destinationstate` DROP FOREIGN KEY `DestinationState_destinationId_fkey`;

-- DropForeignKey
ALTER TABLE `package` DROP FOREIGN KEY `Package_packageTypeId_fkey`;

-- DropForeignKey
ALTER TABLE `packagecountry` DROP FOREIGN KEY `PackageCountry_packageTypeId_fkey`;

-- DropForeignKey
ALTER TABLE `packagestate` DROP FOREIGN KEY `PackageState_packageTypeId_fkey`;

-- DropIndex
DROP INDEX `DestinationCity_destinationId_cityId_key` ON `destinationcity`;

-- DropIndex
DROP INDEX `DestinationCountry_destinationId_countryId_key` ON `destinationcountry`;

-- DropIndex
DROP INDEX `DestinationPackage_destinationId_packageId_key` ON `destinationpackage`;

-- DropIndex
DROP INDEX `DestinationPackageType_destinationId_packageTypeId_key` ON `destinationpackagetype`;

-- DropIndex
DROP INDEX `DestinationState_destinationId_stateId_key` ON `destinationstate`;

-- DropIndex
DROP INDEX `Package_packageTypeId_fkey` ON `package`;

-- DropIndex
DROP INDEX `PackageCountry_packageTypeId_countryId_key` ON `packagecountry`;

-- DropIndex
DROP INDEX `PackageState_packageTypeId_stateId_key` ON `packagestate`;

-- AlterTable
ALTER TABLE `package` DROP COLUMN `packageTypeId`,
    ADD COLUMN `packageType` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `packagecountry` DROP COLUMN `packageTypeId`,
    ADD COLUMN `packageType` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `packagestate` DROP COLUMN `packageTypeId`,
    ADD COLUMN `packageType` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `Sightseeing` ADD CONSTRAINT `Sightseeing_cityId_fkey` FOREIGN KEY (`cityId`) REFERENCES `City`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Hotel` ADD CONSTRAINT `Hotel_hotelTypeId_fkey` FOREIGN KEY (`hotelTypeId`) REFERENCES `HotelType`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `HotelSightseeing` ADD CONSTRAINT `HotelSightseeing_hotelId_fkey` FOREIGN KEY (`hotelId`) REFERENCES `Hotel`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `HotelRoom` ADD CONSTRAINT `HotelRoom_hotelId_fkey` FOREIGN KEY (`hotelId`) REFERENCES `Hotel`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `DestinationCountry` ADD CONSTRAINT `DestinationCountry_destinationId_fkey` FOREIGN KEY (`destinationId`) REFERENCES `Destination`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
