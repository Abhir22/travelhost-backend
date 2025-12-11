import { z } from 'zod';
import { flatToNestedSchema } from '@/core/utils/flat-to-nested-schema';

export const createPackageCitySchema = flatToNestedSchema(
  z.object({
    packageId: z.string(),
    countryId: z.string(),
    stateId: z.string().optional(),
    cityId: z.string(),
    totalDays: z.number(),
    totalNights: z.number(),
  }),
  data => ({
    totalDays: data.totalDays,
    totalNights: data.totalNights,
    package: { connect: { id: data.packageId } },
    cityObj: { connect: { id: data.cityId } },
    stateObj: { connect: { id: data.stateId } },
    countryObj: { connect: { id: data.countryId } },
  })
);

export const updatePackageCitySchema = flatToNestedSchema(
  z.object({
    packageId: z.string().optional(),
    countryId: z.string().optional(),
    stateId: z.string().optional(),
    cityId: z.string().optional(),
    totalDays: z.number().optional(),
    totalNights: z.number().optional(),
  }),
  data => ({
    ...(data.totalDays !== undefined ? { totalDays: data.totalDays } : {}),
    ...(data.totalNights !== undefined ? { totalNights: data.totalNights } : {}),
    ...(data.packageId !== undefined ? { package: { connect: { id: data.packageId } } } : {}),
    ...(data.cityId !== undefined ? { cityObj: { connect: { id: data.cityId } } } : {}),
    ...(data.stateId !== undefined ? { stateObj: { connect: { id: data.stateId } } } : {}),
    ...(data.countryId !== undefined ? { countryObj: { connect: { id: data.countryId } } } : {}),
  })
);

export const packagecityIdParamSchema = z.object({
  id: z.string().uuid(),
});

export const searchQuerySchema = z.object({
  q: z.string().min(3),
});

export const packagecityValidation = {
  create: createPackageCitySchema,
  update: updatePackageCitySchema,
  idParam: packagecityIdParamSchema,
  search: searchQuerySchema
};
