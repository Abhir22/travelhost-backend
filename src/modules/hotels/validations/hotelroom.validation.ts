import { z } from 'zod';
import { flatToNestedSchema } from '@/core/utils/flat-to-nested-schema';

export const createHotelRoomSchema = flatToNestedSchema(
  z.object({
  hotelId: z.string().uuid(),
  roomType: z.string().min(1),
  roomNumber: z.string().min(1).optional(),
  price: z.number().optional(),
  amenities: z.array(z.string().min(1)).optional(),
  description: z.any().optional(),
  }),
  data => ({
    roomType: data.roomType,
    ...(data.roomNumber ? { roomNumber: data.roomNumber } : {}),
    ...(data.price !== undefined ? { price: data.price } : {}),
    ...(data.amenities ? { amenities: JSON.stringify(data.amenities) } : {}),
    ...(data.description ? { description: data.description } : {}),
    hotel: { connect: { id: data.hotelId } },
  })
);

export const updateHotelRoomSchema = flatToNestedSchema(
  z.object({
    hotelId: z.string().uuid().optional(),
    roomType: z.string().min(1).optional(),
    roomNumber: z.string().min(1).optional(),
    price: z.number().optional(),
    amenities: z.array(z.string().min(1)).optional(),
    description: z.any().optional(),
  }),
  data => ({
    ...(data.roomType !== undefined ? { roomType: data.roomType } : {}),
    ...(data.roomNumber !== undefined ? { roomNumber: data.roomNumber } : {}),
    ...(data.price !== undefined ? { price: data.price } : {}),
    ...(data.amenities !== undefined ? { amenities: JSON.stringify(data.amenities) } : {}),
    ...(data.description !== undefined ? { description: data.description } : {}),
    ...(data.hotelId !== undefined ? { hotel: { connect: { id: data.hotelId } } } : {}),
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
