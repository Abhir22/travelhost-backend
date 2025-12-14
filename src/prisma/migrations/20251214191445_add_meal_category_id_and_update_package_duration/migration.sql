/*
  Warnings:

  - You are about to drop the column `days` on the `package` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `package` table. All the data in the column will be lost.
  - You are about to drop the column `nights` on the `package` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `packagecityday` table. All the data in the column will be lost.
  - Added the required column `duration` to the `Package` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `package` DROP COLUMN `days`,
    DROP COLUMN `description`,
    DROP COLUMN `nights`,
    ADD COLUMN `duration` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `packagecityday` DROP COLUMN `description`,
    ADD COLUMN `end_description` VARCHAR(191) NULL,
    ADD COLUMN `start_description` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `packagecitydaymealtype` ADD COLUMN `mealCategoryId` VARCHAR(191) NULL;

-- CreateIndex
CREATE INDEX `PackageCityDayMealType_mealCategoryId_idx` ON `PackageCityDayMealType`(`mealCategoryId`);

-- AddForeignKey
ALTER TABLE `PackageCityDayMealType` ADD CONSTRAINT `PackageCityDayMealType_mealCategoryId_fkey` FOREIGN KEY (`mealCategoryId`) REFERENCES `MealCategory`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
