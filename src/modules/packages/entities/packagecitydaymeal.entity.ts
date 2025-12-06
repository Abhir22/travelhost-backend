import { Prisma } from '@prisma/client';

export type PackageCityDayMeal = Prisma.PackageCityDayMealGetPayload<{
  include: {
    packageCityDay: true
  }
}>;

export type PackageCityDayMealCreateDto = Prisma.PackageCityDayMealCreateInput;
export type PackageCityDayMealUpdateDto = Prisma.PackageCityDayMealUpdateInput;
