import { type JSX, type PropsWithChildren } from 'react';

import type { W } from 'windstitch';

import type { DrawerWrapperStyled } from './styled';

type DrawerWrapperStyledType = W.Infer<typeof DrawerWrapperStyled>;

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
