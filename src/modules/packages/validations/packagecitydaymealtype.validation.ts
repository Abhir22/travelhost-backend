import { z } from 'zod';

export const packagecitydaymealtypeValidation = {
  create: z.object({
    packageCityDayId: z.string(),
    mealTypeId: z.string(),
    provider: z.string().optional(),
    time: z.string().optional(),
    description: z.string().optional(),
  }).transform(
    data => ({
      packageCityDayId: data.packageCityDayId,
      mealTypeId: data.mealTypeId,
      provider: data.provider,
      time: data.time,
      description: data.description,
    })
  ),

  update: z.object({
    packageCityDayId: z.string().optional(),
    mealTypeId: z.string().optional(),
    provider: z.string().optional(),
    time: z.string().optional(),
    description: z.string().optional(),
  }).transform(
    data => ({
      ...(data.packageCityDayId !== undefined ? { packageCityDayId: data.packageCityDayId } : {}),
      ...(data.mealTypeId !== undefined ? { mealTypeId: data.mealTypeId } : {}),
      ...(data.provider !== undefined ? { provider: data.provider } : {}),
      ...(data.time !== undefined ? { time: data.time } : {}),
      ...(data.description !== undefined ? { description: data.description } : {}),
    })
  ),
};