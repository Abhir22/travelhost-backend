import { z } from 'zod';
import { flatToNestedSchema } from '@/core/utils/flat-to-nested-schema';

export const createPackageCategorySchema = flatToNestedSchema(
  z.object({
  name: z.string(),
  icon: z.string(),
  }),
  data => ({
    name: data.name,
    icon: data.icon,
  })
);

export const updatePackageCategorySchema = flatToNestedSchema(
  z.object({
    name: z.string().optional(),
    icon: z.string().optional(),
  }),
  data => ({
    ...(data.name !== undefined ? { name: data.name } : {}),
    ...(data.icon !== undefined ? { icon: data.icon } : {}),
  })
);

export const packagecategoryIdParamSchema = z.object({
  id: z.string().uuid(),
});

export const searchQuerySchema = z.object({
  q: z.string().min(3),
});

export const packagecategoryValidation = {
  create: createPackageCategorySchema,
  update: updatePackageCategorySchema,
  idParam: packagecategoryIdParamSchema,
  search: searchQuerySchema
};
