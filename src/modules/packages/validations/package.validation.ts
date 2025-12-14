import { z } from 'zod';
import { flatToNestedSchema } from '@/core/utils/flat-to-nested-schema';

export const createPackageSchema = flatToNestedSchema(
  z.object({
    packageTypeId: z.string().uuid(),
    packageName: z.string().min(1),
    shortDescription: z.string().min(1).optional(),
    longDescription: z.string().min(1).optional(),
    mainImage: z.string().min(1).optional(),
    thumbnail: z.string().min(1).optional(),
    video: z.string().min(1).optional(),
    basePrice: z.number().optional(),
    duration: z.string().min(1),
  }),
  data => ({
    packageName: data.packageName,
    shortDescription: data.shortDescription,
    longDescription: data.longDescription,
    mainImage: data.mainImage,
    thumbnail: data.thumbnail,
    video: data.video,
    basePrice: data.basePrice,
    duration: data.duration,
    packageType: { connect: { id: data.packageTypeId } },
  })
);

export const updatePackageSchema = flatToNestedSchema(
  z.object({
    packageTypeId: z.string().uuid().optional(),
    packageName: z.string().min(1).optional(),
    shortDescription: z.string().min(1).optional(),
    longDescription: z.string().min(1).optional(),
    mainImage: z.string().min(1).optional(),
    thumbnail: z.string().min(1).optional(),
    video: z.string().min(1).optional(),
    basePrice: z.number().optional(),
    duration: z.string().min(1).optional(),
  }),
  data => ({
    ...(data.packageName !== undefined ? { packageName: data.packageName } : {}),
    ...(data.shortDescription !== undefined ? { shortDescription: data.shortDescription } : {}),
    ...(data.longDescription !== undefined ? { longDescription: data.longDescription } : {}),
    ...(data.mainImage !== undefined ? { mainImage: data.mainImage } : {}),
    ...(data.thumbnail !== undefined ? { thumbnail: data.thumbnail } : {}),
    ...(data.video !== undefined ? { video: data.video } : {}),
    ...(data.basePrice !== undefined ? { basePrice: data.basePrice } : {}),
    ...(data.duration !== undefined ? { duration: data.duration } : {}),
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
