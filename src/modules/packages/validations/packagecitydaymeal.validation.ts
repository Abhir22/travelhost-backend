import { z } from 'zod';
import { flatToNestedSchema } from '@/core/utils/flat-to-nested-schema';

export const createPackageCityDayMealSchema = flatToNestedSchema(
  z.object({
  packageCityDayId: z.string(),
  mealType: z.string(),
  provider: z.string(),
  time: z.string(),
  description: z.any(),
  }),
  data => ({
    mealType: data.mealType,
    provider: data.provider,
    time: data.time,
    description: data.description,
    packageCityDay: { connect: { id: data.packageCityDayId } },
  })
);

export const updatePackageCityDayMealSchema = flatToNestedSchema(
  z.object({
    packageCityDayId: z.string().optional(),
    mealType: z.string().optional(),
    provider: z.string().optional(),
    time: z.string().optional(),
    description: z.any().optional(),
  }),
  data => ({
    ...(data.mealType !== undefined ? { mealType: data.mealType } : {}),
    ...(data.provider !== undefined ? { provider: data.provider } : {}),
    ...(data.time !== undefined ? { time: data.time } : {}),
    ...(data.description !== undefined ? { description: data.description } : {}),
    ...(data.packageCityDayId !== undefined ? { packageCityDay: { connect: { id: data.packageCityDayId } } } : {}),
  })
);

export const packagecitydaymealIdParamSchema = z.object({
  id: z.string().uuid(),
});

export const searchQuerySchema = z.object({
  q: z.string().min(3),
});

export const packagecitydaymealValidation = {
  create: createPackageCityDayMealSchema,
  update: updatePackageCityDayMealSchema,
  idParam: packagecitydaymealIdParamSchema,
  search: searchQuerySchema
};
