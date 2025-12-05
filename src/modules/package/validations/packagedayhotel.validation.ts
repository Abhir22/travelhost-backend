import { z } from 'zod';
import { flatToNestedSchema } from '@/core/utils/flat-to-nested-schema';

export const createPackageDayHotelSchema = flatToNestedSchema(
  z.object({
  packageDayId: z.string(),
  hotelName: z.string(),
  starRating: z.number(),
  hotelType: z.string(),
  checkInTime: z.string(),
  checkOutTime: z.string(),
  roomType: z.string(),
  numberOfRooms: z.number(),
  actualCheckIn: z.string(),
  actualCheckOut: z.string(),
  }),
  data => ({
    hotelName: data.hotelName,
    starRating: data.starRating,
    hotelType: data.hotelType,
    checkInTime: data.checkInTime,
    checkOutTime: data.checkOutTime,
    roomType: data.roomType,
    numberOfRooms: data.numberOfRooms,
    actualCheckIn: data.actualCheckIn,
    actualCheckOut: data.actualCheckOut,
    packageDay: { connect: { id: data.packageDayId } },
  })
);

export const updatePackageDayHotelSchema = flatToNestedSchema(
  z.object({
    packageDayId: z.string().optional(),
    hotelName: z.string().optional(),
    starRating: z.number().optional(),
    hotelType: z.string().optional(),
    checkInTime: z.string().optional(),
    checkOutTime: z.string().optional(),
    roomType: z.string().optional(),
    numberOfRooms: z.number().optional(),
    actualCheckIn: z.string().optional(),
    actualCheckOut: z.string().optional(),
  }),
  data => ({
    ...(data.hotelName !== undefined ? { hotelName: data.hotelName } : {}),
    ...(data.starRating !== undefined ? { starRating: data.starRating } : {}),
    ...(data.hotelType !== undefined ? { hotelType: data.hotelType } : {}),
    ...(data.checkInTime !== undefined ? { checkInTime: data.checkInTime } : {}),
    ...(data.checkOutTime !== undefined ? { checkOutTime: data.checkOutTime } : {}),
    ...(data.roomType !== undefined ? { roomType: data.roomType } : {}),
    ...(data.numberOfRooms !== undefined ? { numberOfRooms: data.numberOfRooms } : {}),
    ...(data.actualCheckIn !== undefined ? { actualCheckIn: data.actualCheckIn } : {}),
    ...(data.actualCheckOut !== undefined ? { actualCheckOut: data.actualCheckOut } : {}),
    ...(data.packageDayId !== undefined ? { packageDay: { connect: { id: data.packageDayId } } } : {}),
  })
);

export const packagedayhotelIdParamSchema = z.object({
  id: z.string().uuid(),
});

export const searchQuerySchema = z.object({
  q: z.string().min(3),
});

export const packagedayhotelValidation = {
  create: createPackageDayHotelSchema,
  update: updatePackageDayHotelSchema,
  idParam: packagedayhotelIdParamSchema,
  search: searchQuerySchema
};
