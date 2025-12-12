import { z } from 'zod';

export const addDestinationCountriesSchema = z.object({
  destinationId: z.string().uuid(),
  countryIds: z.array(z.string().uuid()).min(1),
});

export const addDestinationStatesSchema = z.object({
  destinationId: z.string().uuid(),
  stateIds: z.array(z.string().uuid()).min(1),
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
  packageTypeIds: z.array(z.string().uuid()).min(1),
});

export const removeDestinationRelationSchema = z.object({
  destinationId: z.string().uuid(),
  relationId: z.string().uuid(),
});

export const destinationRelationsValidation = {
  addCountries: addDestinationCountriesSchema,
  addStates: addDestinationStatesSchema,
  addCities: addDestinationCitiesSchema,
  addPackages: addDestinationPackagesSchema,
  addPackageTypes: addDestinationPackageTypesSchema,
  removeRelation: removeDestinationRelationSchema,
};