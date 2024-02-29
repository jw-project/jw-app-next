'use client';

import { useRef } from 'react';

import { useIsMobile } from '~/hooks/use-is-mobile';
import { useMenu } from '~/hooks/use-menu';
import { useOutsideClick } from '~/hooks/use-outside-click';
import { useUser } from '~/hooks/use-user';

import { MenuBody } from './menu-body';
import { Aside, MenuHeader } from './menu-styled';
import type { MenuType } from './types';

export function MenuClient({ menu }: { menu: MenuType[] }) {
  const isMobile = useIsMobile();
  const { permissions } = useUser();
  const { showMenu, closeMenu } = useMenu();
  const menuRef = useRef<HTMLElement>(null);
  useOutsideClick(
    menuRef,
    () => {
      if (isMobile && showMenu) {
        closeMenu();
      }
    },
    [showMenu],
  );

  return (
    <>
      <Aside expanded={showMenu} ref={menuRef}>
        <MenuHeader>
          Admin
          <b className="font-black">One</b>
        </MenuHeader>
        <MenuBody menu={menu} permissions={permissions} />
      </Aside>
    </>
  );
}
