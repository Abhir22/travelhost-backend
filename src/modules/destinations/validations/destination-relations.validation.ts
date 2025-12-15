import { z } from 'zod';

export const addDestinationCountriesSchema = z.object({
  destinationId: z.string().uuid(),
  countryIds: z.array(z.string().uuid()).min(1),
});

export const addDestinationCitiesSchema = z.object({
  destinationId: z.string().uuid(),
  cityIds: z.array(z.string().uuid()).min(1),
});

export const addDestinationPackagesSchema = z.object({
  destinationId: z.string().uuid(),
  packageIds: z.array(z.string().uuid()).min(1),
});

export const addDestinationPackageTypesSchema = z.object({
  destinationId: z.string().uuid(),
  packageTypes: z.array(z.string().trim().min(1)).min(1),
});

export const removeDestinationRelationSchema = z.object({
  destinationId: z.string().uuid(),
  relationId: z.string().uuid(),
});

export const destinationRelationsValidation = {
  addCountries: addDestinationCountriesSchema,
  addCities: addDestinationCitiesSchema,
  addPackages: addDestinationPackagesSchema,
  addPackageTypes: addDestinationPackageTypesSchema,
  removeRelation: removeDestinationRelationSchema,
};