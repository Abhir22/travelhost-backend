-- AlterTable
ALTER TABLE `hotelroom` ADD COLUMN `amenities` VARCHAR(191) NULL,
    ADD COLUMN `price` DECIMAL(65, 30) NULL,
    MODIFY `roomNumber` VARCHAR(191) NULL;
