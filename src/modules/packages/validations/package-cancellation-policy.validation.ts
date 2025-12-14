import { z } from 'zod';
import { flatToNestedSchema } from '@/core/utils/flat-to-nested-schema';

export const createPackageCancellationPolicySchema = flatToNestedSchema(
    z.object({
        packageId: z.string().uuid("Invalid Package ID"),
        content: z.string().min(1, "Content is required"),
    }),
    data => data
);

export const updatePackageCancellationPolicySchema = flatToNestedSchema(
    z.object({
        content: z.string().min(1, "Content cannot be empty").optional(),
    }),
    data => data
);

export const packageCancellationPolicyValidation = {
    create: createPackageCancellationPolicySchema,
    update: updatePackageCancellationPolicySchema,
};
