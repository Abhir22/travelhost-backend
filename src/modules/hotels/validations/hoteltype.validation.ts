import { z } from 'zod';
import { flatToNestedSchema } from '@/core/utils/flat-to-nested-schema';

export const createHotelTypeSchema = flatToNestedSchema(
    z.object({
        name: z.string().trim().min(1, "Hotel type name is required"),
        description: z.string().trim().min(1, "Description cannot be empty").nullable().optional(),
    }),
    data => ({
        name: data.name,
        description: data.description,
    })
);

export const updateHotelTypeSchema = flatToNestedSchema(
    z.object({
        name: z.string().trim().min(1, "Hotel type name cannot be empty").optional(),
        description: z.string().trim().min(1, "Description cannot be empty").nullable().optional(),
    }),
    data => ({
        ...(data.name !== undefined ? { name: data.name } : {}),
        ...(data.description !== undefined ? { description: data.description } : {}),
    })
);

export const hoteltypeIdParamSchema = z.object({
    id: z.string().uuid(),
});

export const searchQuerySchema = z.object({
    q: z.string().min(3),
});

export const hoteltypeValidation = {
    create: createHotelTypeSchema,
    update: updateHotelTypeSchema,
    idParam: hoteltypeIdParamSchema,
    search: searchQuerySchema
};
