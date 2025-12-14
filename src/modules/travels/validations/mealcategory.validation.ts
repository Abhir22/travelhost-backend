import { z } from 'zod';
import { flatToNestedSchema } from '@/core/utils/flat-to-nested-schema';

export const createMealCategorySchema = flatToNestedSchema(
    z.object({
        name: z.string().min(1, 'Name is required').max(255, 'Name must be less than 255 characters'),
    }),
    (data) => ({
        name: data.name.trim(),
    })
);

export const updateMealCategorySchema = flatToNestedSchema(
    z.object({
        name: z.string().min(1, 'Name is required').max(255, 'Name must be less than 255 characters').optional(),
    }),
    (data) => ({
        ...(data.name !== undefined ? { name: data.name.trim() } : {}),
    })
);

export const mealCategoryIdParamSchema = z.object({
    id: z.string().uuid('Invalid ID format'),
});

export const searchQuerySchema = z.object({
    q: z.string().min(1, 'Search query is required').max(100, 'Search query too long'),
});

export const mealCategoryValidation = {
    create: createMealCategorySchema,
    update: updateMealCategorySchema,
    idParam: mealCategoryIdParamSchema,
    search: searchQuerySchema
};