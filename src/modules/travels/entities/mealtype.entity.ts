import { Prisma } from '@prisma/client';

export type MealType = Prisma.MealTypeGetPayload<{
    // include: {
    //   // Add related models here if needed
    // }
}>;

export type MealTypeCreateDto = Prisma.MealTypeCreateInput;
export type MealTypeUpdateDto = Prisma.MealTypeUpdateInput;
