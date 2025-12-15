import { z } from 'zod';

export const packagestateValidation = {
  create: z.object({
    packageType: z.string(),
    stateId: z.string(),
  }).transform(
    data => ({
      packageType: data.packageType,
      stateId: data.stateId,
    })
  ),

  update: z.object({
    packageType: z.string().optional(),
    stateId: z.string().optional(),
  }).transform(
    data => ({
      ...(data.packageType !== undefined ? { packageType: data.packageType } : {}),
      ...(data.stateId !== undefined ? { stateId: data.stateId } : {}),
    })
  ),
};