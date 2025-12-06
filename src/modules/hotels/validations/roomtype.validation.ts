import { z } from 'zod';
import { flatToNestedSchema } from '@/core/utils/flat-to-nested-schema';

export const createRoomTypeSchema = flatToNestedSchema(
  z.object({
  name: z.string(),
  description: z.any(),
  }),
  data => ({
    name: data.name,
    description: data.description,
  })
);

export const updateRoomTypeSchema = flatToNestedSchema(
  z.object({
    name: z.string().optional(),
    description: z.any().optional(),
  }),
  data => ({
    ...(data.name !== undefined ? { name: data.name } : {}),
    ...(data.description !== undefined ? { description: data.description } : {}),
  })
);

export const roomtypeIdParamSchema = z.object({
  id: z.string().uuid(),
});

export const searchQuerySchema = z.object({
  q: z.string().min(3),
});

export const roomtypeValidation = {
  create: createRoomTypeSchema,
  update: updateRoomTypeSchema,
  idParam: roomtypeIdParamSchema,
  search: searchQuerySchema
};
