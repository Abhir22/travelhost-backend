import { z } from 'zod';
import { flatToNestedSchema } from '@/core/utils/flat-to-nested-schema';

export const createPackageSnapshotMappingSchema = flatToNestedSchema(
  z.object({
  packageId: z.string(),
  snapshotId: z.string(),
  }),
  data => ({

    package: { connect: { id: data.packageId } },
    snapshot: { connect: { id: data.snapshotId } },
  })
);

export const updatePackageSnapshotMappingSchema = flatToNestedSchema(
  z.object({
    packageId: z.string().optional(),
    snapshotId: z.string().optional(),
  }),
  data => ({

    ...(data.packageId !== undefined ? { package: { connect: { id: data.packageId } } } : {}),
    ...(data.snapshotId !== undefined ? { snapshot: { connect: { id: data.snapshotId } } } : {}),
  })
);

export const packagesnapshotmappingIdParamSchema = z.object({
  id: z.string().uuid(),
});

export const searchQuerySchema = z.object({
  q: z.string().min(3),
});

export const packagesnapshotmappingValidation = {
  create: createPackageSnapshotMappingSchema,
  update: updatePackageSnapshotMappingSchema,
  idParam: packagesnapshotmappingIdParamSchema,
  search: searchQuerySchema
};
