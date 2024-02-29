'use client';

import { w } from 'windstitch';

import { Icon } from '~/components/commons/icon';
import { useMenu } from '~/hooks/use-menu';

const MobileAsideButtonStyled = w.div(`
    lg:hidden
    rotate-180
    cursor-pointer
    dark:text-white
`);

export function MobileAsideButton() {
  const { openMenu } = useMenu();

  return (
    <MobileAsideButtonStyled onClick={openMenu}>
      <Icon icon="menu_open" />
    </MobileAsideButtonStyled>
  );
}
