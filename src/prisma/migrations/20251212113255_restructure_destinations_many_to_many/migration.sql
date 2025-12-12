/*
  Warnings:

  - You are about to drop the column `cityId` on the `destination` table. All the data in the column will be lost.
  - You are about to drop the column `countryId` on the `destination` table. All the data in the column will be lost.
  - You are about to drop the column `stateId` on the `destination` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `destination` DROP FOREIGN KEY `Destination_cityId_fkey`;

-- DropForeignKey
ALTER TABLE `destination` DROP FOREIGN KEY `Destination_countryId_fkey`;

-- DropForeignKey
ALTER TABLE `destination` DROP FOREIGN KEY `Destination_stateId_fkey`;

-- DropIndex
DROP INDEX `Destination_cityId_idx` ON `destination`;

-- DropIndex
DROP INDEX `Destination_countryId_fkey` ON `destination`;

-- DropIndex
DROP INDEX `Destination_stateId_fkey` ON `destination`;

-- AlterTable
ALTER TABLE `destination` DROP COLUMN `cityId`,
    DROP COLUMN `countryId`,
    DROP COLUMN `stateId`,
    ADD COLUMN `description` TEXT NULL;

-- CreateTable
CREATE TABLE `DestinationCountry` (
    `id` VARCHAR(191) NOT NULL,
    `destinationId` VARCHAR(191) NOT NULL,
    `countryId` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `DestinationCountry_destinationId_idx`(`destinationId`),
    INDEX `DestinationCountry_countryId_idx`(`countryId`),
    UNIQUE INDEX `DestinationCountry_destinationId_countryId_key`(`destinationId`, `countryId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `DestinationState` (
    `id` VARCHAR(191) NOT NULL,
    `destinationId` VARCHAR(191) NOT NULL,
    `stateId` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `DestinationState_destinationId_idx`(`destinationId`),
    INDEX `DestinationState_stateId_idx`(`stateId`),
    UNIQUE INDEX `DestinationState_destinationId_stateId_key`(`destinationId`, `stateId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `DestinationCity` (
    `id` VARCHAR(191) NOT NULL,
    `destinationId` VARCHAR(191) NOT NULL,
    `cityId` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `DestinationCity_destinationId_idx`(`destinationId`),
    INDEX `DestinationCity_cityId_idx`(`cityId`),
    UNIQUE INDEX `DestinationCity_destinationId_cityId_key`(`destinationId`, `cityId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `DestinationPackage` (
    `id` VARCHAR(191) NOT NULL,
    `destinationId` VARCHAR(191) NOT NULL,
    `packageId` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `DestinationPackage_destinationId_idx`(`destinationId`),
    INDEX `DestinationPackage_packageId_idx`(`packageId`),
    UNIQUE INDEX `DestinationPackage_destinationId_packageId_key`(`destinationId`, `packageId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `DestinationPackageType` (
    `id` VARCHAR(191) NOT NULL,
    `destinationId` VARCHAR(191) NOT NULL,
    `packageTypeId` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `DestinationPackageType_destinationId_idx`(`destinationId`),
    INDEX `DestinationPackageType_packageTypeId_idx`(`packageTypeId`),
    UNIQUE INDEX `DestinationPackageType_destinationId_packageTypeId_key`(`destinationId`, `packageTypeId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE INDEX `Destination_name_idx` ON `Destination`(`name`);

-- AddForeignKey
ALTER TABLE `DestinationCountry` ADD CONSTRAINT `DestinationCountry_destinationId_fkey` FOREIGN KEY (`destinationId`) REFERENCES `Destination`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `DestinationCountry` ADD CONSTRAINT `DestinationCountry_countryId_fkey` FOREIGN KEY (`countryId`) REFERENCES `Country`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `DestinationState` ADD CONSTRAINT `DestinationState_destinationId_fkey` FOREIGN KEY (`destinationId`) REFERENCES `Destination`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `DestinationState` ADD CONSTRAINT `DestinationState_stateId_fkey` FOREIGN KEY (`stateId`) REFERENCES `State`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `DestinationCity` ADD CONSTRAINT `DestinationCity_destinationId_fkey` FOREIGN KEY (`destinationId`) REFERENCES `Destination`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `DestinationCity` ADD CONSTRAINT `DestinationCity_cityId_fkey` FOREIGN KEY (`cityId`) REFERENCES `City`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `DestinationPackage` ADD CONSTRAINT `DestinationPackage_destinationId_fkey` FOREIGN KEY (`destinationId`) REFERENCES `Destination`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `DestinationPackage` ADD CONSTRAINT `DestinationPackage_packageId_fkey` FOREIGN KEY (`packageId`) REFERENCES `Package`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `DestinationPackageType` ADD CONSTRAINT `DestinationPackageType_destinationId_fkey` FOREIGN KEY (`destinationId`) REFERENCES `Destination`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `DestinationPackageType` ADD CONSTRAINT `DestinationPackageType_packageTypeId_fkey` FOREIGN KEY (`packageTypeId`) REFERENCES `PackageType`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
