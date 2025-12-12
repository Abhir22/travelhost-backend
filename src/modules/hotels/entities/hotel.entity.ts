import { Prisma } from '@prisma/client';

export type Hotel = Prisma.HotelGetPayload<{
  include: {
    city: true;
    hotelType: true;
  }
}>;

export type HotelCreateDto = Prisma.HotelCreateInput;
export type HotelUpdateDto = Prisma.HotelUpdateInput;
