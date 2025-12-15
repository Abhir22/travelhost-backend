import { z } from 'zod';

export const packagecountryValidation = {
  create: z.object({
    packageType: z.string(),
    countryId: z.string(),
  }).transform(
    data => ({
      packageType: data.packageType,
      countryId: data.countryId,
    })
  ),

  update: z.object({
    packageType: z.string().optional(),
    countryId: z.string().optional(),
  }).transform(
    data => ({
      ...(data.packageType !== undefined ? { packageType: data.packageType } : {}),
      ...(data.countryId !== undefined ? { countryId: data.countryId } : {}),
    })
  ),
};