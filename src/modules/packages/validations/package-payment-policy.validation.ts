import { z } from 'zod';
import { flatToNestedSchema } from '@/core/utils/flat-to-nested-schema';

export const createPackagePaymentPolicySchema = flatToNestedSchema(
    z.object({
        packageId: z.string().uuid("Invalid Package ID"),
        content: z.string().min(1, "Content is required"),
    }),
    data => ({
        content: data.content,
        package: {
            connect: {
                id: data.packageId
            }
        }
    })
);

export const updatePackagePaymentPolicySchema = flatToNestedSchema(
    z.object({
        content: z.string().min(1, "Content cannot be empty").optional(),
    }),
    data => data
);

export const packagePaymentPolicyValidation = {
    create: createPackagePaymentPolicySchema,
    update: updatePackagePaymentPolicySchema,
};
