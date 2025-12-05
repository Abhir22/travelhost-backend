import { z } from 'zod';
import { flatToNestedSchema } from '@/core/utils/flat-to-nested-schema';

export const createPackageSchema = flatToNestedSchema(
  z.object({
  packageTypeId: z.string(),
  packageName: z.string(),
  countryId: z.string(),
  stateId: z.string(),
  cityId: z.string(),
  days: z.number(),
  nights: z.number(),
  }),
  data => ({
    packageName: data.packageName,
    countryId: data.countryId,
    stateId: data.stateId,
    cityId: data.cityId,
    days: data.days,
    nights: data.nights,
    packageType: { connect: { id: data.packageTypeId } },
  })
);

export const updatePackageSchema = flatToNestedSchema(
  z.object({
    packageTypeId: z.string().optional(),
    packageName: z.string().optional(),
    countryId: z.string().optional(),
    stateId: z.string().optional(),
    cityId: z.string().optional(),
    days: z.number().optional(),
    nights: z.number().optional(),
  }),
  data => ({
    ...(data.packageName !== undefined ? { packageName: data.packageName } : {}),
    ...(data.countryId !== undefined ? { countryId: data.countryId } : {}),
    ...(data.stateId !== undefined ? { stateId: data.stateId } : {}),
    ...(data.cityId !== undefined ? { cityId: data.cityId } : {}),
    ...(data.days !== undefined ? { days: data.days } : {}),
    ...(data.nights !== undefined ? { nights: data.nights } : {}),
    ...(data.packageTypeId !== undefined ? { packageType: { connect: { id: data.packageTypeId } } } : {}),
  })
);

export const packageIdParamSchema = z.object({
  id: z.string().uuid(),
});

export const searchQuerySchema = z.object({
  q: z.string().min(3),
});

export const packageValidation = {
  create: createPackageSchema,
  update: updatePackageSchema,
  idParam: packageIdParamSchema,
  search: searchQuerySchema
};
