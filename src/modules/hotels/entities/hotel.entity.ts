import { Prisma } from '@prisma/client';

export type Hotel = Prisma.HotelGetPayload<{
  // include: {
  //   // Add related models here if needed
  // }
}>;

export type HotelCreateDto = Prisma.HotelCreateInput;
export type HotelUpdateDto = Prisma.HotelUpdateInput;
