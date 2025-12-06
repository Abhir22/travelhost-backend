import { Prisma } from '@prisma/client';

export type PackageActivity = Prisma.PackageActivityGetPayload<{
  include: {
    packageactivitymappings: true
  }
}>;

export type PackageActivityCreateDto = Prisma.PackageActivityCreateInput;
export type PackageActivityUpdateDto = Prisma.PackageActivityUpdateInput;
