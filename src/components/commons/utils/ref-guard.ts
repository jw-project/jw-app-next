import type { RefObject } from 'react';

export function refGuard<T>(ref: RefObject<T>) {
  if (!ref.current) {
    throw new Error('Ref is not set');
  }

  return ref.current;
}
