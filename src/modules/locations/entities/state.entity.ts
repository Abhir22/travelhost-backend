import { Prisma } from '@prisma/client';

export type State = Prisma.StateGetPayload<{
  // include: {
  //   // Add related models here if needed
  // }
}>;

export type StateCreateDto = Prisma.StateCreateInput;
export type StateUpdateDto = Prisma.StateUpdateInput;
