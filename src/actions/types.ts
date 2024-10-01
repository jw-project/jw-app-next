import type { BadRequestError, HttpSuccess } from './http-responses';

type ActionResponse<T extends object> = BadRequestError | HttpSuccess<T>;

export type ActionResponsePromise<T extends object> = Promise<
  ActionResponse<T>
>;
