import { z } from 'zod';
import { flatToNestedSchema } from '@/core/utils/flat-to-nested-schema';

export const createRoomImageSchema = flatToNestedSchema(
  z.object({
  hotelRoomId: z.string().uuid(),
  imageUrl: z.string().min(1),
  }),
  data => ({
    imageUrl: data.imageUrl,
    hotelRoom: { connect: { id: data.hotelRoomId } },
  })
);

export const updateRoomImageSchema = flatToNestedSchema(
  z.object({
    hotelRoomId: z.string().uuid().optional(),
    imageUrl: z.string().min(1).optional(),
  }),
  data => ({
    ...(data.imageUrl !== undefined ? { imageUrl: data.imageUrl } : {}),
    ...(data.hotelRoomId !== undefined ? { hotelRoom: { connect: { id: data.hotelRoomId } } } : {}),
  })
);

export const roomimageIdParamSchema = z.object({
  id: z.string().uuid(),
});

export const searchQuerySchema = z.object({
  q: z.string().min(3),
});

export const roomimageValidation = {
  create: createRoomImageSchema,
  update: updateRoomImageSchema,
  idParam: roomimageIdParamSchema,
  search: searchQuerySchema
};
