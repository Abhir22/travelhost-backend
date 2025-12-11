import { z } from 'zod';

export const packagestateValidation = {
  create: z.object({
    packageTypeId: z.string(),
    stateId: z.string(),
  }).transform(
    data => ({
      packageTypeId: data.packageTypeId,
      stateId: data.stateId,
    })
  ),

  update: z.object({
    packageTypeId: z.string().optional(),
    stateId: z.string().optional(),
  }).transform(
    data => ({
      ...(data.packageTypeId !== undefined ? { packageTypeId: data.packageTypeId } : {}),
      ...(data.stateId !== undefined ? { stateId: data.stateId } : {}),
    })
  ),
};