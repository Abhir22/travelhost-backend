import { Prisma } from '@prisma/client';

export type PackageCity = Prisma.PackageCityGetPayload<{
  include: {
    package: true,
    packagecitydaies: true
  }
}>;

export type PackageCityCreateDto = Prisma.PackageCityCreateInput;
export type PackageCityUpdateDto = Prisma.PackageCityUpdateInput;
