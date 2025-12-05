import { Prisma } from '@prisma/client';

export type PackageDayTravelType = Prisma.PackageDayTravelTypeGetPayload<{
  include: {
    packageDay: true
  }
}>;

export type PackageDayTravelTypeCreateDto = Prisma.PackageDayTravelTypeCreateInput;
export type PackageDayTravelTypeUpdateDto = Prisma.PackageDayTravelTypeUpdateInput;
