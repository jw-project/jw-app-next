'use client';

import {
  createContext,
  forwardRef,
  useContext,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
  type Ref,
} from 'react';

import { useIsMobile } from '~/hooks/use-is-mobile';
import { useOutsideClick } from '~/hooks/use-outside-click';
import { useTheme } from '~/hooks/use-theme';

import { DrawerHeader } from './drawer-header';
import {
  DrawerContentStyled,
  DrawerFooterStyled,
  DrawerWrapperStyled,
} from './styled';
import type { DrawerContextProps, DrawerProps, DrawerRefProps } from './types';

const DrawerContext = createContext<DrawerContextProps>({
  children: null,
  openDrawer: () => {},
  closeDrawer: () => {},
});

export const useDrawer = () => {
  return useContext(DrawerContext);
};

export const Drawer = forwardRef(
  (
    { children, initOpen, size, footer: Footer, onClose }: DrawerProps,
    ref: Ref<DrawerRefProps>,
  ) => {
    const [drawerIsOpen, setDrawerIsOpen] = useState(() => Boolean(initOpen));
    const drawerRef = useRef<HTMLDivElement>(null);
    const isMobile = useIsMobile();
    const { backdropIsShow, showBackdrop, hideBackdrop } = useTheme();

    useImperativeHandle(ref, () => ({
      isOpen: drawerIsOpen,
      openDrawer,
    }));

    const openDrawer = () => {
      setDrawerIsOpen(true);
      showBackdrop();
    };

    const closeDrawer = () => {
      setDrawerIsOpen(false);
      hideBackdrop();
      setTimeout(onClose, 150);
    };

    useOutsideClick(
      drawerRef,
      () => {
        if (drawerIsOpen) {
          closeDrawer();
        }
      },
      [drawerIsOpen],
    );

    useEffect(() => {
      if (drawerIsOpen) {
        showBackdrop();
      }
    }, [drawerIsOpen, backdropIsShow]);

    return (
      <DrawerContext.Provider
        value={{ children, size, openDrawer, closeDrawer }}
      >
        <DrawerWrapperStyled
          open={drawerIsOpen}
          size={isMobile ? 'full' : size}
          ref={drawerRef}
        >
          <DrawerHeader />
          <DrawerContentStyled>{children}</DrawerContentStyled>
          {Footer && (
            <DrawerFooterStyled>
              <Footer />
            </DrawerFooterStyled>
          )}
        </DrawerWrapperStyled>
      </DrawerContext.Provider>
    );
  },
);

Drawer.displayName = 'Drawer';
