import { Prisma } from '@prisma/client';

export type RoomImage = Prisma.RoomImageGetPayload<{
  include: {
    hotelRoom: true
  }
}>;

export type RoomImageCreateDto = Prisma.RoomImageCreateInput;
export type RoomImageUpdateDto = Prisma.RoomImageUpdateInput;
