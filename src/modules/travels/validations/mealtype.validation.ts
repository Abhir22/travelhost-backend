import { z } from 'zod';
import { flatToNestedSchema } from '@/core/utils/flat-to-nested-schema';

export const createMealTypeSchema = flatToNestedSchema(
    z.object({
        name: z.string().min(1),
        description: z.string().min(1).optional(),
    }),
    data => ({
        name: data.name,
        description: data.description,
    })
);

export const updateMealTypeSchema = flatToNestedSchema(
    z.object({
        name: z.string().min(1).optional(),
        description: z.string().min(1).optional(),
    }),
    data => ({
        ...(data.name !== undefined ? { name: data.name } : {}),
        ...(data.description !== undefined ? { description: data.description } : {}),
    })
);

export const mealTypeIdParamSchema = z.object({
    id: z.string().uuid(),
});

export const searchQuerySchema = z.object({
    q: z.string().min(1),
});

export const mealTypeValidation = {
    create: createMealTypeSchema,
    update: updateMealTypeSchema,
    idParam: mealTypeIdParamSchema,
    search: searchQuerySchema
};
