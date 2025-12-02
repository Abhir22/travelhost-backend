import { Prisma } from '@prisma/client';

export type Destination = Prisma.DestinationGetPayload<{
  // include: {
  //   // Add related models here if needed
  // }
}>;

export type DestinationCreateDto = Prisma.DestinationCreateInput;
export type DestinationUpdateDto = Prisma.DestinationUpdateInput;
