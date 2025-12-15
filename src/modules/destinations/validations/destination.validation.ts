import { z } from 'zod';
import { flatToNestedSchema } from '@/core/utils/flat-to-nested-schema';

export const createDestinationSchema = flatToNestedSchema(
  z.object({
    destinationType: z.enum(['INTERNATIONAL', 'DOMESTIC']),
    countryIds: z.array(z.string().uuid()).optional(),
    cityIds: z.array(z.string().uuid()).optional(),
    packageIds: z.array(z.string().uuid()).optional(),
    packageTypes: z.array(z.string().trim().min(1, "Package type cannot be empty")).optional(),
  }),
  data => ({
    destinationType: data.destinationType,
    ...(data.countryIds && data.countryIds.length > 0 ? {
      destinationCountries: {
        create: data.countryIds.map(countryId => ({ countryId }))
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
    ...(data.packageTypes && data.packageTypes.length > 0 ? {
      destinationPackageTypes: {
        create: data.packageTypes.map(packageType => ({ packageType }))
      }
    } : {}),
  })
);

export const updateDestinationSchema = flatToNestedSchema(
  z.object({
    destinationType: z.enum(['INTERNATIONAL', 'DOMESTIC']).optional(),
    countryIds: z.array(z.string().uuid()).optional(),
    cityIds: z.array(z.string().uuid()).optional(),
    packageIds: z.array(z.string().uuid()).optional(),
    packageTypes: z.array(z.string().trim().min(1, "Package type cannot be empty")).optional(),
  }),
  data => ({
    ...(data.destinationType !== undefined ? { destinationType: data.destinationType } : {}),
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
