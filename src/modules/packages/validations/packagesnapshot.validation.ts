import { z } from 'zod';
import { flatToNestedSchema } from '@/core/utils/flat-to-nested-schema';

export const createPackageSnapshotSchema = flatToNestedSchema(
  z.object({
  name: z.string(),
  icon: z.string(),
  }),
  data => ({
    name: data.name,
    icon: data.icon,
  })
);

export const updatePackageSnapshotSchema = flatToNestedSchema(
  z.object({
    name: z.string().optional(),
    icon: z.string().optional(),
  }),
  data => ({
    ...(data.name !== undefined ? { name: data.name } : {}),
    ...(data.icon !== undefined ? { icon: data.icon } : {}),
  })
);

export const packagesnapshotIdParamSchema = z.object({
  id: z.string().uuid(),
});

export const searchQuerySchema = z.object({
  q: z.string().min(3),
});

export const packagesnapshotValidation = {
  create: createPackageSnapshotSchema,
  update: updatePackageSnapshotSchema,
  idParam: packagesnapshotIdParamSchema,
  search: searchQuerySchema
};
