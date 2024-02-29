'use client';

import { useContext } from 'react';

import type { PublisherEntity } from '~/entities/publisher';
import { UserContext } from '~/global-context/user';

export function useUser(): PublisherEntity {
  const { user } = useContext(UserContext);

  if (!user) {
    throw new Error('user not found');
  }

  return user;
}
