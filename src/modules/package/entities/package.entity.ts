import { Prisma } from '@prisma/client';

export type Package = Prisma.PackageGetPayload<{
  include: {
    packageType: true,
    packagedaies: true
  }
}>;

export type PackageCreateDto = Prisma.PackageCreateInput;
export type PackageUpdateDto = Prisma.PackageUpdateInput;
