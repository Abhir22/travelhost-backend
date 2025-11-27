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
    countryId: data.countryId,
    stateId: data.stateId,
    cityId: data.cityId,
    sightseeingId: data.sightseeingId,
    name: data.name,
    hotelId: data.hotelId,
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
    ...(data.countryId !== undefined ? { countryId: data.countryId } : {}),
    ...(data.stateId !== undefined ? { stateId: data.stateId } : {}),
    ...(data.cityId !== undefined ? { cityId: data.cityId } : {}),
    ...(data.sightseeingId !== undefined ? { sightseeingId: data.sightseeingId } : {}),
    ...(data.name !== undefined ? { name: data.name } : {}),
    ...(data.hotelId !== undefined ? { hotelId: data.hotelId } : {}),
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
