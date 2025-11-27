import { Prisma } from '@prisma/client';

export type TravelMode = Prisma.TravelModeGetPayload<{
  // include: {
  //   // Add related models here if needed
  // }
}>;

export type TravelModeCreateDto = Prisma.TravelModeCreateInput;
export type TravelModeUpdateDto = Prisma.TravelModeUpdateInput;
