import { Prisma } from '@prisma/client';

export type PackageActivityMapping = Prisma.PackageActivityMappingGetPayload<{
  include: {
    package: true,
    activity: true
  }
}>;

export type PackageActivityMappingCreateDto = Prisma.PackageActivityMappingCreateInput;
export type PackageActivityMappingUpdateDto = Prisma.PackageActivityMappingUpdateInput;
