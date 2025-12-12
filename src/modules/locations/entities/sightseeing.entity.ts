import { Prisma } from '@prisma/client';

export type Sightseeing = Prisma.SightseeingGetPayload<{
  include: {
    city: {
      include: {
        country: true;
        state: true;
      }
    }
  }
}>;

export type SightseeingCreateDto = Prisma.SightseeingCreateInput;
export type SightseeingUpdateDto = Prisma.SightseeingUpdateInput;
