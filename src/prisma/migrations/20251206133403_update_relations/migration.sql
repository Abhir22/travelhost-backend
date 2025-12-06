/*
  Warnings:

  - You are about to drop the `district` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `hotelroom` DROP FOREIGN KEY `HotelRoom_hotelId_fkey`;

-- DropForeignKey
ALTER TABLE `hotelroom` DROP FOREIGN KEY `HotelRoom_roomTypeId_fkey`;

-- DropForeignKey
ALTER TABLE `package` DROP FOREIGN KEY `Package_packageTypeId_fkey`;

-- DropForeignKey
ALTER TABLE `packageactivitymapping` DROP FOREIGN KEY `PackageActivityMapping_activityId_fkey`;

-- DropForeignKey
ALTER TABLE `packageactivitymapping` DROP FOREIGN KEY `PackageActivityMapping_packageId_fkey`;

-- DropForeignKey
ALTER TABLE `packagecategorymapping` DROP FOREIGN KEY `PackageCategoryMapping_categoryId_fkey`;

-- DropForeignKey
ALTER TABLE `packagecategorymapping` DROP FOREIGN KEY `PackageCategoryMapping_packageId_fkey`;

-- DropForeignKey
ALTER TABLE `packagecity` DROP FOREIGN KEY `PackageCity_packageId_fkey`;

-- DropForeignKey
ALTER TABLE `packagecityday` DROP FOREIGN KEY `PackageCityDay_packageCityId_fkey`;

-- DropForeignKey
ALTER TABLE `packagecitydayhotel` DROP FOREIGN KEY `PackageCityDayHotel_packageCityDayId_fkey`;

-- DropForeignKey
ALTER TABLE `packagecitydaymeal` DROP FOREIGN KEY `PackageCityDayMeal_packageCityDayId_fkey`;

-- DropForeignKey
ALTER TABLE `packagecitydaysightseeing` DROP FOREIGN KEY `PackageCityDaySightseeing_packageCityDayId_fkey`;

-- DropForeignKey
ALTER TABLE `packagecitydaytravel` DROP FOREIGN KEY `PackageCityDayTravel_packageCityDayId_fkey`;

-- DropForeignKey
ALTER TABLE `packagesnapshotmapping` DROP FOREIGN KEY `PackageSnapshotMapping_packageId_fkey`;

-- DropForeignKey
ALTER TABLE `packagesnapshotmapping` DROP FOREIGN KEY `PackageSnapshotMapping_snapshotId_fkey`;

-- DropForeignKey
ALTER TABLE `roomimage` DROP FOREIGN KEY `RoomImage_hotelRoomId_fkey`;

-- DropIndex
DROP INDEX `HotelRoom_hotelId_fkey` ON `hotelroom`;

-- DropIndex
DROP INDEX `HotelRoom_roomTypeId_fkey` ON `hotelroom`;

-- DropIndex
DROP INDEX `Package_packageTypeId_fkey` ON `package`;

-- DropIndex
DROP INDEX `PackageActivityMapping_activityId_fkey` ON `packageactivitymapping`;

-- DropIndex
DROP INDEX `PackageActivityMapping_packageId_fkey` ON `packageactivitymapping`;

-- DropIndex
DROP INDEX `PackageCategoryMapping_categoryId_fkey` ON `packagecategorymapping`;

-- DropIndex
DROP INDEX `PackageCategoryMapping_packageId_fkey` ON `packagecategorymapping`;

-- DropIndex
DROP INDEX `PackageCity_packageId_fkey` ON `packagecity`;

-- DropIndex
DROP INDEX `PackageCityDay_packageCityId_fkey` ON `packagecityday`;

-- DropIndex
DROP INDEX `PackageCityDayHotel_packageCityDayId_fkey` ON `packagecitydayhotel`;

-- DropIndex
DROP INDEX `PackageCityDayMeal_packageCityDayId_fkey` ON `packagecitydaymeal`;

-- DropIndex
DROP INDEX `PackageCityDaySightseeing_packageCityDayId_fkey` ON `packagecitydaysightseeing`;

-- DropIndex
DROP INDEX `PackageCityDayTravel_packageCityDayId_fkey` ON `packagecitydaytravel`;

-- DropIndex
DROP INDEX `PackageSnapshotMapping_packageId_fkey` ON `packagesnapshotmapping`;

-- DropIndex
DROP INDEX `PackageSnapshotMapping_snapshotId_fkey` ON `packagesnapshotmapping`;

-- DropIndex
DROP INDEX `RoomImage_hotelRoomId_fkey` ON `roomimage`;

-- DropTable
DROP TABLE `district`;

-- AddForeignKey
ALTER TABLE `State` ADD CONSTRAINT `State_countryId_fkey` FOREIGN KEY (`countryId`) REFERENCES `Country`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `City` ADD CONSTRAINT `City_countryId_fkey` FOREIGN KEY (`countryId`) REFERENCES `Country`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `City` ADD CONSTRAINT `City_stateId_fkey` FOREIGN KEY (`stateId`) REFERENCES `State`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Sightseeing` ADD CONSTRAINT `Sightseeing_countryId_fkey` FOREIGN KEY (`countryId`) REFERENCES `Country`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Sightseeing` ADD CONSTRAINT `Sightseeing_stateId_fkey` FOREIGN KEY (`stateId`) REFERENCES `State`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Sightseeing` ADD CONSTRAINT `Sightseeing_cityId_fkey` FOREIGN KEY (`cityId`) REFERENCES `City`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Hotel` ADD CONSTRAINT `Hotel_countryId_fkey` FOREIGN KEY (`countryId`) REFERENCES `Country`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Hotel` ADD CONSTRAINT `Hotel_stateId_fkey` FOREIGN KEY (`stateId`) REFERENCES `State`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Hotel` ADD CONSTRAINT `Hotel_cityId_fkey` FOREIGN KEY (`cityId`) REFERENCES `City`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Hotel` ADD CONSTRAINT `Hotel_sightseeingId_fkey` FOREIGN KEY (`sightseeingId`) REFERENCES `Sightseeing`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `HotelRoom` ADD CONSTRAINT `HotelRoom_hotelId_fkey` FOREIGN KEY (`hotelId`) REFERENCES `Hotel`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `HotelRoom` ADD CONSTRAINT `HotelRoom_roomTypeId_fkey` FOREIGN KEY (`roomTypeId`) REFERENCES `RoomType`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `RoomImage` ADD CONSTRAINT `RoomImage_hotelRoomId_fkey` FOREIGN KEY (`hotelRoomId`) REFERENCES `HotelRoom`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TravelType` ADD CONSTRAINT `TravelType_countryId_fkey` FOREIGN KEY (`countryId`) REFERENCES `Country`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TravelType` ADD CONSTRAINT `TravelType_stateId_fkey` FOREIGN KEY (`stateId`) REFERENCES `State`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TravelType` ADD CONSTRAINT `TravelType_cityId_fkey` FOREIGN KEY (`cityId`) REFERENCES `City`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TravelType` ADD CONSTRAINT `TravelType_sightseeingId_fkey` FOREIGN KEY (`sightseeingId`) REFERENCES `Sightseeing`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TravelType` ADD CONSTRAINT `TravelType_hotelId_fkey` FOREIGN KEY (`hotelId`) REFERENCES `Hotel`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TravelMode` ADD CONSTRAINT `TravelMode_countryId_fkey` FOREIGN KEY (`countryId`) REFERENCES `Country`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TravelMode` ADD CONSTRAINT `TravelMode_stateId_fkey` FOREIGN KEY (`stateId`) REFERENCES `State`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TravelMode` ADD CONSTRAINT `TravelMode_cityId_fkey` FOREIGN KEY (`cityId`) REFERENCES `City`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TravelMode` ADD CONSTRAINT `TravelMode_sightseeingId_fkey` FOREIGN KEY (`sightseeingId`) REFERENCES `Sightseeing`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TravelMode` ADD CONSTRAINT `TravelMode_travelTypeId_fkey` FOREIGN KEY (`travelTypeId`) REFERENCES `TravelType`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Destination` ADD CONSTRAINT `Destination_countryId_fkey` FOREIGN KEY (`countryId`) REFERENCES `Country`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Destination` ADD CONSTRAINT `Destination_stateId_fkey` FOREIGN KEY (`stateId`) REFERENCES `State`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Destination` ADD CONSTRAINT `Destination_cityId_fkey` FOREIGN KEY (`cityId`) REFERENCES `City`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

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
