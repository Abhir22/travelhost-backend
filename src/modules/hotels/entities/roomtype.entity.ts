import { Prisma } from '@prisma/client';

export type RoomType = Prisma.RoomTypeGetPayload<{
  include: {
    hotelRooms: true
  }
}>;

export type RoomTypeCreateDto = Prisma.RoomTypeCreateInput;
export type RoomTypeUpdateDto = Prisma.RoomTypeUpdateInput;
