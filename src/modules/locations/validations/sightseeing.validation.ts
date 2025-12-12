import { z } from 'zod';
import { flatToNestedSchema } from '@/core/utils/flat-to-nested-schema';

export const createSightseeingSchema = flatToNestedSchema(
  z.object({
    cityId: z.string(),
    name: z.string(),
  }),
  data => ({
    name: data.name,
    city: { connect: { id: data.cityId } },
  })
);

export const updateSightseeingSchema = flatToNestedSchema(
  z.object({
    cityId: z.string().optional(),
    name: z.string().optional(),
  }),
  data => ({
    ...(data.name !== undefined ? { name: data.name } : {}),
    ...(data.cityId !== undefined ? { city: { connect: { id: data.cityId } } } : {}),
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
