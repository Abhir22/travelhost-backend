import { Prisma } from '@prisma/client';

export type PackageCategory = Prisma.PackageCategoryGetPayload<{
  include: {
    packagecategorymappings: true
  }
}>;

export type PackageCategoryCreateDto = Prisma.PackageCategoryCreateInput;
export type PackageCategoryUpdateDto = Prisma.PackageCategoryUpdateInput;
