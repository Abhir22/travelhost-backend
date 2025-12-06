import { z } from 'zod';
import { flatToNestedSchema } from '@/core/utils/flat-to-nested-schema';

export const createPackageCityDayTravelSchema = flatToNestedSchema(
  z.object({
  packageCityDayId: z.string(),
  type: z.string(),
  carpooling: z.string(),
  vehicleType: z.string(),
  timeFrom: z.string(),
  timeTo: z.string(),
  description: z.any(),
  }),
  data => ({
    type: data.type,
    carpooling: data.carpooling,
    vehicleType: data.vehicleType,
    timeFrom: data.timeFrom,
    timeTo: data.timeTo,
    description: data.description,
    packageCityDay: { connect: { id: data.packageCityDayId } },
  })
);

export const updatePackageCityDayTravelSchema = flatToNestedSchema(
  z.object({
    packageCityDayId: z.string().optional(),
    type: z.string().optional(),
    carpooling: z.string().optional(),
    vehicleType: z.string().optional(),
    timeFrom: z.string().optional(),
    timeTo: z.string().optional(),
    description: z.any().optional(),
  }),
  data => ({
    ...(data.type !== undefined ? { type: data.type } : {}),
    ...(data.carpooling !== undefined ? { carpooling: data.carpooling } : {}),
    ...(data.vehicleType !== undefined ? { vehicleType: data.vehicleType } : {}),
    ...(data.timeFrom !== undefined ? { timeFrom: data.timeFrom } : {}),
    ...(data.timeTo !== undefined ? { timeTo: data.timeTo } : {}),
    ...(data.description !== undefined ? { description: data.description } : {}),
    ...(data.packageCityDayId !== undefined ? { packageCityDay: { connect: { id: data.packageCityDayId } } } : {}),
  })
);

export const packagecitydaytravelIdParamSchema = z.object({
  id: z.string().uuid(),
});

export const searchQuerySchema = z.object({
  q: z.string().min(3),
});

export const packagecitydaytravelValidation = {
  create: createPackageCityDayTravelSchema,
  update: updatePackageCityDayTravelSchema,
  idParam: packagecitydaytravelIdParamSchema,
  search: searchQuerySchema
};
