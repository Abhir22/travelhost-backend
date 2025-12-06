import { Prisma } from '@prisma/client';

export type PackageCityDay = Prisma.PackageCityDayGetPayload<{
  include: {
    packageCity: true,
    packagecitydaytravels: true,
    packagecitydaysightseeings: true,
    packagecitydayhotels: true,
    packagecitydaymeals: true
  }
}>;

export type PackageCityDayCreateDto = Prisma.PackageCityDayCreateInput;
export type PackageCityDayUpdateDto = Prisma.PackageCityDayUpdateInput;
