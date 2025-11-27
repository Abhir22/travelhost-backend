import { Prisma } from '@prisma/client';

export type Country = Prisma.CountryGetPayload<{
  // include: {
  //   // Add related models here if needed
  // }
}>;

export type CountryCreateDto = Prisma.CountryCreateInput;
export type CountryUpdateDto = Prisma.CountryUpdateInput;
