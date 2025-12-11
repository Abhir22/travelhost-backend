import { Prisma } from '@prisma/client';

export type PackageState = Prisma.PackageStateGetPayload<{
  include: {
    packageType: true,
    state: true
  }
}>;

export type PackageStateCreateDto = Prisma.PackageStateCreateInput;
export type PackageStateUpdateDto = Prisma.PackageStateUpdateInput;