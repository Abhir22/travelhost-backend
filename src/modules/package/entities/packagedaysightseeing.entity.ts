import { Prisma } from '@prisma/client';

export type PackageDaySightseeing = Prisma.PackageDaySightseeingGetPayload<{
  include: {
    packageDay: true
  }
}>;

export type PackageDaySightseeingCreateDto = Prisma.PackageDaySightseeingCreateInput;
export type PackageDaySightseeingUpdateDto = Prisma.PackageDaySightseeingUpdateInput;
