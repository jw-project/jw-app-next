'use client';

import { useEffect, useRef, type PropsWithChildren } from 'react';
import { useParams, useRouter } from 'next/navigation';

import { Drawer } from '~/components/commons/drawer';
import { DrawerFooterNavigate } from '~/components/commons/drawer/drawer-footer-navigate';
import type { DrawerRefProps } from '~/components/commons/drawer/types';

import { useEventPage } from './context';

export default function EventTemplate({ children }: PropsWithChildren) {
  const formDrawerRef = useRef<DrawerRefProps>(null);
  const { push } = useRouter();
  const { slug } = useParams();
  const { events } = useEventPage();

  useEffect(() => {
    if (slug && !formDrawerRef.current?.isOpen) {
      formDrawerRef.current?.openDrawer();
    }
  }, [slug]);

  const onClose = () => {
    push('../events');
  };

  return (
    <Drawer
      // initOpen
      size="large"
      ref={formDrawerRef}
      onClose={onClose}
      footer={() => (
        <DrawerFooterNavigate
          baseUrl="/congregation/events"
          navigatorData={events}
          paramKey="slug"
        />
      )}
    >
      {children}
    </Drawer>
  );
}
