import { z } from 'zod';
import { flatToNestedSchema } from '@/core/utils/flat-to-nested-schema';

export const createSightseeingSchema = flatToNestedSchema(
  z.object({
  countryId: z.string(),
  stateId: z.string(),
  cityId: z.string(),
  name: z.string(),
  }),
  data => ({
    countryId: data.countryId,
    stateId: data.stateId,
    cityId: data.cityId,
    name: data.name,
  })
);

export const updateSightseeingSchema = flatToNestedSchema(
  z.object({
    countryId: z.string().optional(),
    stateId: z.string().optional(),
    cityId: z.string().optional(),
    name: z.string().optional(),
  }),
  data => ({
    ...(data.countryId !== undefined ? { countryId: data.countryId } : {}),
    ...(data.stateId !== undefined ? { stateId: data.stateId } : {}),
    ...(data.cityId !== undefined ? { cityId: data.cityId } : {}),
    ...(data.name !== undefined ? { name: data.name } : {}),
  })
);

export const sightseeingIdParamSchema = z.object({
  id: z.string().uuid(),
});

export const searchQuerySchema = z.object({
  q: z.string().min(3),
});

export const sightseeingValidation = {
  create: createSightseeingSchema,
  update: updateSightseeingSchema,
  idParam: sightseeingIdParamSchema,
  search: searchQuerySchema
};
