import { Prisma } from '@prisma/client';

export type HotelType = Prisma.HotelTypeGetPayload<{
  include: {
    hotels: true
  }
}>;

export type HotelTypeCreateDto = Prisma.HotelTypeCreateInput;
export type HotelTypeUpdateDto = Prisma.HotelTypeUpdateInput;
