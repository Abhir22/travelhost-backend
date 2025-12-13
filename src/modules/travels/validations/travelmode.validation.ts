import { z } from 'zod';
import { flatToNestedSchema } from '@/core/utils/flat-to-nested-schema';

export const createTravelModeSchema = flatToNestedSchema(
  z.object({
  countryId: z.string().uuid(),
  stateId: z.string().uuid(),
  cityId: z.string().uuid(),
  sightseeingId: z.string().uuid(),
  travelTypeId: z.string().uuid(),
  name: z.string().min(1),
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
    countryId: z.string().uuid().optional(),
    stateId: z.string().uuid().optional(),
    cityId: z.string().uuid().optional(),
    sightseeingId: z.string().uuid().optional(),
    travelTypeId: z.string().uuid().optional(),
    name: z.string().min(1).optional(),
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
