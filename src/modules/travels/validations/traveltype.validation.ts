import { z } from 'zod';
import { flatToNestedSchema } from '@/core/utils/flat-to-nested-schema';

export const createTravelTypeSchema = flatToNestedSchema(
  z.object({
    name: z.string().trim().min(1, "Travel type name is required"),
  }),
  data => ({
    name: data.name,
  })
);

export const updateTravelTypeSchema = flatToNestedSchema(
  z.object({
    name: z.string().trim().min(1, "Travel type name cannot be empty").optional(),
  }),
  data => ({
    ...(data.name !== undefined ? { name: data.name } : {}),
  })
);

export const traveltypeIdParamSchema = z.object({
  id: z.string().uuid(),
});

export const searchQuerySchema = z.object({
  q: z.string().min(3),
});

export const traveltypeValidation = {
  create: createTravelTypeSchema,
  update: updateTravelTypeSchema,
  idParam: traveltypeIdParamSchema,
  search: searchQuerySchema
};
