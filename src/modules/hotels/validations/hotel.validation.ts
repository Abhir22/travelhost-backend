import { z } from 'zod';
import { flatToNestedSchema } from '@/core/utils/flat-to-nested-schema';

export const createHotelSchema = flatToNestedSchema(
  z.object({
    cityId: z.string().uuid(),
    hotelTypeId: z.string().uuid().nullable().optional(),
    name: z.string().trim().min(1, "Hotel name is required"),
    rating: z.number().min(1).max(5).nullable().optional(),
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
    cityId: z.string().uuid().optional(),
    hotelTypeId: z.string().uuid().nullable().optional(),
    name: z.string().trim().min(1, "Hotel name cannot be empty").optional(),
    rating: z.number().min(1).max(5).nullable().optional(),
  }),
  data => ({
    ...(data.name !== undefined ? { name: data.name } : {}),
    ...(data.cityId !== undefined ? { city: { connect: { id: data.cityId } } } : {}),
    ...(data.hotelTypeId !== undefined 
      ? data.hotelTypeId === null 
        ? { hotelType: { disconnect: true } }
        : { hotelType: { connect: { id: data.hotelTypeId } } }
      : {}),
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
