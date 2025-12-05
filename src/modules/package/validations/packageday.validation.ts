import { z } from 'zod';
import { flatToNestedSchema } from '@/core/utils/flat-to-nested-schema';

export const createPackageDaySchema = flatToNestedSchema(
  z.object({
  packageId: z.string(),
  dayNumber: z.number(),
  }),
  data => ({
    dayNumber: data.dayNumber,
    package: { connect: { id: data.packageId } },
  })
);

export const updatePackageDaySchema = flatToNestedSchema(
  z.object({
    packageId: z.string().optional(),
    dayNumber: z.number().optional(),
  }),
  data => ({
    ...(data.dayNumber !== undefined ? { dayNumber: data.dayNumber } : {}),
    ...(data.packageId !== undefined ? { package: { connect: { id: data.packageId } } } : {}),
  })
);

export const packagedayIdParamSchema = z.object({
  id: z.string().uuid(),
});

export const searchQuerySchema = z.object({
  q: z.string().min(3),
});

export const packagedayValidation = {
  create: createPackageDaySchema,
  update: updatePackageDaySchema,
  idParam: packagedayIdParamSchema,
  search: searchQuerySchema
};
