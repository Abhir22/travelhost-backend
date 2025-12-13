import { z } from 'zod';
import { flatToNestedSchema } from '@/core/utils/flat-to-nested-schema';

export const createPackageTypeSchema = flatToNestedSchema(
  z.object({
  name: z.string().trim().min(1, "Package type name is required"),
  image: z.string().trim().min(1, "Image URL cannot be empty").nullable().optional(),
  isInternational: z.boolean(),
  }),
  data => ({
    name: data.name,
    isInternational: data.isInternational,
    ...(data.image !== undefined ? { image: data.image } : {}),
  })
);

export const updatePackageTypeSchema = flatToNestedSchema(
  z.object({
    name: z.string().trim().min(1, "Package type name cannot be empty").optional(),
    image: z.string().trim().min(1, "Image URL cannot be empty").nullable().optional(),
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
