import { Prisma } from '@prisma/client';

export type TransferMode = Prisma.TransferModeGetPayload<{
  // include: {
  //   // Add related models here if needed
  // }
}>;

export type TransferModeCreateDto = Prisma.TransferModeCreateInput;
export type TransferModeUpdateDto = Prisma.TransferModeUpdateInput;