import { Prisma } from '@prisma/client';

export type MealType = Prisma.MealTypeGetPayload<{
  include: {
    packagemealtypes: true,
    packagecitydaymealtypes: true
  }
}>;

export type MealTypeCreateDto = Prisma.MealTypeCreateInput;
export type MealTypeUpdateDto = Prisma.MealTypeUpdateInput;