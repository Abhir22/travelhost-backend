import { Prisma } from '@prisma/client';

export type Sightseeing = Prisma.SightseeingGetPayload<{
  // include: {
  //   // Add related models here if needed
  // }
}>;

export type SightseeingCreateDto = Prisma.SightseeingCreateInput;
export type SightseeingUpdateDto = Prisma.SightseeingUpdateInput;
