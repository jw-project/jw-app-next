'use client';

import { createContext, useEffect, type PropsWithChildren } from 'react';

import type { PublisherEntity } from '~/entities/publisher';
import { useTheme } from '~/hooks/use-theme';

import { useContextTranslation } from './translation';

export const UserContext = createContext<{
  user?: PublisherEntity;
}>({});

export function UserProvider({
  user,
  children,
}: PropsWithChildren<{ user: PublisherEntity }>) {
  const { setDefaultLanguage } = useContextTranslation();
  const { toggleTheme } = useTheme();

  useEffect(() => {
    user.language && setDefaultLanguage(user.language);
  }, [user.language]);

  useEffect(() => {
    toggleTheme(user.theme);
  }, [user.theme]);

  return (
    <UserContext.Provider value={{ user }}>{children}</UserContext.Provider>
  );
}
