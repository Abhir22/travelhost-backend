import { Prisma } from '@prisma/client';

export type City = Prisma.CityGetPayload<{
  // include: {
  //   // Add related models here if needed
  // }
}>;

export type CityCreateDto = Prisma.CityCreateInput;
export type CityUpdateDto = Prisma.CityUpdateInput;
