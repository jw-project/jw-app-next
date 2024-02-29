'use client';

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type Dispatch,
  type PropsWithChildren,
  type SetStateAction,
} from 'react';

import { setCookie } from 'cookies-next';

import type { TranslationConfig, Translations } from '~/hooks/use-translation';

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

  useEffect(() => {
    setCookie('language', defaultLanguage, {
      expires: new Date(Date.now() + 60 * 60 * 24 * 365),
    });
  }, [defaultLanguage]);

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
