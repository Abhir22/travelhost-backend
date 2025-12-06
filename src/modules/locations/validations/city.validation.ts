import { z } from 'zod';
import { flatToNestedSchema } from '@/core/utils/flat-to-nested-schema';

export const createCitySchema = flatToNestedSchema(
  z.object({
  countryId: z.string(),
  stateId: z.string().optional(),
  name: z.string(),
  }),
  data => ({
    name: data.name,
    country: { connect: { id: data.countryId } },
    ...(data.stateId ? { state: { connect: { id: data.stateId } } } : {}),
  })
);

export const updateCitySchema = flatToNestedSchema(
  z.object({
    countryId: z.string().optional(),
    stateId: z.string().optional(),
    name: z.string().optional(),
  }),
  data => ({
    ...(data.name !== undefined ? { name: data.name } : {}),
    ...(data.countryId !== undefined ? { country: { connect: { id: data.countryId } } } : {}),
    ...(data.stateId !== undefined ? { state: { connect: { id: data.stateId } } } : {}),
  })
);

export const cityIdParamSchema = z.object({
  id: z.string().uuid(),
});

export const searchQuerySchema = z.object({
  q: z.string().min(3),
});

export const cityValidation = {
  create: createCitySchema,
  update: updateCitySchema,
  idParam: cityIdParamSchema,
  search: searchQuerySchema
};
