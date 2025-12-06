import { Prisma } from '@prisma/client';

export type PackageType = Prisma.PackageTypeGetPayload<{
  include: {
    packages: true
  }
}>;

export type PackageTypeCreateDto = Prisma.PackageTypeCreateInput;
export type PackageTypeUpdateDto = Prisma.PackageTypeUpdateInput;
