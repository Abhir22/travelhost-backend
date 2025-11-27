import { z } from 'zod';
import { flatToNestedSchema } from '@/core/utils/flat-to-nested-schema';

export const createCitySchema = flatToNestedSchema(
  z.object({
  stateId: z.string(),
  name: z.string(),
  }),
  data => ({
    stateId: data.stateId,
    name: data.name,
  })
);

export const updateCitySchema = flatToNestedSchema(
  z.object({
    stateId: z.string().optional(),
    name: z.string().optional(),
  }),
  data => ({
    ...(data.stateId !== undefined ? { stateId: data.stateId } : {}),
    ...(data.name !== undefined ? { name: data.name } : {}),
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
