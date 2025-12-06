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
    countryId: data.countryId,
    stateId: data.stateId,
    cityId: data.cityId,
    sightseeingId: data.sightseeingId,
    name: data.name,
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
    ...(data.countryId !== undefined ? { countryId: data.countryId } : {}),
    ...(data.stateId !== undefined ? { stateId: data.stateId } : {}),
    ...(data.cityId !== undefined ? { cityId: data.cityId } : {}),
    ...(data.sightseeingId !== undefined ? { sightseeingId: data.sightseeingId } : {}),
    ...(data.name !== undefined ? { name: data.name } : {}),
    ...(data.rating !== undefined ? { rating: data.rating } : {}), // ⭐ ADDED
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
