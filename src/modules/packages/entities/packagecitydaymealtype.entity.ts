import { Prisma } from '@prisma/client';

export type PackageCityDayMealType = Prisma.PackageCityDayMealTypeGetPayload<{
  include: {
    packageCityDay: true,
    mealType: true
  }
}>;

export type PackageCityDayMealTypeCreateDto = Prisma.PackageCityDayMealTypeCreateInput;
export type PackageCityDayMealTypeUpdateDto = Prisma.PackageCityDayMealTypeUpdateInput;