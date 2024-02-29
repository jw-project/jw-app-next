import type { PropsWithChildren } from 'react';

import { BodyMargin } from '~/components/body/body-margin';
import { Navbar } from '~/components/navbar/navbar';

import { Menu } from './menu/menu.server';
import { Transition } from './transition';

export function BaseLayout({ children }: PropsWithChildren) {
  const { show } = { show: true }; //useTransition();

  return (
    <>
      {/* <Navbar /> */}
      <Menu />
      <Transition>{children}</Transition>
    </>
  );
}
