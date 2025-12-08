import { z } from 'zod';
import { flatToNestedSchema } from '@/core/utils/flat-to-nested-schema';

export const createPackageActivitySchema = flatToNestedSchema(
  z.object({
  name: z.string(),
  image: z.string().optional(),
  }),
  data => ({
    name: data.name,
    ...(data.image !== undefined ? { image: data.image } : {}),
  })
);

export const updatePackageActivitySchema = flatToNestedSchema(
  z.object({
    name: z.string().optional(),
    image: z.string().optional(),
  }),
  data => ({
    ...(data.name !== undefined ? { name: data.name } : {}),
    ...(data.image !== undefined ? { image: data.image } : {}),
  })
);

export const packageactivityIdParamSchema = z.object({
  id: z.string().uuid(),
});

export const searchQuerySchema = z.object({
  q: z.string().min(3),
});

export const packageactivityValidation = {
  create: createPackageActivitySchema,
  update: updatePackageActivitySchema,
  idParam: packageactivityIdParamSchema,
  search: searchQuerySchema
};
