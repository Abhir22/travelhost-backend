import { z } from 'zod';
import { flatToNestedSchema } from '@/core/utils/flat-to-nested-schema';

export const createPackageCityDaySightseeingSchema = flatToNestedSchema(
  z.object({
  packageCityDayId: z.string(),
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
    packageCityDay: { connect: { id: data.packageCityDayId } },
  })
);

export const updatePackageCityDaySightseeingSchema = flatToNestedSchema(
  z.object({
    packageCityDayId: z.string().optional(),
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
    ...(data.packageCityDayId !== undefined ? { packageCityDay: { connect: { id: data.packageCityDayId } } } : {}),
  })
);

export const packagecitydaysightseeingIdParamSchema = z.object({
  id: z.string().uuid(),
});

export const searchQuerySchema = z.object({
  q: z.string().min(3),
});

export const packagecitydaysightseeingValidation = {
  create: createPackageCityDaySightseeingSchema,
  update: updatePackageCityDaySightseeingSchema,
  idParam: packagecitydaysightseeingIdParamSchema,
  search: searchQuerySchema
};
