import { z } from 'zod';

export const packagecountryValidation = {
  create: z.object({
    packageTypeId: z.string(),
    countryId: z.string(),
  }).transform(
    data => ({
      packageTypeId: data.packageTypeId,
      countryId: data.countryId,
    })
  ),

  update: z.object({
    packageTypeId: z.string().optional(),
    countryId: z.string().optional(),
  }).transform(
    data => ({
      ...(data.packageTypeId !== undefined ? { packageTypeId: data.packageTypeId } : {}),
      ...(data.countryId !== undefined ? { countryId: data.countryId } : {}),
    })
  ),
};