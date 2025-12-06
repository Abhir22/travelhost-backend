import { z } from 'zod';
import { flatToNestedSchema } from '@/core/utils/flat-to-nested-schema';

export const createPackageCitySchema = flatToNestedSchema(
  z.object({
  packageId: z.string(),
  countryId: z.string(),
  stateId: z.string(),
  cityId: z.string(),
  totalDays: z.number(),
  totalNights: z.number(),
  }),
  data => ({
    countryId: data.countryId,
    stateId: data.stateId,
    cityId: data.cityId,
    totalDays: data.totalDays,
    totalNights: data.totalNights,
    package: { connect: { id: data.packageId } },
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
    ...(data.countryId !== undefined ? { countryId: data.countryId } : {}),
    ...(data.stateId !== undefined ? { stateId: data.stateId } : {}),
    ...(data.cityId !== undefined ? { cityId: data.cityId } : {}),
    ...(data.totalDays !== undefined ? { totalDays: data.totalDays } : {}),
    ...(data.totalNights !== undefined ? { totalNights: data.totalNights } : {}),
    ...(data.packageId !== undefined ? { package: { connect: { id: data.packageId } } } : {}),
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
