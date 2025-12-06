import { z } from 'zod';
import { flatToNestedSchema } from '@/core/utils/flat-to-nested-schema';

export const createPackageActivityMappingSchema = flatToNestedSchema(
  z.object({
  packageId: z.string(),
  activityId: z.string(),
  }),
  data => ({

    package: { connect: { id: data.packageId } },
    activity: { connect: { id: data.activityId } },
  })
);

export const updatePackageActivityMappingSchema = flatToNestedSchema(
  z.object({
    packageId: z.string().optional(),
    activityId: z.string().optional(),
  }),
  data => ({

    ...(data.packageId !== undefined ? { package: { connect: { id: data.packageId } } } : {}),
    ...(data.activityId !== undefined ? { activity: { connect: { id: data.activityId } } } : {}),
  })
);

export const packageactivitymappingIdParamSchema = z.object({
  id: z.string().uuid(),
});

export const searchQuerySchema = z.object({
  q: z.string().min(3),
});

export const packageactivitymappingValidation = {
  create: createPackageActivityMappingSchema,
  update: updatePackageActivityMappingSchema,
  idParam: packageactivitymappingIdParamSchema,
  search: searchQuerySchema
};
