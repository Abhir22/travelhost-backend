import { z } from 'zod';
import { flatToNestedSchema } from '@/core/utils/flat-to-nested-schema';

export const createCountrySchema = flatToNestedSchema(
  z.object({
  name: z.string().trim().min(1, "Country name is required"),
  isoCode: z.string().trim().min(1, "ISO code cannot be empty").nullable().optional(),
  }),
  data => ({
    name: data.name,
    isoCode: data.isoCode,
  })
);

export const updateCountrySchema = flatToNestedSchema(
  z.object({
    name: z.string().trim().min(1, "Country name cannot be empty").optional(),
    isoCode: z.string().trim().min(1, "ISO code cannot be empty").nullable().optional(),
  }),
  data => ({
    ...(data.name !== undefined ? { name: data.name } : {}),
    ...(data.isoCode !== undefined ? { isoCode: data.isoCode } : {}),
  })
);

export const countryIdParamSchema = z.object({
  id: z.string().uuid(),
});

export const searchQuerySchema = z.object({
  q: z.string().min(3),
});

export const countryValidation = {
  create: createCountrySchema,
  update: updateCountrySchema,
  idParam: countryIdParamSchema,
  search: searchQuerySchema
};
