import type { PropsWithChildren } from 'react';

import { Menu } from './menu/menu.server';
import { Navbar } from './navbar/navbar';
import { Transition } from './transition';

export function BaseLayout({ children }: PropsWithChildren) {
  return (
    <>
      <Navbar />
      <Menu />
      <Transition>{children}</Transition>
    </>
  );
}
