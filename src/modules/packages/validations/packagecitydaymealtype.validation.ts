import { z } from 'zod';
import { flatToNestedSchema } from '@/core/utils/flat-to-nested-schema';

export const createPackageCityDayMealTypeSchema = flatToNestedSchema(
  z.object({
    packageCityDayId: z.string().uuid("Invalid Package City Day ID"),
    mealTypeId: z.string().uuid("Invalid Meal Type ID"),
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
    }
  })
);

export const updatePackageCityDayMealTypeSchema = flatToNestedSchema(
  z.object({
    provider: z.string().optional(),
    time: z.string().optional(),
    description: z.string().optional(),
  }),
  data => ({
    ...(data.provider !== undefined ? { provider: data.provider } : {}),
    ...(data.time !== undefined ? { time: data.time } : {}),
    ...(data.description !== undefined ? { description: data.description } : {}),
  })
);

export const packageCityDayMealTypeValidation = {
  create: createPackageCityDayMealTypeSchema,
  update: updatePackageCityDayMealTypeSchema,
};