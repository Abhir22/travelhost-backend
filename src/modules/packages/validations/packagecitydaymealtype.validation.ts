import { z } from 'zod';
import { flatToNestedSchema } from '@/core/utils/flat-to-nested-schema';

export const createPackageCityDayMealTypeSchema = flatToNestedSchema(
  z.object({
    packageCityDayId: z.string().uuid("Invalid Package City Day ID"),
    mealTypeId: z.string().uuid("Invalid Meal Type ID"),
    mealCategoryId: z.string().uuid("Invalid Meal Category ID").optional(),
    provider: z.string().optional(),
    time: z.string().optional(),
    description: z.string().optional(),
  }),
  data => ({
    provider: data.provider,
    time: data.time,
    description: data.description,
    packageCityDay: {
      connect: {
        id: data.packageCityDayId
      }
    },
    mealType: {
      connect: {
        id: data.mealTypeId
      }
    },
    ...(data.mealCategoryId ? {
      mealCategory: {
        connect: {
          id: data.mealCategoryId
        }
      }
    } : {})
  })
);

export const updatePackageCityDayMealTypeSchema = flatToNestedSchema(
  z.object({
    mealCategoryId: z.string().uuid("Invalid Meal Category ID").optional(),
    provider: z.string().optional(),
    time: z.string().optional(),
    description: z.string().optional(),
  }),
  data => ({
    ...(data.provider !== undefined ? { provider: data.provider } : {}),
    ...(data.time !== undefined ? { time: data.time } : {}),
    ...(data.description !== undefined ? { description: data.description } : {}),
    ...(data.mealCategoryId !== undefined ? {
      mealCategory: data.mealCategoryId ? {
        connect: { id: data.mealCategoryId }
      } : {
        disconnect: true
      }
    } : {}),
  })
);

export const packageCityDayMealTypeValidation = {
  create: createPackageCityDayMealTypeSchema,
  update: updatePackageCityDayMealTypeSchema,
};