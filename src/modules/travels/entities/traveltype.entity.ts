import { Prisma } from '@prisma/client';

export type TravelType = Prisma.TravelTypeGetPayload<{
  // include: {
  //   // Add related models here if needed
  // }
}>;

export type TravelTypeCreateDto = Prisma.TravelTypeCreateInput;
export type TravelTypeUpdateDto = Prisma.TravelTypeUpdateInput;
