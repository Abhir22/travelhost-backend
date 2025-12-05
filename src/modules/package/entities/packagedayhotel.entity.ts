import { Prisma } from '@prisma/client';

export type PackageDayHotel = Prisma.PackageDayHotelGetPayload<{
  include: {
    packageDay: true
  }
}>;

export type PackageDayHotelCreateDto = Prisma.PackageDayHotelCreateInput;
export type PackageDayHotelUpdateDto = Prisma.PackageDayHotelUpdateInput;
