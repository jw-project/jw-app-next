'use client';

import { type PropsWithChildren } from 'react';

import { useHorizontalScroll } from '~/hooks/use-horizontal-scroll';

import {
  TabIconStyled,
  TabLinkStyled,
  TabsStyled,
  TabStyled,
  type TabProp,
} from './tabs-styled';

export function Tabs(props: PropsWithChildren) {
  const scrollRef = useHorizontalScroll<HTMLUListElement>();

  return <TabsStyled {...props} ref={scrollRef} />;
}

export function Tab({ title, to, icon, selected, disabled }: TabProp) {
  return (
    <TabStyled>
      <TabLinkStyled
        href={disabled ? '#' : to}
        selected={selected}
        disabled={Boolean(disabled)}
      >
        {icon && (
          <TabIconStyled
            icon={icon}
            size="icon-x-small"
            selected={selected}
            disabled={Boolean(disabled)}
          />
        )}
        {title}
      </TabLinkStyled>
    </TabStyled>
  );
}
