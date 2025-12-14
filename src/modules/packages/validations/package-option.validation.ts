import { z } from 'zod';
import { flatToNestedSchema } from '@/core/utils/flat-to-nested-schema';

export const createPackageOptionSchema = flatToNestedSchema(
    z.object({
        packageId: z.string().uuid("Invalid Package ID"),
        includeGroupDeparture: z.boolean().optional(),
        includeFixedDeparture: z.boolean().optional(),
        includePackageAvailability: z.boolean().optional(),
    }),
    data => data
);

export const updatePackageOptionSchema = flatToNestedSchema(
    z.object({
        includeGroupDeparture: z.boolean().optional(),
        includeFixedDeparture: z.boolean().optional(),
        includePackageAvailability: z.boolean().optional(),
    }),
    data => data
);

export const packageOptionValidation = {
    create: createPackageOptionSchema,
    update: updatePackageOptionSchema,
};
