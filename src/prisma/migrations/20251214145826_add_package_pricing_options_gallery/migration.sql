-- CreateTable
CREATE TABLE `PackagePricing` (
    `id` VARCHAR(191) NOT NULL,
    `packageId` VARCHAR(191) NOT NULL,
    `season` ENUM('ON_SEASON', 'OFF_SEASON', 'MID_SEASON', 'FESTIVE_SEASON') NOT NULL,
    `dateFrom` DATE NOT NULL,
    `dateTo` DATE NOT NULL,
    `rackRate` DECIMAL(10, 2) NOT NULL,
    `publishedRate` DECIMAL(10, 2) NOT NULL,
    `customerDiscountPercentage` DECIMAL(5, 2) NULL,
    `customerDiscountAmount` DECIMAL(10, 2) NULL,
    `adultRate` DECIMAL(10, 2) NULL,
    `agentDiscountPercentage` DECIMAL(5, 2) NULL,
    `agentDiscountAmount` DECIMAL(10, 2) NULL,
    `agentRate` DECIMAL(10, 2) NULL,
    `childRate` DECIMAL(10, 2) NULL,
    `infantRate` DECIMAL(10, 2) NULL,
    `createdBy` VARCHAR(36) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PackageOption` (
    `id` VARCHAR(191) NOT NULL,
    `packageId` VARCHAR(191) NOT NULL,
    `includeGroupDeparture` BOOLEAN NOT NULL DEFAULT false,
    `includeFixedDeparture` BOOLEAN NOT NULL DEFAULT false,
    `includePackageAvailability` BOOLEAN NOT NULL DEFAULT false,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PackageGallery` (
    `id` VARCHAR(191) NOT NULL,
    `packageId` VARCHAR(191) NOT NULL,
    `imageUrl` VARCHAR(500) NOT NULL,
    `imageOrder` INTEGER NOT NULL,
    `isCover` BOOLEAN NOT NULL DEFAULT false,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `PackagePricing` ADD CONSTRAINT `PackagePricing_packageId_fkey` FOREIGN KEY (`packageId`) REFERENCES `Package`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PackageOption` ADD CONSTRAINT `PackageOption_packageId_fkey` FOREIGN KEY (`packageId`) REFERENCES `Package`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PackageGallery` ADD CONSTRAINT `PackageGallery_packageId_fkey` FOREIGN KEY (`packageId`) REFERENCES `Package`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
