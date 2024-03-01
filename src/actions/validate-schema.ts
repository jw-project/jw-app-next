import type { z } from 'zod';

import { BadRequestError } from './http-responses';

export function validateSchema(schema: z.ZodSchema, obj: any) {
  const result = schema.safeParse(obj);

  if (!result.success) {
    throw new BadRequestError(result.error.message);
  }
}
