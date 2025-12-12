import { z } from 'zod';
import { flatToNestedSchema } from '@/core/utils/flat-to-nested-schema';

export const createHotelSchema = flatToNestedSchema(
  z.object({
    cityId: z.string(),
    hotelTypeId: z.string().optional(),
    name: z.string(),
    rating: z.number().min(1).max(5).optional(),
  }),
  data => ({
    name: data.name,
    city: { connect: { id: data.cityId } },
    ...(data.hotelTypeId ? { hotelType: { connect: { id: data.hotelTypeId } } } : {}),
    ...(data.rating !== undefined ? { rating: data.rating } : {}),
  })
);

export const updateHotelSchema = flatToNestedSchema(
  z.object({
    cityId: z.string().optional(),
    hotelTypeId: z.string().optional(),
    name: z.string().optional(),
    rating: z.number().min(1).max(5).optional(),
  }),
  data => ({
    ...(data.name !== undefined ? { name: data.name } : {}),
    ...(data.cityId !== undefined ? { city: { connect: { id: data.cityId } } } : {}),
    ...(data.hotelTypeId !== undefined ? { hotelType: { connect: { id: data.hotelTypeId } } } : {}),
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
