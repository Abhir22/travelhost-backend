import { z } from 'zod';
import { flatToNestedSchema } from '@/core/utils/flat-to-nested-schema';

export const createHotelRoomSchema = flatToNestedSchema(
  z.object({
  hotelId: z.string(),
  roomTypeId: z.string(),
  roomNumber: z.string(),
  description: z.any(),
  }),
  data => ({
    roomNumber: data.roomNumber,
    description: data.description,
    hotel: { connect: { id: data.hotelId } },
    roomType: { connect: { id: data.roomTypeId } },
  })
);

export const updateHotelRoomSchema = flatToNestedSchema(
  z.object({
    hotelId: z.string().optional(),
    roomTypeId: z.string().optional(),
    roomNumber: z.string().optional(),
    description: z.any().optional(),
  }),
  data => ({
    ...(data.roomNumber !== undefined ? { roomNumber: data.roomNumber } : {}),
    ...(data.description !== undefined ? { description: data.description } : {}),
    ...(data.hotelId !== undefined ? { hotel: { connect: { id: data.hotelId } } } : {}),
    ...(data.roomTypeId !== undefined ? { roomType: { connect: { id: data.roomTypeId } } } : {}),
  })
);

export const hotelroomIdParamSchema = z.object({
  id: z.string().uuid(),
});

export const searchQuerySchema = z.object({
  q: z.string().min(3),
});

export const hotelroomValidation = {
  create: createHotelRoomSchema,
  update: updateHotelRoomSchema,
  idParam: hotelroomIdParamSchema,
  search: searchQuerySchema
};
