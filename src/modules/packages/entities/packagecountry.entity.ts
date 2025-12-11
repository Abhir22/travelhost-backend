import { Prisma } from '@prisma/client';

export type PackageCountry = Prisma.PackageCountryGetPayload<{
  include: {
    packageType: true,
    country: true
  }
}>;

export type PackageCountryCreateDto = Prisma.PackageCountryCreateInput;
export type PackageCountryUpdateDto = Prisma.PackageCountryUpdateInput;