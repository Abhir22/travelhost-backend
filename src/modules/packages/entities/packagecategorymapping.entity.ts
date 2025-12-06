import { Prisma } from '@prisma/client';

export type PackageCategoryMapping = Prisma.PackageCategoryMappingGetPayload<{
  include: {
    package: true,
    category: true
  }
}>;

export type PackageCategoryMappingCreateDto = Prisma.PackageCategoryMappingCreateInput;
export type PackageCategoryMappingUpdateDto = Prisma.PackageCategoryMappingUpdateInput;
