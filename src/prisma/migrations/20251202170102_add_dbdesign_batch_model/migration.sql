-- CreateTable
CREATE TABLE `PackageType` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `image` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `PackageType_name_key`(`name`),
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
CREATE TABLE `Package` (
    `id` VARCHAR(191) NOT NULL,
    `packageTypeId` VARCHAR(191) NOT NULL,
    `packageName` VARCHAR(191) NOT NULL,
    `countryId` VARCHAR(191) NULL,
    `stateId` VARCHAR(191) NULL,
    `cityId` VARCHAR(191) NULL,
    `days` INTEGER NOT NULL,
    `nights` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PackageDay` (
    `id` VARCHAR(191) NOT NULL,
    `packageId` VARCHAR(191) NOT NULL,
    `dayNumber` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PackageDayTravelType` (
    `id` VARCHAR(191) NOT NULL,
    `packageDayId` VARCHAR(191) NOT NULL,
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
CREATE TABLE `PackageDaySightseeing` (
    `id` VARCHAR(191) NOT NULL,
    `packageDayId` VARCHAR(191) NOT NULL,
    `sightseeingName` VARCHAR(191) NOT NULL,
    `ticket` VARCHAR(191) NULL,
    `timeFrom` VARCHAR(191) NULL,
    `timeTo` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PackageDayHotel` (
    `id` VARCHAR(191) NOT NULL,
    `packageDayId` VARCHAR(191) NOT NULL,
    `hotelName` VARCHAR(191) NOT NULL,
    `starRating` INTEGER NOT NULL,
    `hotelType` VARCHAR(191) NULL,
    `checkInTime` VARCHAR(191) NULL,
    `checkOutTime` VARCHAR(191) NULL,
    `roomType` VARCHAR(191) NULL,
    `numberOfRooms` INTEGER NULL,
    `actualCheckIn` VARCHAR(191) NULL,
    `actualCheckOut` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Package` ADD CONSTRAINT `Package_packageTypeId_fkey` FOREIGN KEY (`packageTypeId`) REFERENCES `PackageType`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PackageDay` ADD CONSTRAINT `PackageDay_packageId_fkey` FOREIGN KEY (`packageId`) REFERENCES `Package`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PackageDayTravelType` ADD CONSTRAINT `PackageDayTravelType_packageDayId_fkey` FOREIGN KEY (`packageDayId`) REFERENCES `PackageDay`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PackageDaySightseeing` ADD CONSTRAINT `PackageDaySightseeing_packageDayId_fkey` FOREIGN KEY (`packageDayId`) REFERENCES `PackageDay`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PackageDayHotel` ADD CONSTRAINT `PackageDayHotel_packageDayId_fkey` FOREIGN KEY (`packageDayId`) REFERENCES `PackageDay`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
