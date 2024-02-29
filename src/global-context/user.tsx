'use client';

import { createContext, useEffect, type PropsWithChildren } from 'react';

import { setCookie } from 'cookies-next';

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
    setCookie('language', user.language, {
      expires: new Date(Date.now() + 60 * 60 * 24 * 365),
    });
  }, [user.language]);

  useEffect(() => {
    toggleTheme(user.theme);
    setCookie('theme', user.theme, {
      expires: new Date(Date.now() + 60 * 60 * 24 * 365),
    });
  }, [user.theme]);

  return (
    <UserContext.Provider value={{ user }}>{children}</UserContext.Provider>
  );
}
