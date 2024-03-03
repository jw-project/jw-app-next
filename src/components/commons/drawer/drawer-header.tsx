'use client';

import { Icon } from '../icon';
import { useDrawer } from './';
import { DrawerCloseButtonStyled, DrawerHeaderStyled } from './styled';

export const DrawerHeader = () => {
  const { closeDrawer } = useDrawer();

  return (
    <DrawerHeaderStyled>
      <DrawerCloseButtonStyled onClick={closeDrawer}>
        <Icon icon="close" className="transition-none" />
      </DrawerCloseButtonStyled>
    </DrawerHeaderStyled>
  );
};
