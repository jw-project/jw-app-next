import { type JSX, type PropsWithChildren, type RefObject } from 'react';

import type { W } from 'windstitch';

import type { DrawerWrapperStyled } from './styled';

export type DrawerWrapperStyledType = W.Infer<typeof DrawerWrapperStyled>;

export type DrawerProps = PropsWithChildren<{
  size?: DrawerWrapperStyledType['size'];
  footer?: () => JSX.Element;
  onClose: () => void;
}>;

export type DrawerContextProps = PropsWithChildren<{
  size?: DrawerWrapperStyledType['size'];
  openDrawer: () => void;
  closeDrawer: () => void;
}>;

export type DrawerRefProps = {
  isOpen: boolean;
  openDrawer: () => void;
};

export type DrawerOutletContext = {
  formDrawerRef: RefObject<DrawerRefProps>;
};
