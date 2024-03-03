'use client';

import { useEffect, useRef, type PropsWithChildren } from 'react';
import { useRouter } from 'next/navigation';

import { Drawer } from '~/components/commons/drawer';
import type { DrawerRefProps } from '~/components/commons/drawer/types';
import type { EventEntity } from '~/entities/event';

import { EventForm } from './form';

export default function EventDrawer({
  event,
  eventId,
}: PropsWithChildren<{
  event: EventEntity;
  eventId: string;
}>) {
  const formDrawerRef = useRef<DrawerRefProps>(null);
  const { push } = useRouter();

  useEffect(() => {
    if (!formDrawerRef.current?.isOpen) {
      formDrawerRef.current?.openDrawer();
    }
  }, []);

  const onClose = () => {
    push('../events');
  };

  return (
    <Drawer size="large" ref={formDrawerRef} onClose={onClose}>
      <EventForm id={eventId} data={event} />
    </Drawer>
  );
}
