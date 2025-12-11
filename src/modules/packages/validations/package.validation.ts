import { z } from 'zod';
import { flatToNestedSchema } from '@/core/utils/flat-to-nested-schema';

export const createPackageSchema = flatToNestedSchema(
  z.object({
    packageTypeId: z.string(),
    packageName: z.string(),
    shortDescription: z.string().optional(),
    longDescription: z.string().optional(),
    description: z.any().optional(),
    mainImage: z.string().optional(),
    thumbnail: z.string().optional(),
    video: z.string().optional(),
    basePrice: z.number().optional(),
    days: z.number(),
    nights: z.number(),
  }),
  data => ({
    packageName: data.packageName,
    shortDescription: data.shortDescription,
    longDescription: data.longDescription,
    description: data.description,
    mainImage: data.mainImage,
    thumbnail: data.thumbnail,
    video: data.video,
    basePrice: data.basePrice,
    days: data.days,
    nights: data.nights,
    packageType: { connect: { id: data.packageTypeId } },
  })
);

export const updatePackageSchema = flatToNestedSchema(
  z.object({
    packageTypeId: z.string().optional(),
    packageName: z.string().optional(),
    shortDescription: z.string().optional(),
    longDescription: z.string().optional(),
    description: z.any().optional(),
    mainImage: z.string().optional(),
    thumbnail: z.string().optional(),
    video: z.string().optional(),
    basePrice: z.number().optional(),
    days: z.number().optional(),
    nights: z.number().optional(),
  }),
  data => ({
    ...(data.packageName !== undefined ? { packageName: data.packageName } : {}),
    ...(data.shortDescription !== undefined ? { shortDescription: data.shortDescription } : {}),
    ...(data.longDescription !== undefined ? { longDescription: data.longDescription } : {}),
    ...(data.description !== undefined ? { description: data.description } : {}),
    ...(data.mainImage !== undefined ? { mainImage: data.mainImage } : {}),
    ...(data.thumbnail !== undefined ? { thumbnail: data.thumbnail } : {}),
    ...(data.video !== undefined ? { video: data.video } : {}),
    ...(data.basePrice !== undefined ? { basePrice: data.basePrice } : {}),
    ...(data.days !== undefined ? { days: data.days } : {}),
    ...(data.nights !== undefined ? { nights: data.nights } : {}),
    ...(data.packageTypeId !== undefined ? { packageType: { connect: { id: data.packageTypeId } } } : {}),
  })
);

export const packageIdParamSchema = z.object({
  id: z.string().uuid(),
});

export const searchQuerySchema = z.object({
  q: z.string().min(3),
});

export const packageValidation = {
  create: createPackageSchema,
  update: updatePackageSchema,
  idParam: packageIdParamSchema,
  search: searchQuerySchema
};
