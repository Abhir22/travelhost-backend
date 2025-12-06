import { z } from 'zod';
import { flatToNestedSchema } from '@/core/utils/flat-to-nested-schema';

export const createPackageCityDayHotelSchema = flatToNestedSchema(
  z.object({
  packageCityDayId: z.string(),
  hotelName: z.string(),
  starRating: z.number(),
  hotelType: z.string(),
  checkInTime: z.string(),
  checkOutTime: z.string(),
  roomType: z.string(),
  numberOfRooms: z.number(),
  }),
  data => ({
    hotelName: data.hotelName,
    starRating: data.starRating,
    hotelType: data.hotelType,
    checkInTime: data.checkInTime,
    checkOutTime: data.checkOutTime,
    roomType: data.roomType,
    numberOfRooms: data.numberOfRooms,
    packageCityDay: { connect: { id: data.packageCityDayId } },
  })
);

export const updatePackageCityDayHotelSchema = flatToNestedSchema(
  z.object({
    packageCityDayId: z.string().optional(),
    hotelName: z.string().optional(),
    starRating: z.number().optional(),
    hotelType: z.string().optional(),
    checkInTime: z.string().optional(),
    checkOutTime: z.string().optional(),
    roomType: z.string().optional(),
    numberOfRooms: z.number().optional(),
  }),
  data => ({
    ...(data.hotelName !== undefined ? { hotelName: data.hotelName } : {}),
    ...(data.starRating !== undefined ? { starRating: data.starRating } : {}),
    ...(data.hotelType !== undefined ? { hotelType: data.hotelType } : {}),
    ...(data.checkInTime !== undefined ? { checkInTime: data.checkInTime } : {}),
    ...(data.checkOutTime !== undefined ? { checkOutTime: data.checkOutTime } : {}),
    ...(data.roomType !== undefined ? { roomType: data.roomType } : {}),
    ...(data.numberOfRooms !== undefined ? { numberOfRooms: data.numberOfRooms } : {}),
    ...(data.packageCityDayId !== undefined ? { packageCityDay: { connect: { id: data.packageCityDayId } } } : {}),
  })
);

export const packagecitydayhotelIdParamSchema = z.object({
  id: z.string().uuid(),
});

export const searchQuerySchema = z.object({
  q: z.string().min(3),
});

export const packagecitydayhotelValidation = {
  create: createPackageCityDayHotelSchema,
  update: updatePackageCityDayHotelSchema,
  idParam: packagecitydayhotelIdParamSchema,
  search: searchQuerySchema
};
