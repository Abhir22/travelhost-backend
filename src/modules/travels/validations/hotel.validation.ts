import { z } from 'zod';
import { flatToNestedSchema } from '@/core/utils/flat-to-nested-schema';

export const createHotelSchema = flatToNestedSchema(
  z.object({
  countryId: z.string(),
  stateId: z.string(),
  cityId: z.string(),
  sightseeingId: z.string(),
  name: z.string(),
  rating: z.number().min(1).max(5).optional(),
  }),
  data => ({
    name: data.name,
    country: { connect: { id: data.countryId } },
    state: { connect: { id: data.stateId } },
    city: { connect: { id: data.cityId } },
    sightseeing: { connect: { id: data.sightseeingId } },
    ...(data.rating !== undefined ? { rating: data.rating } : {}),
  })
);

export const updateHotelSchema = flatToNestedSchema(
  z.object({
    countryId: z.string().optional(),
    stateId: z.string().optional(),
    cityId: z.string().optional(),
    sightseeingId: z.string().optional(),
    name: z.string().optional(),
    rating: z.number().min(1).max(5).optional(),
  }),
  data => ({
    ...(data.name !== undefined ? { name: data.name } : {}),
    ...(data.countryId !== undefined ? { country: { connect: { id: data.countryId } } } : {}),
    ...(data.stateId !== undefined ? { state: { connect: { id: data.stateId } } } : {}),
    ...(data.cityId !== undefined ? { city: { connect: { id: data.cityId } } } : {}),
    ...(data.sightseeingId !== undefined ? { sightseeing: { connect: { id: data.sightseeingId } } } : {}),
    ...(data.rating !== undefined ? { rating: data.rating } : {}),
  })
);


export const hotelIdParamSchema = z.object({
  id: z.string().uuid(),
});

export const searchQuerySchema = z.object({
  q: z.string().min(3),
});

export const hotelValidation = {
  create: createHotelSchema,
  update: updateHotelSchema,
  idParam: hotelIdParamSchema,
  search: searchQuerySchema
};
