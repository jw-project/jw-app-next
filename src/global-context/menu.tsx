'use client';

import {
  createContext,
  useEffect,
  useState,
  type PropsWithChildren,
} from 'react';

import { useIsMobile } from '~/hooks/use-is-mobile';
import { useTheme } from '~/hooks/use-theme';

type MenuContextType = {
  showMenu: boolean;
  openMenu: () => void;
  closeMenu: () => void;
};

export const MenuContext = createContext({} as MenuContextType);

export const MenuProvider = ({ children }: PropsWithChildren) => {
  const [showMenu, setShowMenu] = useState(false);
  const { showBackdrop, hideBackdrop } = useTheme();
  const isMobile = useIsMobile();

  useEffect(() => {
    if (!isMobile) {
      closeMenu();
    }
  }, [isMobile]);

  const openMenu = () => {
    setShowMenu(true);
    showBackdrop({ zIndex: 20, fade: true });
  };

  const closeMenu = () => {
    setShowMenu(false);
    hideBackdrop();
  };

  return (
    <MenuContext.Provider value={{ showMenu, openMenu, closeMenu }}>
      {children}
    </MenuContext.Provider>
  );
};
