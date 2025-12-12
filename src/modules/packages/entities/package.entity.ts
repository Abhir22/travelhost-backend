import { Prisma } from '@prisma/client';

export type Package = Prisma.PackageGetPayload<{
  include: {
    packagecategorymappings: true,
    packageactivitymappings: true,
    packagesnapshotmappings: true,
    packageType: true,
    packagecities: true
  }
}>;

export type PackageCreateDto = Prisma.PackageCreateInput;
export type PackageUpdateDto = Prisma.PackageUpdateInput;
