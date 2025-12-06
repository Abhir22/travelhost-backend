import { Prisma } from '@prisma/client';

export type PackageCityDayHotel = Prisma.PackageCityDayHotelGetPayload<{
  include: {
    packageCityDay: true
  }
}>;

export type PackageCityDayHotelCreateDto = Prisma.PackageCityDayHotelCreateInput;
export type PackageCityDayHotelUpdateDto = Prisma.PackageCityDayHotelUpdateInput;
