import { z } from 'zod';
import { flatToNestedSchema } from '@/core/utils/flat-to-nested-schema';

export const createPackageExclusionSchema = flatToNestedSchema(
    z.object({
        packageId: z.string().uuid("Invalid Package ID"),
        content: z.string().min(1, "Content is required"),
    }),
    data => data
);

export const updatePackageExclusionSchema = flatToNestedSchema(
    z.object({
        content: z.string().min(1, "Content cannot be empty").optional(),
    }),
    data => data
);

export const packageExclusionValidation = {
    create: createPackageExclusionSchema,
    update: updatePackageExclusionSchema,
};
