import { Prisma } from '@prisma/client';

export type MealCategory = Prisma.MealCategoryGetPayload<{
  // include: {
  //   // Add related models here if needed
  // }
}>;

export type MealCategoryCreateDto = Prisma.MealCategoryCreateInput;
export type MealCategoryUpdateDto = Prisma.MealCategoryUpdateInput;
