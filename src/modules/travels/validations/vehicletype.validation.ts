import { z } from 'zod';
import { flatToNestedSchema } from '@/core/utils/flat-to-nested-schema';

export const createVehicleTypeSchema = flatToNestedSchema(
    z.object({
        name: z.string(),
        vehicleCategory: z.string(),
    }),
    data => ({
        name: data.name,
        vehicleCategory: data.vehicleCategory,
    })
);

export const updateVehicleTypeSchema = flatToNestedSchema(
    z.object({
        name: z.string().optional(),
        vehicleCategory: z.string().optional(),
    }),
    data => ({
        ...(data.name !== undefined ? { name: data.name } : {}),
        ...(data.vehicleCategory !== undefined ? { vehicleCategory: data.vehicleCategory } : {}),
    })
);

export const vehicletypeIdParamSchema = z.object({
    id: z.string().uuid(),
});

export const searchQuerySchema = z.object({
    q: z.string().min(3),
});

export const vehicletypeValidation = {
    create: createVehicleTypeSchema,
    update: updateVehicleTypeSchema,
    idParam: vehicletypeIdParamSchema,
    search: searchQuerySchema
};