import { z } from 'zod';
import { flatToNestedSchema } from '@/core/utils/flat-to-nested-schema';

export const createPackageCityDaySchema = flatToNestedSchema(
  z.object({
  packageCityId: z.string(),
  dayNumber: z.number(),
  startTime: z.string().optional(),
  endTime: z.string().optional(),
  startFrom: z.string(),
  endAt: z.string(),
  description: z.any(),
  }),
  data => ({
    dayNumber: data.dayNumber,
    startTime: data.startTime,
    endTime: data.endTime,
    startFrom: data.startFrom,
    endAt: data.endAt,
    description: data.description,
    packageCity: { connect: { id: data.packageCityId } },
  })
);

export const updatePackageCityDaySchema = flatToNestedSchema(
  z.object({
    packageCityId: z.string().optional(),
    dayNumber: z.number().optional(),
    startTime: z.string().optional(),
    endTime: z.string().optional(),
    startFrom: z.string().optional(),
    endAt: z.string().optional(),
    description: z.any().optional(),
  }),
  data => ({
    ...(data.dayNumber !== undefined ? { dayNumber: data.dayNumber } : {}),
    ...(data.startTime !== undefined ? { startTime: data.startTime } : {}),
    ...(data.endTime !== undefined ? { endTime: data.endTime } : {}),
    ...(data.startFrom !== undefined ? { startFrom: data.startFrom } : {}),
    ...(data.endAt !== undefined ? { endAt: data.endAt } : {}),
    ...(data.description !== undefined ? { description: data.description } : {}),
    ...(data.packageCityId !== undefined ? { packageCity: { connect: { id: data.packageCityId } } } : {}),
  })
);

export const packagecitydayIdParamSchema = z.object({
  id: z.string().uuid(),
});

export const searchQuerySchema = z.object({
  q: z.string().min(3),
});

export const packagecitydayValidation = {
  create: createPackageCityDaySchema,
  update: updatePackageCityDaySchema,
  idParam: packagecitydayIdParamSchema,
  search: searchQuerySchema
};
