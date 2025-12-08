-- AlterTable
ALTER TABLE `hotel` ADD COLUMN `hotelTypeId` VARCHAR(191) NULL;

-- CreateTable
CREATE TABLE `HotelType` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Hotel` ADD CONSTRAINT `Hotel_hotelTypeId_fkey` FOREIGN KEY (`hotelTypeId`) REFERENCES `HotelType`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
