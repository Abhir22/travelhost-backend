import { Prisma } from '@prisma/client';

export type PackageCityDaySightseeing = Prisma.PackageCityDaySightseeingGetPayload<{
  include: {
    packageCityDay: true
  }
}>;

export type PackageCityDaySightseeingCreateDto = Prisma.PackageCityDaySightseeingCreateInput;
export type PackageCityDaySightseeingUpdateDto = Prisma.PackageCityDaySightseeingUpdateInput;
