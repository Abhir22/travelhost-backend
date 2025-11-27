import { z } from 'zod';

export function flatToNestedSchema<T extends z.ZodRawShape, U>(
  flatSchema: z.ZodObject<T>,
  transform: (data: z.infer<z.ZodObject<T>>) => U
) {
  return flatSchema.transform(transform);
} 


