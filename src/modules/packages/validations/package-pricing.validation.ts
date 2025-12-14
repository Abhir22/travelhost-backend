import { z } from 'zod';
import { flatToNestedSchema } from '@/core/utils/flat-to-nested-schema';
import { SEASON_ENUM } from '@prisma/client';

export const createPackagePricingSchema = flatToNestedSchema(
    z.object({
        packageId: z.string().uuid("Invalid Package ID"),
        season: z.nativeEnum(SEASON_ENUM),
        dateFrom: z.string().refine((date) => !isNaN(Date.parse(date)), { message: "Invalid date format" }),
        dateTo: z.string().refine((date) => !isNaN(Date.parse(date)), { message: "Invalid date format" }),
        rackRate: z.number().positive("Rack rate must be positive"),
        publishedRate: z.number().positive("Published rate must be positive"),
        customerDiscountPercentage: z.number().min(0).max(100).optional().nullable(),
        customerDiscountAmount: z.number().min(0).optional().nullable(),
        adultRate: z.number().min(0).optional().nullable(),
        agentDiscountPercentage: z.number().min(0).max(100).optional().nullable(),
        agentDiscountAmount: z.number().min(0).optional().nullable(),
        agentRate: z.number().min(0).optional().nullable(),
        childRate: z.number().min(0).optional().nullable(),
        infantRate: z.number().min(0).optional().nullable(),
    }),
    (data: any) => ({
        ...data,
        dateFrom: new Date(data.dateFrom),
        dateTo: new Date(data.dateTo),
    })
);

export const updatePackagePricingSchema = flatToNestedSchema(
    z.object({
        season: z.nativeEnum(SEASON_ENUM).optional(),
        dateFrom: z.string().refine((date) => !isNaN(Date.parse(date)), { message: "Invalid date format" }).optional(),
        dateTo: z.string().refine((date) => !isNaN(Date.parse(date)), { message: "Invalid date format" }).optional(),
        rackRate: z.number().positive("Rack rate must be positive").optional(),
        publishedRate: z.number().positive("Published rate must be positive").optional(),
        customerDiscountPercentage: z.number().min(0).max(100).optional().nullable(),
        customerDiscountAmount: z.number().min(0).optional().nullable(),
        adultRate: z.number().min(0).optional().nullable(),
        agentDiscountPercentage: z.number().min(0).max(100).optional().nullable(),
        agentDiscountAmount: z.number().min(0).optional().nullable(),
        agentRate: z.number().min(0).optional().nullable(),
        childRate: z.number().min(0).optional().nullable(),
        infantRate: z.number().min(0).optional().nullable(),
    }),
    (data: any) => ({
        ...data,
        ...(data.dateFrom ? { dateFrom: new Date(data.dateFrom) } : {}),
        ...(data.dateTo ? { dateTo: new Date(data.dateTo) } : {}),
    })
);

export const packagePricingValidation = {
    create: createPackagePricingSchema,
    update: updatePackagePricingSchema,
};
