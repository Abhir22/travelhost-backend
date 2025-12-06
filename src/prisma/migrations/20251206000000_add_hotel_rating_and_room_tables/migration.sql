-- AlterTable
-- Add countryId to City table and make stateId optional
ALTER TABLE `City` ADD COLUMN `countryId` VARCHAR(191) NOT NULL,
    MODIFY `stateId` VARCHAR(191) NULL;

-- AlterTable
-- Add rating field to Hotel table
ALTER TABLE `Hotel` ADD COLUMN `rating` INTEGER NULL;

-- CreateTable
-- Create RoomType table for different room types
CREATE TABLE `RoomType` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `description` TEXT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
-- Create HotelRoom table for individual hotel rooms
CREATE TABLE `HotelRoom` (
    `id` VARCHAR(191) NOT NULL,
    `hotelId` VARCHAR(191) NOT NULL,
    `roomTypeId` VARCHAR(191) NOT NULL,
    `roomNumber` VARCHAR(191) NOT NULL,
    `description` TEXT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `HotelRoom_hotelId_roomNumber_key`(`hotelId`, `roomNumber`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
-- Create RoomImage table for multiple room images
CREATE TABLE `RoomImage` (
    `id` VARCHAR(191) NOT NULL,
    `hotelRoomId` VARCHAR(191) NOT NULL,
    `imageUrl` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
-- Add foreign key constraint from HotelRoom to Hotel
ALTER TABLE `HotelRoom` ADD CONSTRAINT `HotelRoom_hotelId_fkey` FOREIGN KEY (`hotelId`) REFERENCES `Hotel`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
-- Add foreign key constraint from HotelRoom to RoomType
ALTER TABLE `HotelRoom` ADD CONSTRAINT `HotelRoom_roomTypeId_fkey` FOREIGN KEY (`roomTypeId`) REFERENCES `RoomType`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
-- Add foreign key constraint from RoomImage to HotelRoom
ALTER TABLE `RoomImage` ADD CONSTRAINT `RoomImage_hotelRoomId_fkey` FOREIGN KEY (`hotelRoomId`) REFERENCES `HotelRoom`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
