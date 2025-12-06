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
    name: data.name,
    country: { connect: { id: data.countryId } },
    state: { connect: { id: data.stateId } },
    city: { connect: { id: data.cityId } },
    sightseeing: { connect: { id: data.sightseeingId } },
    travelType: { connect: { id: data.travelTypeId } },
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
    ...(data.name !== undefined ? { name: data.name } : {}),
    ...(data.countryId !== undefined ? { country: { connect: { id: data.countryId } } } : {}),
    ...(data.stateId !== undefined ? { state: { connect: { id: data.stateId } } } : {}),
    ...(data.cityId !== undefined ? { city: { connect: { id: data.cityId } } } : {}),
    ...(data.sightseeingId !== undefined ? { sightseeing: { connect: { id: data.sightseeingId } } } : {}),
    ...(data.travelTypeId !== undefined ? { travelType: { connect: { id: data.travelTypeId } } } : {}),
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
