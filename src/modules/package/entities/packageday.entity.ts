import { Prisma } from '@prisma/client';

export type PackageDay = Prisma.PackageDayGetPayload<{
  include: {
    package: true,
    packagedaytraveltypes: true,
    packagedaysightseeings: true,
    packagedayhotels: true
  }
}>;

export type PackageDayCreateDto = Prisma.PackageDayCreateInput;
export type PackageDayUpdateDto = Prisma.PackageDayUpdateInput;
