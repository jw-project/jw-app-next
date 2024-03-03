'use client';

import { createContext, useState, type PropsWithChildren } from 'react';

import type { ZIndex } from '~/components/commons/backdrop';

export type Theme = 'light' | 'dark';

type ShowBackdropOptions = {
  fade?: boolean;
  zIndex?: ZIndex;
};

export const ThemeContext = createContext<{
  theme: Theme;
  toggleTheme: (theme?: Theme) => Theme;
  backdropFade: boolean;
  backdropZIndex: ZIndex;
  backdropIsShow: boolean;
  showBackdrop: (options?: ShowBackdropOptions) => void;
  hideBackdrop: () => void;
}>({
  theme: 'light',
  toggleTheme: () => 'light',
  backdropFade: false,
  backdropZIndex: 40,
  backdropIsShow: false,
  showBackdrop: () => {},
  hideBackdrop: () => {},
});

export const ThemeProvider = ({
  children,
  defaultTheme,
}: PropsWithChildren<{ defaultTheme: Theme }>) => {
  const [theme, setTheme] = useState(defaultTheme);
  const [backdrop, setBackdrop] = useState(false);
  const [fade, setFade] = useState(false);
  const [zIndex, setZIndex] = useState<ZIndex>(40);

  const showBackdrop = (options?: ShowBackdropOptions) => {
    setFade(options?.fade || false);
    setBackdrop(true);
    setZIndex(options?.zIndex || 40);
  };

  const hideBackdrop = () => {
    setBackdrop(false);
  };

  const toggleTheme = (theme?: Theme) => {
    let newTheme: Theme = defaultTheme;
    setTheme((current) => {
      if (theme) {
        newTheme = theme;

        return theme;
      }
      newTheme = current === 'light' ? 'dark' : 'light';

      return newTheme;
    });

    return newTheme;
  };

  return (
    <ThemeContext.Provider
      value={{
        theme,
        toggleTheme,
        backdropFade: fade,
        backdropZIndex: zIndex,
        backdropIsShow: backdrop,
        showBackdrop,
        hideBackdrop,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};
