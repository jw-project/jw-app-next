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
  const getExpires = () => {
    return new Date(Date.now() + 60 * 60 * 24 * 365);
  };

  useEffect(() => {
    user.language && setDefaultLanguage(user.language);
    setCookie('language', user.language, {
      expires: getExpires(),
    });
  }, [user.language]);

  useEffect(() => {
    toggleTheme(user.theme);
    setCookie('theme', user.theme, {
      expires: getExpires(),
    });
  }, [user.theme]);

  return (
    <UserContext.Provider value={{ user }}>{children}</UserContext.Provider>
  );
}
