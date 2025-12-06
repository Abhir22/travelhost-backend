import { z } from 'zod';
import { flatToNestedSchema } from '@/core/utils/flat-to-nested-schema';

export const createTravelTypeSchema = flatToNestedSchema(
  z.object({
  countryId: z.string(),
  stateId: z.string(),
  cityId: z.string(),
  sightseeingId: z.string(),
  name: z.string(),
  hotelId: z.string(),
  }),
  data => ({
    name: data.name,
    country: { connect: { id: data.countryId } },
    state: { connect: { id: data.stateId } },
    city: { connect: { id: data.cityId } },
    sightseeing: { connect: { id: data.sightseeingId } },
    hotel: { connect: { id: data.hotelId } },
  })
);

export const updateTravelTypeSchema = flatToNestedSchema(
  z.object({
    countryId: z.string().optional(),
    stateId: z.string().optional(),
    cityId: z.string().optional(),
    sightseeingId: z.string().optional(),
    name: z.string().optional(),
    hotelId: z.string().optional(),
  }),
  data => ({
    ...(data.name !== undefined ? { name: data.name } : {}),
    ...(data.countryId !== undefined ? { country: { connect: { id: data.countryId } } } : {}),
    ...(data.stateId !== undefined ? { state: { connect: { id: data.stateId } } } : {}),
    ...(data.cityId !== undefined ? { city: { connect: { id: data.cityId } } } : {}),
    ...(data.sightseeingId !== undefined ? { sightseeing: { connect: { id: data.sightseeingId } } } : {}),
    ...(data.hotelId !== undefined ? { hotel: { connect: { id: data.hotelId } } } : {}),
  })
);

export const traveltypeIdParamSchema = z.object({
  id: z.string().uuid(),
});

export const searchQuerySchema = z.object({
  q: z.string().min(3),
});

export const traveltypeValidation = {
  create: createTravelTypeSchema,
  update: updateTravelTypeSchema,
  idParam: traveltypeIdParamSchema,
  search: searchQuerySchema
};
