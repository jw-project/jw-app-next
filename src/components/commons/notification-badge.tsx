import { type PropsWithChildren } from 'react';

import { w } from 'windstitch';

const NotificationBadgeStyled = w.div(`
  inline-flex
  absolute  
  -mt-6
  -mr-6
  justify-center
  items-center
  w-4
  h-4
  text-[10px]
  text-white
  bg-red-500
  rounded-full
`);

export function NotificationBadge({ children }: PropsWithChildren) {
  if (!children) {
    return null;
  }

  return <NotificationBadgeStyled>{children}</NotificationBadgeStyled>;
}
