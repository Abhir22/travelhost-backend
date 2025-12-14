import { z } from 'zod';
import { flatToNestedSchema } from '@/core/utils/flat-to-nested-schema';

export const createPackageGallerySchema = flatToNestedSchema(
    z.object({
        packageId: z.string().uuid("Invalid Package ID"),
        imageUrl: z.string().url("Invalid Image URL"),
        imageOrder: z.number().int("Image order must be an integer"),
        isCover: z.boolean().optional(),
    }),
    data => data
);

export const updatePackageGallerySchema = flatToNestedSchema(
    z.object({
        imageUrl: z.string().url("Invalid Image URL").optional(),
        imageOrder: z.number().int("Image order must be an integer").optional(),
        isCover: z.boolean().optional(),
    }),
    data => data
);

export const packageGalleryValidation = {
    create: createPackageGallerySchema,
    update: updatePackageGallerySchema,
};
