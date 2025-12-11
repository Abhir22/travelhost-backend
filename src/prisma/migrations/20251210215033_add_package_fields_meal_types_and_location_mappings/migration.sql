-- AlterTable
ALTER TABLE `hotel` ADD COLUMN `thumbnail` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `package` ADD COLUMN `longDescription` TEXT NULL,
    ADD COLUMN `mainImage` VARCHAR(191) NULL,
    ADD COLUMN `shortDescription` TEXT NULL,
    ADD COLUMN `thumbnail` VARCHAR(191) NULL;

-- CreateTable
CREATE TABLE `PackageCountry` (
    `id` VARCHAR(191) NOT NULL,
    `packageTypeId` VARCHAR(191) NOT NULL,
    `countryId` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `PackageCountry_packageTypeId_countryId_key`(`packageTypeId`, `countryId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PackageState` (
    `id` VARCHAR(191) NOT NULL,
    `packageTypeId` VARCHAR(191) NOT NULL,
    `stateId` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `PackageState_packageTypeId_stateId_key`(`packageTypeId`, `stateId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PackageCityDayMealType` (
    `id` VARCHAR(191) NOT NULL,
    `packageCityDayId` VARCHAR(191) NOT NULL,
    `mealTypeId` VARCHAR(191) NOT NULL,
    `provider` VARCHAR(191) NULL,
    `time` VARCHAR(191) NULL,
    `description` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PackageMealType` (
    `id` VARCHAR(191) NOT NULL,
    `packageId` VARCHAR(191) NOT NULL,
    `mealTypeId` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `PackageMealType_packageId_mealTypeId_key`(`packageId`, `mealTypeId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `PackageCountry` ADD CONSTRAINT `PackageCountry_packageTypeId_fkey` FOREIGN KEY (`packageTypeId`) REFERENCES `PackageType`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PackageCountry` ADD CONSTRAINT `PackageCountry_countryId_fkey` FOREIGN KEY (`countryId`) REFERENCES `Country`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PackageState` ADD CONSTRAINT `PackageState_packageTypeId_fkey` FOREIGN KEY (`packageTypeId`) REFERENCES `PackageType`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PackageState` ADD CONSTRAINT `PackageState_stateId_fkey` FOREIGN KEY (`stateId`) REFERENCES `State`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PackageCityDayMealType` ADD CONSTRAINT `PackageCityDayMealType_packageCityDayId_fkey` FOREIGN KEY (`packageCityDayId`) REFERENCES `PackageCityDay`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PackageCityDayMealType` ADD CONSTRAINT `PackageCityDayMealType_mealTypeId_fkey` FOREIGN KEY (`mealTypeId`) REFERENCES `MealType`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PackageMealType` ADD CONSTRAINT `PackageMealType_packageId_fkey` FOREIGN KEY (`packageId`) REFERENCES `Package`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PackageMealType` ADD CONSTRAINT `PackageMealType_mealTypeId_fkey` FOREIGN KEY (`mealTypeId`) REFERENCES `MealType`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
