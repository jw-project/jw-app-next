"use client";

import { useEffect, type PropsWithChildren } from "react";
import { createContext } from "react";
import type { PublisherEntity } from "~/entities/publisher";
import { useContextTranslation } from "./translation";

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
  }, [user.language]);

  return (
    <UserContext.Provider value={{ user }}>{children}</UserContext.Provider>
  );
}
