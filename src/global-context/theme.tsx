"use client";

import { createContext, useState, type PropsWithChildren } from "react";

import type { ZIndex } from "~/components/commons/backdrop";

export type Theme = "light" | "dark";

type ShowBackdropOptions = {
  zIndex?: ZIndex;
};

export const ThemeContext = createContext<{
  theme: Theme;
  toggleTheme: () => Theme;
  backdropZIndex: ZIndex;
  backdropIsShow: boolean;
  showBackdrop: (options?: ShowBackdropOptions) => void;
  hideBackdrop: () => void;
}>({
  theme: "light",
  toggleTheme: () => "light",
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
  const [zIndex, setZIndex] = useState<ZIndex>(40);

  const showBackdrop = (options?: ShowBackdropOptions) => {
    setBackdrop(true);
    setZIndex(options?.zIndex || 40);
  };

  const hideBackdrop = () => {
    setBackdrop(false);
  };

  const toggleTheme = () => {
    let newTheme: Theme = defaultTheme;
    setTheme((current) => {
      newTheme = current === "light" ? "dark" : "light";

      return newTheme;
    });

    return newTheme;
  };

  return (
    <ThemeContext.Provider
      value={{
        theme,
        toggleTheme,
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
