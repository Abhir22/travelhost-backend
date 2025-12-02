import { z } from 'zod';
import { flatToNestedSchema } from '@/core/utils/flat-to-nested-schema';

export const createDestinationSchema = flatToNestedSchema(
  z.object({
  destinationType: z.enum(['INTERNATIONAL', 'DOMESTIC']),
  name: z.string(),
  countryId: z.string(),
  stateId: z.string(),
  cityId: z.string(),
  priceRange: z.string(),
  thumbnailPhoto: z.string(),
  bannerPhoto: z.string(),
  video: z.string(),
  }),
  data => ({
    destinationType: data.destinationType,
    name: data.name,
    countryId: data.countryId,
    stateId: data.stateId,
    cityId: data.cityId,
    priceRange: data.priceRange,
    thumbnailPhoto: data.thumbnailPhoto,
    bannerPhoto: data.bannerPhoto,
    video: data.video,
  })
);

export const updateDestinationSchema = flatToNestedSchema(
  z.object({
    destinationType: z.enum(['INTERNATIONAL', 'DOMESTIC']).optional(),
    name: z.string().optional(),
    countryId: z.string().optional(),
    stateId: z.string().optional(),
    cityId: z.string().optional(),
    priceRange: z.string().optional(),
    thumbnailPhoto: z.string().optional(),
    bannerPhoto: z.string().optional(),
    video: z.string().optional(),
  }),
  data => ({
    ...(data.destinationType !== undefined ? { destinationType: data.destinationType } : {}),
    ...(data.name !== undefined ? { name: data.name } : {}),
    ...(data.countryId !== undefined ? { countryId: data.countryId } : {}),
    ...(data.stateId !== undefined ? { stateId: data.stateId } : {}),
    ...(data.cityId !== undefined ? { cityId: data.cityId } : {}),
    ...(data.priceRange !== undefined ? { priceRange: data.priceRange } : {}),
    ...(data.thumbnailPhoto !== undefined ? { thumbnailPhoto: data.thumbnailPhoto } : {}),
    ...(data.bannerPhoto !== undefined ? { bannerPhoto: data.bannerPhoto } : {}),
    ...(data.video !== undefined ? { video: data.video } : {}),
  })
);

export const destinationIdParamSchema = z.object({
  id: z.string().uuid(),
});

export const searchQuerySchema = z.object({
  q: z.string().min(3),
});

export const destinationValidation = {
  create: createDestinationSchema,
  update: updateDestinationSchema,
  idParam: destinationIdParamSchema,
  search: searchQuerySchema
};
