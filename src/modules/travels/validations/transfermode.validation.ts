import { z } from 'zod';
import { flatToNestedSchema } from '@/core/utils/flat-to-nested-schema';

export const createTransferModeSchema = flatToNestedSchema(
  z.object({
    cityId: z.string(),
    sightseeingId: z.string().optional(),
    travelTypeId: z.string().optional(),
    name: z.string(),
  }),
  data => ({
    name: data.name,
    city: { connect: { id: data.cityId } },
    ...(data.sightseeingId ? { sightseeing: { connect: { id: data.sightseeingId } } } : {}),
    ...(data.travelTypeId ? { travelType: { connect: { id: data.travelTypeId } } } : {}),
  })
);

export const updateTransferModeSchema = flatToNestedSchema(
  z.object({
    cityId: z.string().optional(),
    sightseeingId: z.string().optional(),
    travelTypeId: z.string().optional(),
    name: z.string().optional(),
  }),
  data => ({
    ...(data.name !== undefined ? { name: data.name } : {}),
    ...(data.cityId !== undefined ? { city: { connect: { id: data.cityId } } } : {}),
    ...(data.sightseeingId !== undefined ? { sightseeing: { connect: { id: data.sightseeingId } } } : {}),
    ...(data.travelTypeId !== undefined ? { travelType: { connect: { id: data.travelTypeId } } } : {}),
  })
);

export const transfermodeIdParamSchema = z.object({
  id: z.string().uuid(),
});

export const searchQuerySchema = z.object({
  q: z.string().min(3),
});

export const transfermodeValidation = {
  create: createTransferModeSchema,
  update: updateTransferModeSchema,
  idParam: transfermodeIdParamSchema,
  search: searchQuerySchema
};