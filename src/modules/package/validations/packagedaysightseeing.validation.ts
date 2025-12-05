import { z } from 'zod';
import { flatToNestedSchema } from '@/core/utils/flat-to-nested-schema';

export const createPackageDaySightseeingSchema = flatToNestedSchema(
  z.object({
  packageDayId: z.string(),
  sightseeingName: z.string(),
  ticket: z.string(),
  timeFrom: z.string(),
  timeTo: z.string(),
  }),
  data => ({
    sightseeingName: data.sightseeingName,
    ticket: data.ticket,
    timeFrom: data.timeFrom,
    timeTo: data.timeTo,
    packageDay: { connect: { id: data.packageDayId } },
  })
);

export const updatePackageDaySightseeingSchema = flatToNestedSchema(
  z.object({
    packageDayId: z.string().optional(),
    sightseeingName: z.string().optional(),
    ticket: z.string().optional(),
    timeFrom: z.string().optional(),
    timeTo: z.string().optional(),
  }),
  data => ({
    ...(data.sightseeingName !== undefined ? { sightseeingName: data.sightseeingName } : {}),
    ...(data.ticket !== undefined ? { ticket: data.ticket } : {}),
    ...(data.timeFrom !== undefined ? { timeFrom: data.timeFrom } : {}),
    ...(data.timeTo !== undefined ? { timeTo: data.timeTo } : {}),
    ...(data.packageDayId !== undefined ? { packageDay: { connect: { id: data.packageDayId } } } : {}),
  })
);

export const packagedaysightseeingIdParamSchema = z.object({
  id: z.string().uuid(),
});

export const searchQuerySchema = z.object({
  q: z.string().min(3),
});

export const packagedaysightseeingValidation = {
  create: createPackageDaySightseeingSchema,
  update: updatePackageDaySightseeingSchema,
  idParam: packagedaysightseeingIdParamSchema,
  search: searchQuerySchema
};
