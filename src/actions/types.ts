import type { BadRequestError, HttpSuccess } from './http-responses';

export type ActionResponse<T extends object> = Promise<
  BadRequestError | HttpSuccess<T>
>;
