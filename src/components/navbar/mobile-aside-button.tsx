import { w } from 'windstitch';

import { useMenu } from '~/hooks/use-menu';

import { Icon } from '../commons/icon';

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
