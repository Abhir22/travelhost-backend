import { z } from 'zod';
import { flatToNestedSchema } from '@/core/utils/flat-to-nested-schema';

export const createPackageTermsConditionSchema = flatToNestedSchema(
    z.object({
        packageId: z.string().uuid("Invalid Package ID"),
        content: z.string().min(1, "Content is required"),
        linkText: z.string().optional(),
        linkUrl: z.string().url("Invalid URL").optional().nullable(),
        videoUrl: z.string().url("Invalid URL").optional().nullable(),
        imageUrl: z.string().url("Invalid URL").optional().nullable(),
        fileName: z.string().optional().nullable(),
        filePath: z.string().optional().nullable(),
        fileType: z.string().optional().nullable(),
        fileSize: z.any().optional().nullable(), // BigInt handling might be tricky with zod, allowing any for now or number
    }),
    data => ({
        packageId: data.packageId,
        content: data.content,
        linkText: data.linkText,
        linkUrl: data.linkUrl,
        videoUrl: data.videoUrl,
        imageUrl: data.imageUrl,
        fileName: data.fileName,
        filePath: data.filePath,
        fileType: data.fileType,
        fileSize: data.fileSize,
    })
);

export const updatePackageTermsConditionSchema = flatToNestedSchema(
    z.object({
        content: z.string().min(1, "Content cannot be empty").optional(),
        linkText: z.string().optional(),
        linkUrl: z.string().url("Invalid URL").optional().nullable(),
        videoUrl: z.string().url("Invalid URL").optional().nullable(),
        imageUrl: z.string().url("Invalid URL").optional().nullable(),
        fileName: z.string().optional().nullable(),
        filePath: z.string().optional().nullable(),
        fileType: z.string().optional().nullable(),
        fileSize: z.any().optional().nullable(),
    }),
    data => data
);

export const packageTermsConditionValidation = {
    create: createPackageTermsConditionSchema,
    update: updatePackageTermsConditionSchema,
};
