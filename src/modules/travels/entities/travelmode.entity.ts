import { Prisma } from '@prisma/client';

export type TravelMode = Prisma.TransferModeGetPayload<{
  // include: {
  //   // Add related models here if needed
  // }
}>;

export type TravelModeCreateDto = Prisma.TransferModeCreateInput;
export type TravelModeUpdateDto = Prisma.TransferModeUpdateInput;
