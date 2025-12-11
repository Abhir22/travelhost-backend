import { z } from 'zod';

export const mealtypeValidation = {
  create: z.object({
    name: z.string(),
    description: z.string().optional(),
  }).transform(
    data => ({
      name: data.name,
      description: data.description,
    })
  ),

  update: z.object({
    name: z.string().optional(),
    description: z.string().optional(),
  }).transform(
    data => ({
      ...(data.name !== undefined ? { name: data.name } : {}),
      ...(data.description !== undefined ? { description: data.description } : {}),
    })
  ),
};