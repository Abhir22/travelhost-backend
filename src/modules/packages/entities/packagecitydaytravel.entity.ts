import { Prisma } from '@prisma/client';

export type PackageCityDayTravel = Prisma.PackageCityDayTravelGetPayload<{
  include: {
    packageCityDay: true
  }
}>;

export type PackageCityDayTravelCreateDto = Prisma.PackageCityDayTravelCreateInput;
export type PackageCityDayTravelUpdateDto = Prisma.PackageCityDayTravelUpdateInput;
