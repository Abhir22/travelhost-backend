-- CreateTable
CREATE TABLE `Destination` (
    `id` VARCHAR(191) NOT NULL,
    `destinationType` ENUM('INTERNATIONAL', 'DOMESTIC') NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `countryId` VARCHAR(191) NULL,
    `stateId` VARCHAR(191) NULL,
    `cityId` VARCHAR(191) NULL,
    `priceRange` VARCHAR(191) NULL,
    `thumbnailPhoto` VARCHAR(191) NULL,
    `bannerPhoto` VARCHAR(191) NULL,
    `video` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
