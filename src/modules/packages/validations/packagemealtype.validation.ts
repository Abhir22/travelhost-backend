import { z } from 'zod';

export const packagemealtypeValidation = {
  create: z.object({
    packageId: z.string(),
    mealTypeId: z.string(),
  }).transform(
    data => ({
      packageId: data.packageId,
      mealTypeId: data.mealTypeId,
    })
  ),

  update: z.object({
    packageId: z.string().optional(),
    mealTypeId: z.string().optional(),
  }).transform(
    data => ({
      ...(data.packageId !== undefined ? { packageId: data.packageId } : {}),
      ...(data.mealTypeId !== undefined ? { mealTypeId: data.mealTypeId } : {}),
    })
  ),
};