import { z } from 'zod';
import { flatToNestedSchema } from '@/core/utils/flat-to-nested-schema';

export const createPackageCategorySchema = flatToNestedSchema(
  z.object({
  name: z.string().trim().min(1, "Package category name is required"),
  icon: z.string().trim().min(1, "Icon cannot be empty").nullable().optional(),
  }),
  data => ({
    name: data.name,
    ...(data.icon !== undefined ? { icon: data.icon } : {}),
  })
);

export const updatePackageCategorySchema = flatToNestedSchema(
  z.object({
    name: z.string().trim().min(1, "Package category name cannot be empty").optional(),
    icon: z.string().trim().min(1, "Icon cannot be empty").nullable().optional(),
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
