"use client";

import type { Dispatch, SetStateAction } from "react";
import { useContext, type PropsWithChildren, useState } from "react";
import { createContext } from "react";
import type { TranslationConfig, Translations } from "~/hooks/use-translation";

type TranslationContextType = {
  defaultLanguage: string;
  translations: Translations;
  setTranslations: Dispatch<SetStateAction<Translations>>;
  setDefaultLanguage: Dispatch<SetStateAction<string>>;
};

export const TranslationContext = createContext<TranslationContextType>(
  {} as TranslationContextType,
);

export function LanguageProvider({
  defaultLanguage: defaultLanguageParam,
  translations: translationsParam,
  children,
}: PropsWithChildren<TranslationConfig>) {
  const [translations, setTranslations] =
    useState<Translations>(translationsParam);
  const [defaultLanguage, setDefaultLanguage] = useState(defaultLanguageParam);

  return (
    <TranslationContext.Provider
      value={{
        defaultLanguage,
        translations,
        setTranslations,
        setDefaultLanguage,
      }}
    >
      {children}
    </TranslationContext.Provider>
  );
}

export const useContextTranslation = () => useContext(TranslationContext);
