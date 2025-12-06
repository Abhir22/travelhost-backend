-- DropForeignKey
ALTER TABLE `hotelroom` DROP FOREIGN KEY `HotelRoom_hotelId_fkey`;

-- DropForeignKey
ALTER TABLE `hotelroom` DROP FOREIGN KEY `HotelRoom_roomTypeId_fkey`;

-- DropForeignKey
ALTER TABLE `roomimage` DROP FOREIGN KEY `RoomImage_hotelRoomId_fkey`;

-- DropIndex
DROP INDEX `HotelRoom_hotelId_roomNumber_key` ON `hotelroom`;

-- DropIndex
DROP INDEX `HotelRoom_roomTypeId_fkey` ON `hotelroom`;

-- DropIndex
DROP INDEX `RoomImage_hotelRoomId_fkey` ON `roomimage`;

-- AlterTable
ALTER TABLE `hotelroom` MODIFY `description` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `roomtype` MODIFY `description` VARCHAR(191) NULL;

-- CreateTable
CREATE TABLE `PackageType` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `image` VARCHAR(191) NULL,
    `isInternational` BOOLEAN NOT NULL DEFAULT false,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `PackageType_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PackageCategory` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `icon` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `PackageCategory_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PackageCategoryMapping` (
    `id` VARCHAR(191) NOT NULL,
    `packageId` VARCHAR(191) NOT NULL,
    `categoryId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PackageActivity` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `image` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `PackageActivity_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PackageActivityMapping` (
    `id` VARCHAR(191) NOT NULL,
    `packageId` VARCHAR(191) NOT NULL,
    `activityId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PackageSnapshot` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `icon` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `PackageSnapshot_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PackageSnapshotMapping` (
    `id` VARCHAR(191) NOT NULL,
    `packageId` VARCHAR(191) NOT NULL,
    `snapshotId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Package` (
    `id` VARCHAR(191) NOT NULL,
    `packageTypeId` VARCHAR(191) NOT NULL,
    `packageName` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NULL,
    `video` VARCHAR(191) NULL,
    `basePrice` DECIMAL(65, 30) NULL,
    `days` INTEGER NOT NULL,
    `nights` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PackageCity` (
    `id` VARCHAR(191) NOT NULL,
    `packageId` VARCHAR(191) NOT NULL,
    `countryId` VARCHAR(191) NOT NULL,
    `stateId` VARCHAR(191) NULL,
    `cityId` VARCHAR(191) NOT NULL,
    `totalDays` INTEGER NOT NULL,
    `totalNights` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PackageCityDay` (
    `id` VARCHAR(191) NOT NULL,
    `packageCityId` VARCHAR(191) NOT NULL,
    `dayNumber` INTEGER NOT NULL,
    `startTime` VARCHAR(191) NULL,
    `endTime` VARCHAR(191) NULL,
    `startFrom` VARCHAR(191) NULL,
    `endAt` VARCHAR(191) NULL,
    `description` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PackageCityDayTravel` (
    `id` VARCHAR(191) NOT NULL,
    `packageCityDayId` VARCHAR(191) NOT NULL,
    `type` VARCHAR(191) NOT NULL,
    `carpooling` VARCHAR(191) NULL,
    `vehicleType` VARCHAR(191) NULL,
    `timeFrom` VARCHAR(191) NULL,
    `timeTo` VARCHAR(191) NULL,
    `description` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PackageCityDaySightseeing` (
    `id` VARCHAR(191) NOT NULL,
    `packageCityDayId` VARCHAR(191) NOT NULL,
    `sightseeingName` VARCHAR(191) NOT NULL,
    `ticket` VARCHAR(191) NULL,
    `timeFrom` VARCHAR(191) NULL,
    `timeTo` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PackageCityDayHotel` (
    `id` VARCHAR(191) NOT NULL,
    `packageCityDayId` VARCHAR(191) NOT NULL,
    `hotelName` VARCHAR(191) NOT NULL,
    `starRating` INTEGER NOT NULL,
    `hotelType` VARCHAR(191) NULL,
    `checkInTime` VARCHAR(191) NULL,
    `checkOutTime` VARCHAR(191) NULL,
    `roomType` VARCHAR(191) NULL,
    `numberOfRooms` INTEGER NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PackageCityDayMeal` (
    `id` VARCHAR(191) NOT NULL,
    `packageCityDayId` VARCHAR(191) NOT NULL,
    `mealType` VARCHAR(191) NOT NULL,
    `provider` VARCHAR(191) NOT NULL,
    `time` VARCHAR(191) NULL,
    `description` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `HotelRoom` ADD CONSTRAINT `HotelRoom_hotelId_fkey` FOREIGN KEY (`hotelId`) REFERENCES `Hotel`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `HotelRoom` ADD CONSTRAINT `HotelRoom_roomTypeId_fkey` FOREIGN KEY (`roomTypeId`) REFERENCES `RoomType`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `RoomImage` ADD CONSTRAINT `RoomImage_hotelRoomId_fkey` FOREIGN KEY (`hotelRoomId`) REFERENCES `HotelRoom`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PackageCategoryMapping` ADD CONSTRAINT `PackageCategoryMapping_packageId_fkey` FOREIGN KEY (`packageId`) REFERENCES `Package`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PackageCategoryMapping` ADD CONSTRAINT `PackageCategoryMapping_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `PackageCategory`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PackageActivityMapping` ADD CONSTRAINT `PackageActivityMapping_packageId_fkey` FOREIGN KEY (`packageId`) REFERENCES `Package`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PackageActivityMapping` ADD CONSTRAINT `PackageActivityMapping_activityId_fkey` FOREIGN KEY (`activityId`) REFERENCES `PackageActivity`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PackageSnapshotMapping` ADD CONSTRAINT `PackageSnapshotMapping_packageId_fkey` FOREIGN KEY (`packageId`) REFERENCES `Package`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PackageSnapshotMapping` ADD CONSTRAINT `PackageSnapshotMapping_snapshotId_fkey` FOREIGN KEY (`snapshotId`) REFERENCES `PackageSnapshot`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Package` ADD CONSTRAINT `Package_packageTypeId_fkey` FOREIGN KEY (`packageTypeId`) REFERENCES `PackageType`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PackageCity` ADD CONSTRAINT `PackageCity_packageId_fkey` FOREIGN KEY (`packageId`) REFERENCES `Package`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PackageCityDay` ADD CONSTRAINT `PackageCityDay_packageCityId_fkey` FOREIGN KEY (`packageCityId`) REFERENCES `PackageCity`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PackageCityDayTravel` ADD CONSTRAINT `PackageCityDayTravel_packageCityDayId_fkey` FOREIGN KEY (`packageCityDayId`) REFERENCES `PackageCityDay`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PackageCityDaySightseeing` ADD CONSTRAINT `PackageCityDaySightseeing_packageCityDayId_fkey` FOREIGN KEY (`packageCityDayId`) REFERENCES `PackageCityDay`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PackageCityDayHotel` ADD CONSTRAINT `PackageCityDayHotel_packageCityDayId_fkey` FOREIGN KEY (`packageCityDayId`) REFERENCES `PackageCityDay`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PackageCityDayMeal` ADD CONSTRAINT `PackageCityDayMeal_packageCityDayId_fkey` FOREIGN KEY (`packageCityDayId`) REFERENCES `PackageCityDay`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
