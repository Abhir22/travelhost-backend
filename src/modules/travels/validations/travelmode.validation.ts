import { z } from 'zod';
import { flatToNestedSchema } from '@/core/utils/flat-to-nested-schema';

export const createTravelModeSchema = flatToNestedSchema(
  z.object({
  countryId: z.string(),
  stateId: z.string(),
  cityId: z.string(),
  sightseeingId: z.string(),
  travelTypeId: z.string(),
  name: z.string(),
  }),
  data => ({
    countryId: data.countryId,
    stateId: data.stateId,
    cityId: data.cityId,
    sightseeingId: data.sightseeingId,
    travelTypeId: data.travelTypeId,
    name: data.name,
  })
);

export const updateTravelModeSchema = flatToNestedSchema(
  z.object({
    countryId: z.string().optional(),
    stateId: z.string().optional(),
    cityId: z.string().optional(),
    sightseeingId: z.string().optional(),
    travelTypeId: z.string().optional(),
    name: z.string().optional(),
  }),
  data => ({
    ...(data.countryId !== undefined ? { countryId: data.countryId } : {}),
    ...(data.stateId !== undefined ? { stateId: data.stateId } : {}),
    ...(data.cityId !== undefined ? { cityId: data.cityId } : {}),
    ...(data.sightseeingId !== undefined ? { sightseeingId: data.sightseeingId } : {}),
    ...(data.travelTypeId !== undefined ? { travelTypeId: data.travelTypeId } : {}),
    ...(data.name !== undefined ? { name: data.name } : {}),
  })
);

export const travelmodeIdParamSchema = z.object({
  id: z.string().uuid(),
});

export const searchQuerySchema = z.object({
  q: z.string().min(3),
});

export const travelmodeValidation = {
  create: createTravelModeSchema,
  update: updateTravelModeSchema,
  idParam: travelmodeIdParamSchema,
  search: searchQuerySchema
};
