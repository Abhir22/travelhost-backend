import { Prisma } from '@prisma/client';

export type HotelRoom = Prisma.HotelRoomGetPayload<{
  include: {
    hotel: true,
    roomType: true,
    roomImages: true
  }
}>;

export type HotelRoomCreateDto = Prisma.HotelRoomCreateInput;
export type HotelRoomUpdateDto = Prisma.HotelRoomUpdateInput;
