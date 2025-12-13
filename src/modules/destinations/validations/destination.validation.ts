import { z } from 'zod';
import { flatToNestedSchema } from '@/core/utils/flat-to-nested-schema';

export const createDestinationSchema = flatToNestedSchema(
  z.object({
    destinationType: z.enum(['INTERNATIONAL', 'DOMESTIC']),
    name: z.string().trim().min(1, "Destination name is required"),
    description: z.string().trim().min(1, "Description cannot be empty").nullable().optional(),
    priceRange: z.string().trim().min(1, "Price range cannot be empty").nullable().optional(),
    thumbnailPhoto: z.string().trim().min(1, "Thumbnail photo URL cannot be empty").nullable().optional(),
    bannerPhoto: z.string().trim().min(1, "Banner photo URL cannot be empty").nullable().optional(),
    video: z.string().trim().min(1, "Video URL cannot be empty").nullable().optional(),
    countryIds: z.array(z.string().uuid()).optional(),
    stateIds: z.array(z.string().uuid()).optional(),
    cityIds: z.array(z.string().uuid()).optional(),
    packageIds: z.array(z.string().uuid()).optional(),
    packageTypeIds: z.array(z.string().uuid()).optional(),
  }),
  data => ({
    destinationType: data.destinationType,
    name: data.name,
    ...(data.description ? { description: data.description } : {}),
    ...(data.priceRange ? { priceRange: data.priceRange } : {}),
    ...(data.thumbnailPhoto ? { thumbnailPhoto: data.thumbnailPhoto } : {}),
    ...(data.bannerPhoto ? { bannerPhoto: data.bannerPhoto } : {}),
    ...(data.video ? { video: data.video } : {}),
    ...(data.countryIds && data.countryIds.length > 0 ? {
      destinationCountries: {
        create: data.countryIds.map(countryId => ({ countryId }))
      }
    } : {}),
    ...(data.stateIds && data.stateIds.length > 0 ? {
      destinationStates: {
        create: data.stateIds.map(stateId => ({ stateId }))
      }
    } : {}),
    ...(data.cityIds && data.cityIds.length > 0 ? {
      destinationCities: {
        create: data.cityIds.map(cityId => ({ cityId }))
      }
    } : {}),
    ...(data.packageIds && data.packageIds.length > 0 ? {
      destinationPackages: {
        create: data.packageIds.map(packageId => ({ packageId }))
      }
    } : {}),
    ...(data.packageTypeIds && data.packageTypeIds.length > 0 ? {
      destinationPackageTypes: {
        create: data.packageTypeIds.map(packageTypeId => ({ packageTypeId }))
      }
    } : {}),
  })
);

export const updateDestinationSchema = flatToNestedSchema(
  z.object({
    destinationType: z.enum(['INTERNATIONAL', 'DOMESTIC']).optional(),
    name: z.string().trim().min(1, "Destination name cannot be empty").optional(),
    description: z.string().trim().min(1, "Description cannot be empty").nullable().optional(),
    priceRange: z.string().trim().min(1, "Price range cannot be empty").nullable().optional(),
    thumbnailPhoto: z.string().trim().min(1, "Thumbnail photo URL cannot be empty").nullable().optional(),
    bannerPhoto: z.string().trim().min(1, "Banner photo URL cannot be empty").nullable().optional(),
    video: z.string().trim().min(1, "Video URL cannot be empty").nullable().optional(),
  }),
  data => ({
    ...(data.destinationType !== undefined ? { destinationType: data.destinationType } : {}),
    ...(data.name !== undefined ? { name: data.name } : {}),
    ...(data.description !== undefined ? { description: data.description } : {}),
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
