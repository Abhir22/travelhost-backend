import { z } from 'zod';
import { flatToNestedSchema } from '@/core/utils/flat-to-nested-schema';

export const createPackageCategoryMappingSchema = flatToNestedSchema(
  z.object({
  packageId: z.string(),
  categoryId: z.string(),
  }),
  data => ({

    package: { connect: { id: data.packageId } },
    category: { connect: { id: data.categoryId } },
  })
);

export const updatePackageCategoryMappingSchema = flatToNestedSchema(
  z.object({
    packageId: z.string().optional(),
    categoryId: z.string().optional(),
  }),
  data => ({

    ...(data.packageId !== undefined ? { package: { connect: { id: data.packageId } } } : {}),
    ...(data.categoryId !== undefined ? { category: { connect: { id: data.categoryId } } } : {}),
  })
);

export const packagecategorymappingIdParamSchema = z.object({
  id: z.string().uuid(),
});

export const searchQuerySchema = z.object({
  q: z.string().min(3),
});

export const packagecategorymappingValidation = {
  create: createPackageCategoryMappingSchema,
  update: updatePackageCategoryMappingSchema,
  idParam: packagecategorymappingIdParamSchema,
  search: searchQuerySchema
};
