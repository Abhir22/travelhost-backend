/*
  Warnings:

  - You are about to drop the column `roomTypeId` on the `hotelroom` table. All the data in the column will be lost.
  - You are about to drop the `roomtype` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `roomType` to the `HotelRoom` table without a default value. This is not possible if the table is not empty.

*/

-- Step 1: Add the new roomType column as nullable first
ALTER TABLE `hotelroom` ADD COLUMN `roomType` VARCHAR(191);

-- Step 2: Update roomType with the name from the related RoomType table
UPDATE `hotelroom` hr 
JOIN `roomtype` rt ON hr.roomTypeId = rt.id 
SET hr.roomType = rt.name;

-- Step 3: Make roomType NOT NULL now that it has data
ALTER TABLE `hotelroom` MODIFY COLUMN `roomType` VARCHAR(191) NOT NULL;

-- Step 4: Drop the foreign key and old column
ALTER TABLE `hotelroom` DROP FOREIGN KEY `HotelRoom_roomTypeId_fkey`;
ALTER TABLE `hotelroom` DROP COLUMN `roomTypeId`;

-- Step 5: Drop the RoomType table
DROP TABLE `roomtype`;

-- Step 6: Create MealCategory table
CREATE TABLE `MealCategory` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `MealCategory_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
