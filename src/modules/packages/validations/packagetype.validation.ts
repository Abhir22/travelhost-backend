import { z } from 'zod';
import { flatToNestedSchema } from '@/core/utils/flat-to-nested-schema';

export const createPackageTypeSchema = flatToNestedSchema(
  z.object({
  name: z.string(),
  image: z.string(),
  isInternational: z.boolean(),
  }),
  data => ({
    name: data.name,
    image: data.image,
    isInternational: data.isInternational,
  })
);

export const updatePackageTypeSchema = flatToNestedSchema(
  z.object({
    name: z.string().optional(),
    image: z.string().optional(),
    isInternational: z.boolean().optional(),
  }),
  data => ({
    ...(data.name !== undefined ? { name: data.name } : {}),
    ...(data.image !== undefined ? { image: data.image } : {}),
    ...(data.isInternational !== undefined ? { isInternational: data.isInternational } : {}),
  })
);

export const packagetypeIdParamSchema = z.object({
  id: z.string().uuid(),
});

export const searchQuerySchema = z.object({
  q: z.string().min(3),
});

export const packagetypeValidation = {
  create: createPackageTypeSchema,
  update: updatePackageTypeSchema,
  idParam: packagetypeIdParamSchema,
  search: searchQuerySchema
};
