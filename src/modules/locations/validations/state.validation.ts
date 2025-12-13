import { z } from 'zod';
import { flatToNestedSchema } from '@/core/utils/flat-to-nested-schema';

export const createStateSchema = flatToNestedSchema(
  z.object({
  countryId: z.string().uuid(),
  name: z.string().trim().min(1, "State name is required"),
  }),
  data => ({
    name: data.name,
    country: { connect: { id: data.countryId } },
  })
);

export const updateStateSchema = flatToNestedSchema(
  z.object({
    countryId: z.string().uuid().optional(),
    name: z.string().trim().min(1, "State name cannot be empty").optional(),
  }),
  data => ({
    ...(data.name !== undefined ? { name: data.name } : {}),
    ...(data.countryId !== undefined
      ? { country: { connect: { id: data.countryId } } }
      : {}),
  })
);

export const stateIdParamSchema = z.object({
  id: z.string().uuid(),
});

export const searchQuerySchema = z.object({
  q: z.string().min(3),
});

export const stateValidation = {
  create: createStateSchema,
  update: updateStateSchema,
  idParam: stateIdParamSchema,
  search: searchQuerySchema
};
