'use client';

import { createContext, useEffect, type PropsWithChildren } from 'react';

import { setCookie } from 'cookies-next';

import type { PublisherEntity } from '~/entities/publisher';

import { useContextTranslation } from './translation';

export const UserContext = createContext<{
  user?: PublisherEntity;
}>({});

export function UserProvider({
  user,
  children,
}: PropsWithChildren<{ user: PublisherEntity }>) {
  const { setDefaultLanguage } = useContextTranslation();

  useEffect(() => {
    user.language && setDefaultLanguage(user.language);
    setCookie('language', user.language, {
      expires: new Date(Date.now() + 60 * 60 * 24 * 365),
    });
  }, [user.language]);

  return (
    <UserContext.Provider value={{ user }}>{children}</UserContext.Provider>
  );
}
