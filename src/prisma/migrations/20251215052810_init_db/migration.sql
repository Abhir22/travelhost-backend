-- CreateTable
CREATE TABLE `Country` (
    `id` CHAR(36) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `isoCode` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Country_name_key`(`name`),
    UNIQUE INDEX `Country_isoCode_key`(`isoCode`),
    INDEX `Country_name_idx`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `State` (
    `id` CHAR(36) NOT NULL,
    `countryId` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `State_countryId_idx`(`countryId`),
    INDEX `State_name_idx`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `City` (
    `id` CHAR(36) NOT NULL,
    `countryId` VARCHAR(191) NOT NULL,
    `stateId` VARCHAR(191) NULL,
    `name` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `City_countryId_idx`(`countryId`),
    INDEX `City_stateId_idx`(`stateId`),
    INDEX `City_name_idx`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Sightseeing` (
    `id` CHAR(36) NOT NULL,
    `cityId` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `Sightseeing_cityId_idx`(`cityId`),
    INDEX `Sightseeing_name_idx`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Hotel` (
    `id` CHAR(36) NOT NULL,
    `cityId` VARCHAR(191) NOT NULL,
    `hotelTypeId` VARCHAR(191) NULL,
    `name` VARCHAR(191) NOT NULL,
    `rating` INTEGER NULL,
    `thumbnail` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `Hotel_cityId_idx`(`cityId`),
    INDEX `Hotel_hotelTypeId_idx`(`hotelTypeId`),
    INDEX `Hotel_name_idx`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `HotelSightseeing` (
    `id` CHAR(36) NOT NULL,
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
CREATE TABLE `HotelType` (
    `id` CHAR(36) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `MealCategory` (
    `id` CHAR(36) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `MealCategory_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `HotelRoom` (
    `id` CHAR(36) NOT NULL,
    `hotelId` VARCHAR(191) NOT NULL,
    `roomType` VARCHAR(191) NOT NULL DEFAULT 'Standard Room',
    `roomNumber` VARCHAR(191) NULL,
    `price` DECIMAL(65, 30) NULL,
    `amenities` VARCHAR(191) NULL,
    `description` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `RoomImage` (
    `id` CHAR(36) NOT NULL,
    `hotelRoomId` VARCHAR(191) NOT NULL,
    `imageUrl` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TravelType` (
    `id` CHAR(36) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TransferMode` (
    `id` CHAR(36) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Destination` (
    `id` CHAR(36) NOT NULL,
    `destinationType` ENUM('INTERNATIONAL', 'DOMESTIC') NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `description` TEXT NULL,
    `priceRange` VARCHAR(191) NULL,
    `thumbnailPhoto` VARCHAR(191) NULL,
    `bannerPhoto` VARCHAR(191) NULL,
    `video` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `Destination_destinationType_idx`(`destinationType`),
    INDEX `Destination_name_idx`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `DestinationCountry` (
    `id` CHAR(36) NOT NULL,
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
    `id` CHAR(36) NOT NULL,
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
    `id` CHAR(36) NOT NULL,
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
    `id` CHAR(36) NOT NULL,
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
    `id` CHAR(36) NOT NULL,
    `destinationId` VARCHAR(191) NOT NULL,
    `packageTypeId` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `DestinationPackageType_destinationId_idx`(`destinationId`),
    INDEX `DestinationPackageType_packageTypeId_idx`(`packageTypeId`),
    UNIQUE INDEX `DestinationPackageType_destinationId_packageTypeId_key`(`destinationId`, `packageTypeId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PackageType` (
    `id` CHAR(36) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `image` VARCHAR(191) NULL,
    `isInternational` BOOLEAN NOT NULL DEFAULT false,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `PackageType_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PackageCountry` (
    `id` CHAR(36) NOT NULL,
    `packageTypeId` VARCHAR(191) NOT NULL,
    `countryId` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `PackageCountry_packageTypeId_countryId_key`(`packageTypeId`, `countryId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PackageState` (
    `id` CHAR(36) NOT NULL,
    `packageTypeId` VARCHAR(191) NOT NULL,
    `stateId` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `PackageState_packageTypeId_stateId_key`(`packageTypeId`, `stateId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Package` (
    `id` CHAR(36) NOT NULL,
    `packageTypeId` VARCHAR(191) NOT NULL,
    `packageName` VARCHAR(191) NOT NULL,
    `shortDescription` TEXT NULL,
    `longDescription` TEXT NULL,
    `mainImage` VARCHAR(191) NULL,
    `thumbnail` VARCHAR(191) NULL,
    `video` VARCHAR(191) NULL,
    `basePrice` DECIMAL(65, 30) NULL,
    `duration` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PackageCategory` (
    `id` CHAR(36) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `icon` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `PackageCategory_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PackageCategoryMapping` (
    `id` CHAR(36) NOT NULL,
    `packageId` VARCHAR(191) NOT NULL,
    `categoryId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PackageActivity` (
    `id` CHAR(36) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `image` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `PackageActivity_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PackageActivityMapping` (
    `id` CHAR(36) NOT NULL,
    `packageId` VARCHAR(191) NOT NULL,
    `activityId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PackageSnapshot` (
    `id` CHAR(36) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `icon` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `PackageSnapshot_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PackageSnapshotMapping` (
    `id` CHAR(36) NOT NULL,
    `packageId` VARCHAR(191) NOT NULL,
    `snapshotId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PackageCity` (
    `id` CHAR(36) NOT NULL,
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
    `id` CHAR(36) NOT NULL,
    `packageCityId` VARCHAR(191) NOT NULL,
    `dayNumber` INTEGER NOT NULL,
    `startTime` VARCHAR(191) NULL,
    `endTime` VARCHAR(191) NULL,
    `startFrom` VARCHAR(191) NULL,
    `endAt` VARCHAR(191) NULL,
    `start_description` VARCHAR(191) NULL,
    `end_description` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PackageCityDayTravel` (
    `id` CHAR(36) NOT NULL,
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
    `id` CHAR(36) NOT NULL,
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
    `id` CHAR(36) NOT NULL,
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
    `id` CHAR(36) NOT NULL,
    `packageCityDayId` VARCHAR(191) NOT NULL,
    `mealType` VARCHAR(191) NOT NULL,
    `provider` VARCHAR(191) NOT NULL,
    `time` VARCHAR(191) NULL,
    `description` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PackageCityDayMealType` (
    `id` CHAR(36) NOT NULL,
    `packageCityDayId` VARCHAR(191) NOT NULL,
    `mealTypeId` VARCHAR(191) NOT NULL,
    `mealCategoryId` VARCHAR(191) NULL,
    `provider` VARCHAR(191) NULL,
    `time` VARCHAR(191) NULL,
    `description` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `PackageCityDayMealType_mealCategoryId_idx`(`mealCategoryId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `MealType` (
    `id` CHAR(36) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `MealType_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `VehicleType` (
    `id` CHAR(36) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `vehicleCategory` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PackageTermsCondition` (
    `id` CHAR(36) NOT NULL,
    `packageId` VARCHAR(191) NOT NULL,
    `content` LONGTEXT NOT NULL,
    `linkText` VARCHAR(255) NULL,
    `linkUrl` VARCHAR(500) NULL,
    `videoUrl` VARCHAR(500) NULL,
    `imageUrl` VARCHAR(500) NULL,
    `fileName` VARCHAR(255) NULL,
    `filePath` VARCHAR(500) NULL,
    `fileType` VARCHAR(50) NULL,
    `fileSize` BIGINT NULL,
    `createdBy` VARCHAR(36) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PackageInclusion` (
    `id` CHAR(36) NOT NULL,
    `packageId` VARCHAR(191) NOT NULL,
    `content` LONGTEXT NOT NULL,
    `createdBy` VARCHAR(36) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PackageExclusion` (
    `id` CHAR(36) NOT NULL,
    `packageId` VARCHAR(191) NOT NULL,
    `content` LONGTEXT NOT NULL,
    `createdBy` VARCHAR(36) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PackagePaymentPolicy` (
    `id` CHAR(36) NOT NULL,
    `packageId` VARCHAR(191) NOT NULL,
    `content` LONGTEXT NOT NULL,
    `createdBy` VARCHAR(36) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PackageCancellationPolicy` (
    `id` CHAR(36) NOT NULL,
    `packageId` VARCHAR(191) NOT NULL,
    `content` LONGTEXT NOT NULL,
    `createdBy` VARCHAR(36) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PackagePricing` (
    `id` CHAR(36) NOT NULL,
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
    `id` CHAR(36) NOT NULL,
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
    `id` CHAR(36) NOT NULL,
    `packageId` VARCHAR(191) NOT NULL,
    `imageUrl` VARCHAR(500) NOT NULL,
    `imageOrder` INTEGER NOT NULL,
    `isCover` BOOLEAN NOT NULL DEFAULT false,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `State` ADD CONSTRAINT `State_countryId_fkey` FOREIGN KEY (`countryId`) REFERENCES `Country`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `City` ADD CONSTRAINT `City_countryId_fkey` FOREIGN KEY (`countryId`) REFERENCES `Country`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `City` ADD CONSTRAINT `City_stateId_fkey` FOREIGN KEY (`stateId`) REFERENCES `State`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Sightseeing` ADD CONSTRAINT `Sightseeing_cityId_fkey` FOREIGN KEY (`cityId`) REFERENCES `City`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Hotel` ADD CONSTRAINT `Hotel_cityId_fkey` FOREIGN KEY (`cityId`) REFERENCES `City`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Hotel` ADD CONSTRAINT `Hotel_hotelTypeId_fkey` FOREIGN KEY (`hotelTypeId`) REFERENCES `HotelType`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `HotelSightseeing` ADD CONSTRAINT `HotelSightseeing_hotelId_fkey` FOREIGN KEY (`hotelId`) REFERENCES `Hotel`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `HotelSightseeing` ADD CONSTRAINT `HotelSightseeing_sightseeingId_fkey` FOREIGN KEY (`sightseeingId`) REFERENCES `Sightseeing`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `HotelRoom` ADD CONSTRAINT `HotelRoom_hotelId_fkey` FOREIGN KEY (`hotelId`) REFERENCES `Hotel`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `RoomImage` ADD CONSTRAINT `RoomImage_hotelRoomId_fkey` FOREIGN KEY (`hotelRoomId`) REFERENCES `HotelRoom`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

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

-- AddForeignKey
ALTER TABLE `PackageCountry` ADD CONSTRAINT `PackageCountry_packageTypeId_fkey` FOREIGN KEY (`packageTypeId`) REFERENCES `PackageType`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PackageCountry` ADD CONSTRAINT `PackageCountry_countryId_fkey` FOREIGN KEY (`countryId`) REFERENCES `Country`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PackageState` ADD CONSTRAINT `PackageState_packageTypeId_fkey` FOREIGN KEY (`packageTypeId`) REFERENCES `PackageType`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PackageState` ADD CONSTRAINT `PackageState_stateId_fkey` FOREIGN KEY (`stateId`) REFERENCES `State`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Package` ADD CONSTRAINT `Package_packageTypeId_fkey` FOREIGN KEY (`packageTypeId`) REFERENCES `PackageType`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PackageCategoryMapping` ADD CONSTRAINT `PackageCategoryMapping_packageId_fkey` FOREIGN KEY (`packageId`) REFERENCES `Package`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PackageCategoryMapping` ADD CONSTRAINT `PackageCategoryMapping_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `PackageCategory`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PackageActivityMapping` ADD CONSTRAINT `PackageActivityMapping_packageId_fkey` FOREIGN KEY (`packageId`) REFERENCES `Package`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PackageActivityMapping` ADD CONSTRAINT `PackageActivityMapping_activityId_fkey` FOREIGN KEY (`activityId`) REFERENCES `PackageActivity`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PackageSnapshotMapping` ADD CONSTRAINT `PackageSnapshotMapping_packageId_fkey` FOREIGN KEY (`packageId`) REFERENCES `Package`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PackageSnapshotMapping` ADD CONSTRAINT `PackageSnapshotMapping_snapshotId_fkey` FOREIGN KEY (`snapshotId`) REFERENCES `PackageSnapshot`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PackageCity` ADD CONSTRAINT `PackageCity_packageId_fkey` FOREIGN KEY (`packageId`) REFERENCES `Package`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PackageCity` ADD CONSTRAINT `PackageCity_cityId_fkey` FOREIGN KEY (`cityId`) REFERENCES `City`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PackageCity` ADD CONSTRAINT `PackageCity_stateId_fkey` FOREIGN KEY (`stateId`) REFERENCES `State`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PackageCity` ADD CONSTRAINT `PackageCity_countryId_fkey` FOREIGN KEY (`countryId`) REFERENCES `Country`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PackageCityDay` ADD CONSTRAINT `PackageCityDay_packageCityId_fkey` FOREIGN KEY (`packageCityId`) REFERENCES `PackageCity`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PackageCityDayTravel` ADD CONSTRAINT `PackageCityDayTravel_packageCityDayId_fkey` FOREIGN KEY (`packageCityDayId`) REFERENCES `PackageCityDay`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PackageCityDaySightseeing` ADD CONSTRAINT `PackageCityDaySightseeing_packageCityDayId_fkey` FOREIGN KEY (`packageCityDayId`) REFERENCES `PackageCityDay`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PackageCityDayHotel` ADD CONSTRAINT `PackageCityDayHotel_packageCityDayId_fkey` FOREIGN KEY (`packageCityDayId`) REFERENCES `PackageCityDay`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PackageCityDayMeal` ADD CONSTRAINT `PackageCityDayMeal_packageCityDayId_fkey` FOREIGN KEY (`packageCityDayId`) REFERENCES `PackageCityDay`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PackageCityDayMealType` ADD CONSTRAINT `PackageCityDayMealType_packageCityDayId_fkey` FOREIGN KEY (`packageCityDayId`) REFERENCES `PackageCityDay`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PackageCityDayMealType` ADD CONSTRAINT `PackageCityDayMealType_mealTypeId_fkey` FOREIGN KEY (`mealTypeId`) REFERENCES `MealType`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PackageCityDayMealType` ADD CONSTRAINT `PackageCityDayMealType_mealCategoryId_fkey` FOREIGN KEY (`mealCategoryId`) REFERENCES `MealCategory`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PackageTermsCondition` ADD CONSTRAINT `PackageTermsCondition_packageId_fkey` FOREIGN KEY (`packageId`) REFERENCES `Package`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PackageInclusion` ADD CONSTRAINT `PackageInclusion_packageId_fkey` FOREIGN KEY (`packageId`) REFERENCES `Package`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PackageExclusion` ADD CONSTRAINT `PackageExclusion_packageId_fkey` FOREIGN KEY (`packageId`) REFERENCES `Package`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PackagePaymentPolicy` ADD CONSTRAINT `PackagePaymentPolicy_packageId_fkey` FOREIGN KEY (`packageId`) REFERENCES `Package`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PackageCancellationPolicy` ADD CONSTRAINT `PackageCancellationPolicy_packageId_fkey` FOREIGN KEY (`packageId`) REFERENCES `Package`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PackagePricing` ADD CONSTRAINT `PackagePricing_packageId_fkey` FOREIGN KEY (`packageId`) REFERENCES `Package`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PackageOption` ADD CONSTRAINT `PackageOption_packageId_fkey` FOREIGN KEY (`packageId`) REFERENCES `Package`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PackageGallery` ADD CONSTRAINT `PackageGallery_packageId_fkey` FOREIGN KEY (`packageId`) REFERENCES `Package`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
