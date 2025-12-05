import { Prisma } from '@prisma/client';

export type PackageActivity = Prisma.PackageActivityGetPayload<{
  // include: {
  //   // Add related models here if needed
  // }
}>;

export type PackageActivityCreateDto = Prisma.PackageActivityCreateInput;
export type PackageActivityUpdateDto = Prisma.PackageActivityUpdateInput;
